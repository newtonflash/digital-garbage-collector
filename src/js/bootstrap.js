const { remote } = require("electron");
var PythonShell = require('python-shell');
var path = require("path");
var fse = require("fs-extra");

const imagesCachePath = path.join(__dirname , "../app-cache/image-list.json");

const dialog = remote.dialog,
    WIN = remote.getCurrentWindow();

let libraryPath = "";

const openAndSelectFileBrowser = (enforceFolderSelection = false) => {
    dialog.showOpenDialog(
        WIN,
        {
            title: "Select a root folder",
            defaultPath: "",
            buttonLabel: "Set this as root folder",
            filters: [
                { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
            ],
            properties: ["openDirectory"]
        }
    ).then( dir =>{

            if (dir.filePaths.length > 0) {
                libraryPath = dir.filePaths[0];
                let imagePaths = scanAndCreateJSON(libraryPath);
                $("#currentSelectionPath").html(libraryPath);
                $("#startSearchBtn").prop('disabled', false);
                imagePaths = imagePaths.images;
                $("#totalImageCount").html(imagePaths.length);
                fse.outputJson(imagesCachePath,imagePaths)
                    .then(()=>{console.log("cache created for all the images list")})
                    .catch(e=>console.error(e));
            }
    });
};

$("#rootFolderSelector").on("click", () => {
    openAndSelectFileBrowser();
});



const checkBlurDetection = () => {
    var options = {
        mode: 'text',

        pythonOptions: ['-u'],
        args: imagesCachePath
    };

    PythonShell.PythonShell.run(path.join(__dirname,'./modules/blur-detection/index.py'), options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('blur: %j', results);
        results = results[0];
        results = results.replace(/'/g, "\"");
        results = JSON.parse(results)
        populateData(results);
    });

    PythonShell.PythonShell.run(path.join(__dirname,'./modules/unoptimized-image-detection/index.py'), options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('unoptimized: %j', results);
        results = results[0];
        results = results.replace(/'/g, "\"");
        results = JSON.parse(results)
        populateUnoptimizedImages(results);
    });

    PythonShell.PythonShell.run(path.join(__dirname,'./modules/duplicate-detection/index.py'), options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('duplicates: %j', results);
        results = results[0];
        results = results.replace(/'/g, "\"");
        results = JSON.parse(results)
        populateDuplicateImages(results);
    });

    PythonShell.PythonShell.run(path.join(__dirname,'./modules/similar-image-detection/index.py'), options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('duplicates: %j', results);
        results = results[0];
        results = results.replace(/'/g, "\"");
        results = JSON.parse(results)
        populateSimilarImages(results);
    });


}

$("#startSearchBtn").on("click", () => {
    $(".view-welcome-screen").hide();
    checkBlurDetection();
});

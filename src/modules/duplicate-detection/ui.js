var PythonShell = require('python-shell');
var path = require("path");

var $duplicateImagesSection = $("#duplicateImagesSection");
var $deleteDuplicateImagesButton = $("#deleteDuplicateImagesButton");

$duplicateImagesSection.hide();

let duplicateImagesArr = []

const populateDuplicateImages = filesArr => {
    if(filesArr.length === 0){
        $deleteDuplicateImagesButton.prop('disabled', true);
        return;
    } else {
        $duplicateImagesSection.find(".result-place-holder").remove();
    }

    $deleteDuplicateImagesButton.prop('disabled',false);


    var htmlArr = []

    duplicateImagesArr = filesArr;
    for( var i = 0; i< filesArr.length ; i++){
        let fileName = filesArr[i].split("/").pop();
        let template = `<div class="image-card"><img src="${filesArr[i]}" title="${filesArr[i]}" />
                                <div class="file-name">${fileName}</div></div>`;
        htmlArr.push(template)

    }
    $duplicateImagesSection.find('.results_image-container').empty().append(htmlArr.join(''))
    $duplicateImagesSection.show();
}

$deleteDuplicateImagesButton.on("click", ()=>{
    if(duplicateImagesArr.length > 0 ){
        for (let i =0; i<duplicateImagesArr.length; i++){
            var imagePath = duplicateImagesArr[i];

            var options = {
                mode: 'text',
                pythonOptions: ['-u'],
                args: imagePath
            };
            PythonShell.PythonShell.run(path.join(__dirname,'./modules/duplicate-detection/optimize.py'), options, function (err, results) {
                if (err) throw err;
                // results is an array consisting of messages collected during execution
                console.log('results: %j', results);
            });
        }
    }
});


var PythonShell = require('python-shell');
var path = require("path");

var $unoptimizedImagesSection = $("#unoptimizedImagesSection");
var $optimizeImageButton = $("#optimizeImagesButton");

$unoptimizedImagesSection.hide();

let imagesArr = []

const populateUnoptimizedImages = filesArr => {
    console.log(filesArr.len)
    if(filesArr.length === 0){
        $("#unoptimizedImagesSection .result-place-holder").html("All images are optimized !!!");
        $optimizeImageButton.prop('disabled', true);
        return;
    } else {
        $unoptimizedImagesSection.find(".result-place-holder").remove();
    }

    $optimizeImageButton.prop('disabled',false);


    var htmlArr = []

    imagesArr = filesArr;
    for( var i = 0; i< filesArr.length ; i++){
        let fileName = filesArr[i].split("/").pop();
        let template = `<div class="image-card"><img src="${filesArr[i]}" />
                                <div class="file-name">${fileName}</div></div>`;
        htmlArr.push(template)

    }
    $unoptimizedImagesSection.find('.results_image-container').empty().append(htmlArr.join(''))
    $unoptimizedImagesSection.show();
}

$optimizeImageButton.on("click", ()=>{
    if(imagesArr.length > 0 ){
        for (let i =0; i<imagesArr.length; i++){
            var imagePath = imagesArr[i];

            var options = {
                mode: 'text',
                pythonOptions: ['-u'],
                args: imagePath
            };
            PythonShell.PythonShell.run(path.join(__dirname,'./modules/unoptimized-image-detection/optimize.py'), options, function (err, results) {
                if (err) throw err;
                // results is an array consisting of messages collected during execution
                console.log('results: %j', results);
            });
        }
    }
    $unoptimizedImagesSection.find('.result-place-holder').html("All the unoptimized images are optimized");
});


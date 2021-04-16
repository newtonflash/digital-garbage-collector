var PythonShell = require('python-shell');
var path = require("path");

var $similarImagesSection = $("#similarImagesSection");
var $similarDuplicateImagesButton = $("#deleteDuplicateImagesButton");

$duplicateImagesSection.hide();

let similarImagesArr = []

const populateSimilarImages = filesArr => {

    if(filesArr.length === 0){
        $similarDuplicateImagesButton.prop('disabled', true);
        return;
    } else {
        $similarImagesSection.find(".result-place-holder").remove();
    }

    $similarDuplicateImagesButton.prop('disabled',false);


    var htmlArr = []



    duplicateImagesArr = filesArr;
    for( var i = 0; i< filesArr.length ; i++){
        htmlArr.push(`<div class="image-card-section">`)
        for(var j =0; j< filesArr[i].length; j++){
            let template = `<div class="image-card"><img src="${filesArr[i][j]}" /></div>`;
            htmlArr.push(template)
        }
        htmlArr.push(`</div>`);
    }
    $similarImagesSection.find('.results_image-container').append(htmlArr.join(''))
    $similarImagesSection.show();
}

$similarDuplicateImagesButton.on("click", ()=>{
     console.log("delete similar")
});


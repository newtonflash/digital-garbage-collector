const {unlink} = require('fs');

var $blurredImageSection = $("#blurredImagesSection")
var $deleteBlurredImagesBtn = $("#deleteBlurredImagesBtn")
$blurredImageSection.hide();
let blurredFilesList = [];

const populateData = filesArr => {
    if(filesArr.length === 0 ){
        $blurredImageSection.hide();
        return;
    }
    var htmlArr = []
    blurredFilesList = filesArr;
    $blurredImageSection.find('.results_image-container').empty();

    for( var i = 0; i< filesArr.length ; i++){
        let fileName = filesArr[i].split("/").pop();
        let template = `<div class="image-card">
                                <img src="${filesArr[i]}" title="${filesArr[i]}" />
                                <div class="file-name">${fileName}</div>
                                </div>`;
        htmlArr.push(template);
    }

    $blurredImageSection.find('.results_image-container').empty().append(htmlArr.join(''))
    $blurredImageSection.show();
}

const  deleteFiles = arr => {
    for( let i = 0; i< arr.length ;  i++){

        unlink(arr[i], (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
        });
    }
}

$deleteBlurredImagesBtn.on("click", ()=>{
    deleteFiles( blurredFilesList );
    $blurredImageSection.find('.results_image-container').html("All the blurred images are deleted");
})


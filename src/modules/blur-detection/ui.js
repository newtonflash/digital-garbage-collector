var $blurredImageSection = $("#blurredImagesSection")
$blurredImageSection.hide();

const populateData = filesArr => {
    var htmlArr = []
    $blurredImageSection.find('.results_image-container').empty();

    for( var i = 0; i< filesArr.length ; i++){
        let template = `<div class="image-card"><img src="${filesArr[i]}" /></div>`;
        htmlArr.push(template)

    }
    $blurredImageSection.find('.results_image-container').append(htmlArr.join(''))
    $blurredImageSection.show();
}

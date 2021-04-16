var $blurredImageSection = $("#blurredImagesSection")
$blurredImageSection.hide();

const populateData = filesArr => {
    var htmlArr = []
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

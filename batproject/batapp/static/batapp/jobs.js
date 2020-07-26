$(document).ready(function() {
    $imageContainer = $("#image-container");
    
    $.get("/getuserimages", function(data) {
        data = JSON.parse(data);
        data.images.forEach(function(image) {
            $imageContainer.append(
                '<div class="image' + (image.tagged == true ? " tagged" : "") + '">\
                    <img src="' + image.url + '" alt="">\
                    <div class="label">' + image.label +'</div>\
                </div>');
        });
        
        window.data = data;
        
        console.log(data);
        
    });
});

$(document).ready(function() {
    $imageContainer = $("#image-container");
    
    $.get("/getuserimages", function(data) {
        data = JSON.parse(data);
        data.images.forEach(function(image) {
            $imageContainer.append(
                '<a href="/dashboard/jobs/' + image.id + '" class="image-link">\
                    <div class="image' + (image.tagged == true ? " tagged" : "") + '">\
                        <img src="' + image.url + '" alt="">\
                        <div class="label">[' + image.id + '] ' + image.label +'</div>\
                        <div id="delete-img-' + image.id + '" class="delete-img-button">X</div>\
                    </div>\
                </a>');
            
            $("#delete-img-" + image.id).click(function(event) {
                event.stopPropagation();
                event.preventDefault();
                
                
                if (confirm("Are you sure?")) {
                    alert("not yet implemented...");
                }
                
                
            });
        });
        
        window.data = data;
        
        console.log(data);
        
    });
});

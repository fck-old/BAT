$(document).ready(function() {
    $("#id_label").focus();
    $("#reset").click(function() {
        document.getElementById("image").src = "";
        $("#file-container").removeClass("d-none");
        $("#id_label").focus();
    });
    
    document.getElementById('id_picture_path_file').onchange = function (evt) {
        $("#file-container").addClass("d-none");
        
        
        
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById("image").src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }

        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }
    }
});

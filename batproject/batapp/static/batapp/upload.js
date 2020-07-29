$(document).ready(function() {
    $("#id_label").focus();
    $("#reset").click(function() {
        document.getElementById("image").src = "";
        $("#file-container").removeClass("d-none");
        $("#id_label").focus();
        $("#save").attr("disabled", true);
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
        
        $("#id_label").focus();
    }
    
    
    
    function buttonEnabler() {
        if ($("#id_label").val() != "" && $("#id_picture_path_file").val() != "") {
            $("#save").attr("disabled", false);
        } else {
            $("#save").attr("disabled", true);
        }
    }
    
    $("#id_label").change(buttonEnabler);
    $("#id_label").on("keyup", buttonEnabler);
    $("#id_label").on("keydown", buttonEnabler);
    $("#id_picture_path_file").change(buttonEnabler);
    
});

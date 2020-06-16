$(document).ready(function() {
    
    var widthIsClipped = false;
    var cValue = 100;
    var translationX = 0;
    var translationY = 0;
    
    
    $("#image").bind("load", function() {
        var img = $("#image");
        var cv = $("#canvas");
        var ct = $("#container");
        var trans = $("#translation");
        
        cv[0].height = img[0].naturalHeight;
        cv[0].width = img[0].naturalWidth;
        
        if (img.width() > img.height()) {
            img.css("width", "100%");
            img.css("height", "auto");
            cv.css("width", ct.width());
            cv.css("height", img.height());
            widthIsClipped = true;
            cValue = 100;
            translationX = 0;
            translationY = 0;
            trans.css("transform", "translate(0, 0)");
        } else {
            img.css("height", "100%");
            img.css("width", "auto");
            cv.css("height", ct.height());
            cv.css("width", img.width());
            widthIsClipped = false;
            cValue = 100;
            translationX = 0;
            translationY = 0;
            trans.css("transform", "translate(0, 0)");
        }
    });
    
    
    $("#b1").click(function() {
        $("#image").attr("src", "https://frank.kohlhepp.me/tmp/querformat.jpg");
    });
    
    $("#b2").click(function() {
        $("#image").attr("src", "https://frank.kohlhepp.me/tmp/hochformat.jpg");
    });
    
    
    
    $(document).keypress(function(event) {
        console.log(event.code);
        
        
        if (event.code == "Period") {
            // Zoom in
            cValue += 10;
            var img = $("#image");
            if (widthIsClipped) {
                img.css("width", cValue + "%");
            } else {
                img.css("height", cValue + "%");
            }
            
            var cv = $("#canvas");
            cv.css("width", img.width());
            cv.css("height", img.height());
        }
        
        if (event.code == "Comma") {
            // Zoom out
            cValue -= 10;
            var img = $("#image");
            if (widthIsClipped) {
                img.css("width", cValue + "%");
            } else {
                img.css("height", cValue + "%");
            }
            
            var cv = $("#canvas");
            cv.css("width", img.width());
            cv.css("height", img.height());
        }
        
        var trans = $("#translation");
        if (event.code == "Digit0") {
            // Zoom out
            cValue = 100;
            translationX = 0;
            translationY = 0;
            trans.css("transform", "translate(0, 0)");
            var img = $("#image");
            if (widthIsClipped) {
                img.css("width", cValue + "%");
            } else {
                img.css("height", cValue + "%");
            }
            
            var cv = $("#canvas");
            cv.css("width", img.width());
            cv.css("height", img.height());
        }
        
        if (event.code == "KeyW") {
            // Up
            translationY += 10;
            trans.css("transform", "translate(" + translationX + "px, " + translationY + "px)");
        }
        
        if (event.code == "KeyA") {
            // Left
            translationX += 10;
            trans.css("transform", "translate(" + translationX + "px, " + translationY + "px)");
        }
        
        if (event.code == "KeyS") {
            // Down
            translationY -= 10;
            trans.css("transform", "translate(" + translationX + "px, " + translationY + "px)");
        }
        
        if (event.code == "KeyD") {
            // Right
            translationX -= 10;
            trans.css("transform", "translate(" + translationX + "px, " + translationY + "px)");
        }
        
        
    });
    
    
    
});

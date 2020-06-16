$(document).ready(function() {
    
    var widthIsClipped = false;
    var cValue = 100;
    var translationX = 0;
    var translationY = 0;
    
    
    $("#image").bind("load", function() {
        startX = NaN;
        startY = NaN;
        stopX = NaN;
        stopY = NaN;
        updateTag();
        
        
        var img = $("#image");
        var cv = $("#canvas");
        var tagc = $("#tagcontainer");
        var ct = $("#container");
        var trans = $("#translation");
        
        cv[0].height = img[0].naturalHeight;
        cv[0].width = img[0].naturalWidth;
        
        if (img.width() > img.height()) {
            img.css("width", "100%");
            img.css("height", "auto");
            cv.css("width", ct.width());
            cv.css("height", img.height());
            tagc.css("width", ct.width());
            tagc.css("height", img.height());
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
            tagc.css("height", ct.height());
            tagc.css("width", img.width());
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
            
            var tagc = $("#tagcontainer");
            tagc.css("width", img.width());
            tagc.css("height", img.height());
            updateTag();
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
            
            var tagc = $("#tagcontainer");
            tagc.css("width", img.width());
            tagc.css("height", img.height());
            updateTag();
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
            
            var tagc = $("#tagcontainer");
            tagc.css("width", img.width());
            tagc.css("height", img.height());
            updateTag();
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // wait for the content of the window element
    // to load, then performs the operations.
    // This is considered best practice.


    
       
    const canvas = document.querySelector('#canvas');

    // Context for the canvas for 2 dimensional operations
    const ctx = canvas.getContext('2d');
       
    // Resizes the canvas to the available size of the window.
    function resize(){
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
       
    // Stores the initial position of the cursor
    let coord = {x:0 , y:0};

    // This is the flag that we are going to use to
    // trigger drawing
    let paint = false;







    var startX = NaN;
    var startY = NaN;
    var stopX = NaN;
    var stopY = NaN;



       
    // Updates the coordianates of the cursor when
    // an event e is triggered to the coordinates where
    // the said event is triggered.
    function getPosition(event){
        var img = $("#image");
        var cv = $("#canvas");
        var ct = $("#container");
        var trans = $("#translation");
        
        var rateX = Number(cv.css("width").slice(0, -2)) / canvas.width;
        var rateY = Number(cv.css("height").slice(0, -2)) / canvas.height;
        
        coord.x = (event.x - canvas.getBoundingClientRect().left) / rateX;
        coord.y = (event.y - canvas.getBoundingClientRect().top) / rateY;
        console.log(coord.x, coord.y);
        
        
        //coord.x = event.touches[0].clientX - canvas.offsetLeft;
        //coord.y = event.touches[0].clientY - canvas.offsetTop;
        
        
        if (Number.isNaN(startX) || coord.x < startX) {
            startX = coord.x;
        }  
        
        if (Number.isNaN(startY) || coord.y < startY) {
            startY = coord.y;
        }
        
        if (Number.isNaN(stopX) || coord.x > stopX) {
            stopX = coord.x;
        }
        
        if (Number.isNaN(stopY) || coord.y > stopY) {
            stopY = coord.y;
        }
    }

    // The following functions toggle the flag to start
    // and stop drawing
    function startPainting(event){
        console.log("start");
        console.log(event);
        paint = true;
        getPosition(event);
        window.tmp = event;
        event.preventDefault();
    }

    function stopPainting(){
        console.log("stop");
        paint = false;
        event.preventDefault();
        updateTag();
    }
    
    function updateTag() {
        var img = $("#image");
        var cv = $("#canvas");
        var ct = $("#container");
        var trans = $("#translation");
        
        var rateX = Number(cv.css("width").slice(0, -2)) / canvas.width;
        var rateY = Number(cv.css("height").slice(0, -2)) / canvas.height;
        console.log(rateX, rateY);
        
        
        if (!Number.isNaN(startX)) {
            $("#tag").css("visibility", "visible");
            $("#tag").css("top", (startY * rateY));
            $("#tag").css("left", (startX * rateX));
            $("#tag").css("width", (stopX - startX) * rateX);
            $("#tag").css("height", (stopY - startY) * rateY);
        } else {
            $("#tag").css("visibility", "hidden");
        }
    }
       
    function sketch(event){
        
        
        
        if (!paint) return;
        
        
        //console.log("sketch");
        ctx.beginPath();
        
        ctx.lineWidth = 10;
        
        // Sets the end of the lines drawn
        // to a round shape.
        ctx.lineCap = 'round';
        
        ctx.strokeStyle = 'rgba(248, 181, 0, 1)';
        
        // The cursor to start drawing
        // moves to this coordinate
        ctx.moveTo(coord.x, coord.y);
        
        // The position of the cursor
        // gets updated as we move the
        // mouse around.
        getPosition(event);
        
        // A line is traced from start
        // coordinate to this coordinate
        ctx.lineTo(coord.x , coord.y);
        
        // Draws the line.
        ctx.stroke();
        
        event.preventDefault();
    }

    
    
    
    
    
    resize(); // Resizes the canvas once the window loads
    canvas.addEventListener('mousedown', startPainting, { passive: false });
    canvas.addEventListener('mouseup', stopPainting, { passive: false });
    canvas.addEventListener('mouseout', stopPainting, { passive: false });
    canvas.addEventListener('mousemove', sketch, { passive: false });
    
    /*
    canvas.addEventListener('touchstart', startPainting, { passive: false });
    canvas.addEventListener('touchend', stopPainting, { passive: false });
    canvas.addEventListener('touchmove', sketch, { passive: false });
    */
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});

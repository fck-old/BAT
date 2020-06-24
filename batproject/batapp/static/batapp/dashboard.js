$(document).ready(function() {
    // globals
    var isPortrait = false; // portrait image => width is set to 100%, otherwise height 100%
    var zoom = 100; // in percent
    var translationX = 0; // in pixel
    var translationY = 0; // in pixel
    var cFactor = 1; // canvas displayed size in relation to real size
    
    // DOM elements
    var $image = $("#image");
    var $trans = $("#translation");
    var $canvas = $("#canvas");
    var $tagcontainer = $("#tagcontainer");
    var $tag = $("#tag");
    
    
    
    
    
    
    
    
    function redraw() {
        // Translate
        $trans.css("transform", "translate(" + translationX + "px, " + translationY + "px)");
        
        // Zoom
        if (isPortrait) {
            $image.css("width", zoom + "%");
        } else {
            $image.css("height", zoom + "%");
        }
        
        var width = $image.width();
        var height = $image.height();
        
        $canvas.css("width", width);
        $canvas.css("height", height);
        
        $tagcontainer.css("width", width);
        $tagcontainer.css("height", height);
        
        cFactor = width / canvas.width;
        
        if (!Number.isNaN(startX)) {
            $tag.css("visibility", "visible");
            $tag.css("top", (startY * cFactor));
            $tag.css("left", (startX * cFactor));
            $tag.css("width", (stopX - startX) * cFactor);
            $tag.css("height", (stopY - startY) * cFactor);
        } else {
            $tag.css("visibility", "hidden");
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    setTimeout(function() {$("#b2").click();}, 500);
    window.addEventListener("resize", function() {
        redraw();
    });
    
    
    
    $("#image").bind("load", function() {
        startX = NaN;
        startY = NaN;
        stopX = NaN;
        stopY = NaN;
        redraw();
        
        
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
            isPortrait = true;
            zoom = 100;
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
            isPortrait = false;
            zoom = 100;
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
    
    
    function plus() {
        // Zoom in
        zoom += 10;
        redraw();
    }
    
    function minus() {
        // Zoom out
        zoom -= 10;
        redraw();
    }
    
    function reset() {
        zoom = 100;
        translationX = 0;
        translationY = 0;
        redraw();
    }
    
    
    function up() {
        translationY += 10;
        redraw();
    }
    
    function left() {
        translationX += 10;
        redraw();
    }
    
    function down() {
        translationY -= 10;
        redraw();
    }
    
    function right() {
        translationX -= 10;
        redraw();
    }
    
    
    
    $(document).keypress(function(event) {
        
        
        
        if (event.code == "Period") {
            plus();
        }
        
        if (event.code == "Comma") {
            minus();
        }
        
        if (event.code == "Digit0") {
            reset();
        }
        
        if (event.code == "KeyW") {
            up();
        }
        
        if (event.code == "KeyA") {
            left();
        }
        
        if (event.code == "KeyS") {
            down();
        }
        
        if (event.code == "KeyD") {
            right();
        }
        
        
    });
    
    
    
    $("#plus").click(plus);
    $("#minus").click(minus);
    $("#reset").click(reset);
    
    $("#up").click(up);
    $("#left").click(left);
    $("#down").click(down);
    $("#right").click(right);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // wait for the content of the window element
    // to load, then performs the operations.
    // This is considered best practice.


    
       
    const canvas = document.querySelector('#canvas');

    // Context for the canvas for 2 dimensional operations
    const ctx = canvas.getContext('2d');
    
       
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
        
        if (event.touches == null) {
            
            coord.x = (event.x - canvas.getBoundingClientRect().left) / rateX;
            coord.y = (event.y - canvas.getBoundingClientRect().top) / rateY;
            
        } else {
            
            coord.x = (event.touches[0].clientX - canvas.getBoundingClientRect().left) / rateX;
            coord.y = (event.touches[0].clientY - canvas.getBoundingClientRect().top) / rateY;
            
            
        }
        
        
        
        
        
        
        
        
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
        if (event.touches != null && event.touches.length > 1) {
            event.preventDefault();
            return;
        }
        
        
        
        paint = true;
        getPosition(event);
        window.tmp = event;
        event.preventDefault();
    }

    function stopPainting(){
        
        paint = false;
        event.preventDefault();
        redraw();
    }
       
    function sketch(event){
        
        
        
        if (!paint) return;
        
        
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

    
    
    
    
    
    
    canvas.addEventListener('mousedown', startPainting, { passive: false });
    canvas.addEventListener('mouseup', stopPainting, { passive: false });
    canvas.addEventListener('mouseout', stopPainting, { passive: false });
    canvas.addEventListener('mousemove', sketch, { passive: false });
    
    
    canvas.addEventListener('touchstart', startPainting, { passive: false });
    canvas.addEventListener('touchend', stopPainting, { passive: false });
    canvas.addEventListener('touchmove', sketch, { passive: false });
    
    
    var gestureStartZoom;
    var gestureStartFingerPosX;
    var gestureStartFingerPosY;
    var gestureStartXValue;
    var gestureStartYValue;
    window.document.addEventListener("gesturestart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        
        gestureStartZoom = zoom;
        gestureStartFingerPosX = event.clientX;
        gestureStartFingerPosY = event.clientY;
        gestureStartXValue = translationX;
        gestureStartYValue = translationY;
    }, false);
    
    window.document.addEventListener("gesturechange", function(event) {
        event.stopPropagation();
        event.preventDefault();
        
        // Zoom
        zoom = gestureStartZoom * event.scale;
        
        // Translate
        var deltaX = event.clientX - gestureStartFingerPosX;
        var deltaY = event.clientY - gestureStartFingerPosY;
        translationX = gestureStartXValue + deltaX;
        translationY = gestureStartYValue + deltaY;
        
        // Redraw
        redraw();
        
        
        
        
    }, false);
    
    window.document.addEventListener("gestureend", function(event) {
        event.stopPropagation();
        event.preventDefault();
    }, false);
});

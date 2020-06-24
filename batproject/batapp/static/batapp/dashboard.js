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
    var $container = $("#container");
    
    // Redraw function
    function redraw() {
        // Translate
        $trans.css("transform", "translate(" + translationX + "px, " + translationY + "px)");
        
        // Zoom
        if (isPortrait) {
            $image.css("width", zoom + "%");
            $image.css("height", "auto");
        } else {
            $image.css("height", zoom + "%");
            $image.css("width", "auto");
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
    
    // Trigger redrawing when window size is changed
    window.addEventListener("resize", function() {
        redraw();
    });
    
    // Load new image
    function loadImage(url) {
        $container.addClass("empty");
        $image.attr("src", url);
    }
    
    // Complete loading of new image
    $image.bind("load", function() {
        zoom = 100;
        translationX = 0;
        translationY = 0;
        
        startX = NaN;
        startY = NaN;
        stopX = NaN;
        stopY = NaN;
        
        $canvas[0].width = $image[0].naturalWidth;
        $canvas[0].height = $image[0].naturalHeight;
        
        if ($image[0].naturalWidth > $image[0].naturalHeight) {
            isPortrait = true;
        } else {
            isPortrait = false;
        }
        
        redraw();
        $container.removeClass("empty");
    });
    
    
    
    
    
    
    
    
    // Enable picture buttons
    $("#b1").click(function() {
        loadImage("https://frank.kohlhepp.me/tmp/querformat.jpg");
    });
    
    $("#b2").click(function() {
        loadImage("https://frank.kohlhepp.me/tmp/hochformat.jpg");
    });
    
    // Enable keyboard shortcuts and control buttons
    function plus() {
        zoom += 10;
        redraw();
    }
    
    function minus() {
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


    
       
    

    // Context for the canvas for 2 dimensional operations
    const ctx = $canvas[0].getContext('2d');
    
       
    // Stores the initial position of the cursor
    let coord = {x:0 , y:0};

    // This is the flag that we are going to use to
    // trigger drawing
    let paint = false;







    var startX = NaN;
    var startY = NaN;
    var stopX = NaN;
    var stopY = NaN;
    var backupStartX = NaN;
    var backupStartY = NaN;
    var backupStopX = NaN;
    var backupStopY = NaN;



       
    // Updates the coordianates of the cursor when
    // an event e is triggered to the coordinates where
    // the said event is triggered.
    function getPosition(event){
        var img = $("#image");
        var cv = $("#canvas");
        var ct = $("#container");
        var trans = $("#translation");
        
        var rateX = Number(cv.css("width").slice(0, -2)) / $canvas[0].width;
        var rateY = Number(cv.css("height").slice(0, -2)) / $canvas[0].height;
        
        if (event.touches == null) {
            
            coord.x = (event.x - $canvas[0].getBoundingClientRect().left) / rateX;
            coord.y = (event.y - $canvas[0].getBoundingClientRect().top) / rateY;
            
        } else {
            
            coord.x = (event.touches[0].clientX - $canvas[0].getBoundingClientRect().left) / rateX;
            coord.y = (event.touches[0].clientY - $canvas[0].getBoundingClientRect().top) / rateY;
            
            
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
        backupStartX = startX;
        backupStartY = startY;
        backupStopX = stopX;
        backupStopY = stopY;
        startX = NaN;
        startY = NaN;
        stopX = NaN;
        stopY = NaN;
        
        event.preventDefault();
        
        paint = true;
        getPosition(event);
        window.tmp = event;
    }

    function stopPainting(event){
        event.preventDefault();
        
        paint = false;
        ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
        redraw();
    }
    
    function cancelPainting(){
        console.log("cancelling");
        
        paint = false;
        ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
        
        // restore backup
        startX = backupStartX;
        startY = backupStartY;
        stopX = backupStopX;
        stopY = backupStopY;
        
        redraw();
    }
       
    function sketch(event){
        event.preventDefault();
        
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
    }

    
    
    
    
    
    
    $canvas[0].addEventListener('mousedown', startPainting, { passive: false });
    $canvas[0].addEventListener('mouseup', stopPainting, { passive: false });
    $canvas[0].addEventListener('mouseout', stopPainting, { passive: false });
    $canvas[0].addEventListener('mousemove', sketch, { passive: false });
    
    
    $canvas[0].addEventListener('touchstart', startPainting, { passive: false });
    $canvas[0].addEventListener('touchend', stopPainting, { passive: false });
    $canvas[0].addEventListener('touchmove', sketch, { passive: false });
    
    
    var gestureStartZoom;
    var gestureStartFingerPosX;
    var gestureStartFingerPosY;
    var gestureStartXValue;
    var gestureStartYValue;
    window.document.addEventListener("gesturestart", function(event) {
        event.preventDefault();
        
        if (paint) {
            cancelPainting();
        }
        
        gestureStartZoom = zoom;
        gestureStartFingerPosX = event.clientX;
        gestureStartFingerPosY = event.clientY;
        gestureStartXValue = translationX;
        gestureStartYValue = translationY;
    }, false);
    
    window.document.addEventListener("gesturechange", function(event) {
        event.preventDefault();
        
        if (paint) {
            cancelPainting();
        }
        
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
        event.preventDefault();
        
        if (paint) {
            cancelPainting();
        }
    }, false);
});

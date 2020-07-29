$(document).ready(function() {
    // Globals
    var clipToMaxHeight = true;
    var zoom = 100; // in percent
    var translationX = 0; // in pixel
    var translationY = 0; // in pixel
    var cFactor = 1; // canvas displayed size in relation to real size
    
    // Coordinates of tag
    var coords = {
        start: {
            x: NaN,
            y: NaN
        },
        stop: {
            x: NaN,
            y: NaN
        }
    };
    
    function resetCoords() {
        coords.start.x = NaN;
        coords.start.y = NaN;
        coords.stop.x = NaN;
        coords.stop.y = NaN;
    }
    
    function addCoord(coord) {
        if (Number.isNaN(coords.start.x) || coord.x < coords.start.x) {
            coords.start.x = coord.x;
        }  
        
        if (Number.isNaN(coords.start.y) || coord.y < coords.start.y) {
            coords.start.y = coord.y;
        }
        
        if (Number.isNaN(coords.stop.x) || coord.x > coords.stop.x) {
            coords.stop.x = coord.x;
        }
        
        if (Number.isNaN(coords.stop.y) || coord.y > coords.stop.y) {
            coords.stop.y = coord.y;
        }
    }
    
    // DOM elements
    var $image = $("#image");
    var $trans = $("#translation");
    var $tagcontainer = $("#tagcontainer");
    var $tag = $("#tag");
    var $container = $("#container");
    var $canvas = $("#canvas");
    var ctx = $canvas[0].getContext('2d');
    
    // Functions to help keep element in middle point when zooming
    function calcMiddleTranslation() {
        var x = translationX / cFactor;
        var y = translationY / cFactor;
        return {x, y};
    }
    
    function setMiddleTranslation(transObj) {
        translationX = transObj.x * cFactor;
        translationY = transObj.y * cFactor;
        redraw();
    }
    
    // Redraw function
    function redraw() {
        var imgRatio = $image[0].naturalWidth / $image[0].naturalHeight;
        var containerRatio = $container.width() / $container.height();
        
        if (imgRatio > containerRatio) {
            clipToMaxHeight = false;
        } else {
            clipToMaxHeight = true;
        }
        
        // Translate
        $trans.css("transform", "translate(" + translationX + "px, " + translationY + "px)");
        
        // Zoom
        if (!clipToMaxHeight) {
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
        
        if (!Number.isNaN(coords.start.x) && !Number.isNaN(coords.start.y) &&
            !Number.isNaN(coords.stop.x) && !Number.isNaN(coords.stop.y)) {
            $tag.css("visibility", "visible");
            $tag.css("top", (coords.start.y * cFactor));
            $tag.css("left", (coords.start.x * cFactor));
            $tag.css("width", (coords.stop.x - coords.start.x) * cFactor);
            $tag.css("height", (coords.stop.y - coords.start.y) * cFactor);
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
        zoom = 100;
        translationX = 0;
        translationY = 0;
        
        resetCoords();
        
        redraw();
        
        if ($image.attr("src") != url) {
            $container.addClass("empty");
            $image.attr("src", url);
        }
    }
    
    // Complete loading of new image
    $image.bind("load", function() {
        $canvas[0].width = $image[0].naturalWidth;
        $canvas[0].height = $image[0].naturalHeight;
        
        redraw();
        $container.removeClass("empty");
    });
    
    
    // Zooming and panning
    var gestureStartZoom;
    var gestureStartFingerPosX;
    var gestureStartFingerPosY;
    var gestureStartTransObj;
    
    $(document).on("gesturestart", function(event) {
        event.preventDefault();
        
        if (drawing) {
            cancelDrawing();
        }
        
        gestureStartZoom = zoom;
        gestureStartFingerPosX = event.clientX;
        gestureStartFingerPosY = event.clientY;
        gestureStartTransObj = calcMiddleTranslation();
    });
    
    $(document).on("gesturechange", function(event) {
        event.preventDefault();
        
        if (drawing) {
            cancelDrawing();
        }
        
        // Zoom
        zoom = gestureStartZoom * event.originalEvent.scale;
        redraw(); // needed so we get new cFactor for setMiddleTranslation()
        setMiddleTranslation(gestureStartTransObj);
        
        gestureStartCorrectedTranslationX = translationX;
        gestureStartCorrectedTranslationY = translationY;
        
        // Translate
        var deltaX = event.clientX - gestureStartFingerPosX;
        var deltaY = event.clientY - gestureStartFingerPosY;
        translationX = gestureStartCorrectedTranslationX + deltaX;
        translationY = gestureStartCorrectedTranslationY + deltaY;
        
        // Redraw
        redraw();
    });
    
    $(document).on("gestureend", function(event) {
        event.preventDefault();
        
        if (drawing) {
            cancelDrawing();
        }
        
        if (zoom < 100) {
            zoom = 100;
            translationX = 0;
            translationY = 0;
            redraw();
        }
    });
    
    
    
    
    // Enable keyboard shortcuts and control buttons
    function plus() {
        var transObj = calcMiddleTranslation();
        zoom += 10;
        redraw()
        setMiddleTranslation(transObj);
    }
    
    function minus() {
        var transObj = calcMiddleTranslation();
        zoom -= 10;
        redraw()
        setMiddleTranslation(transObj);
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    function load() {
        $("#img-id").text("[" + data.id + "] ");
        $("#totag").text(data.label);
        
        loadImage(data.url);
        if (data.tagged) {
            $("#tag-delete").attr("disabled", false);
            coords.start.x = data.x;
            coords.start.y = data.y;
            coords.stop.x = data.x + data.width;
            coords.stop.y = data.y + data.height;
        }
    }
    
    load();
    
    
    
    
    function deleteTag() {
        if (confirm("Are you sure?")) {
            alert("not yet implemented...");
        }
    }
    
    
    $("#tag-delete").click(deleteTag);
    
    
    
});

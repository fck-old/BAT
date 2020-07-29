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
    
    var backupStartX;
    var backupStartY;
    var backupStopX;
    var backupStopY;
    
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
    
    
    
    /*
     *
     * Touch Support
     *
     */
    $canvas.on("touchstart", startDrawing);
    $canvas.on("touchend", stopDrawing);
    $canvas.on("touchmove", draw);
    $canvas.on("touchcancel", cancelDrawing);
    
    var drawing = false;
    var hasDrawn = false;
    var lastCoord = {x: 0, y: 0};
    
    function startDrawing(event) {
        event.preventDefault();
        
        if (isTagged) {
            return;
        }
        
        backupStartX = coords.start.x;
        backupStartY = coords.start.y;
        backupStopX = coords.stop.x;
        backupStopY = coords.stop.y;
        
        resetCoords();
        processDrawCoord(event);
        drawing = true;
        hasDrawn = false;
    }
    
    function stopDrawing(event) {
        event.preventDefault();
        
        if (!drawing) {
            return;
        }
        
        if (!hasDrawn) {
            cancelDrawing();
            return;
        }
        
        drawing = false;
        ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
        redraw();
        tagTrigger();
    }
    
    function draw(event) {
        event.preventDefault();
        
        if (!drawing) {
            return;
        }
        
        ctx.beginPath();
        ctx.lineWidth = 2 / cFactor;
        ctx.strokeStyle = "#F8B500";
        ctx.lineCap = "round";
        ctx.moveTo(lastCoord.x, lastCoord.y);
        processDrawCoord(event);
        ctx.lineTo(lastCoord.x , lastCoord.y);
        ctx.stroke();
        hasDrawn = true;
    }
    
    function cancelDrawing(event) {
        event && event.preventDefault();
        
        if (!drawing) {
            return;
        }
        
        drawing = false;
        coords.start.x = backupStartX;
        coords.start.y = backupStartY;
        coords.stop.x = backupStopX;
        coords.stop.y = backupStopY;
        
        ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
        redraw();
    }
    
    function processDrawCoord(event) {
        var x = (event.originalEvent.touches[0].clientX - $canvas[0].getBoundingClientRect().left) / cFactor;
        var y = (event.originalEvent.touches[0].clientY - $canvas[0].getBoundingClientRect().top) / cFactor;
        
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > $image[0].naturalWidth) x = $image[0].naturalWidth;
        if (y > $image[0].naturalHeight) y = $image[0].naturalHeight;
        
        lastCoord.x = x;
        lastCoord.y = y;
        addCoord(lastCoord);
    }
    
    
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
    
    
    
    /*
     *
     * Mouse Support
     *
     */
    $canvas.on("mousedown", startRecting);
    $(document).on("mouseup", stopRecting);
    $(document).on("mousemove", rect);
    
    var recting = false;
    var hasRected = false;
    var startCoord;
    
    function startRecting(event) {
        event.preventDefault();
        
        if (isTagged) {
            return;
        }
        
        backupStartX = coords.start.x;
        backupStartY = coords.start.y;
        backupStopX = coords.stop.x;
        backupStopY = coords.stop.y;
        
        startCoord = getRectCoord(event);
        
        resetCoords();
        addCoord(startCoord);
        
        recting = true;
        hasRected = false;
    }
    
    function stopRecting(event) {
        event.preventDefault();
        
        if (!recting) {
            return;
        }
        
        if (!hasRected) {
            cancelRecting();
            return;
        }
        
        resetCoords();
        addCoord(startCoord);
        addCoord(getRectCoord(event));
        
        recting = false;
        redraw();
        tagTrigger();
    }
    
    function rect(event) {
        event.preventDefault();
        
        if (!recting) {
            return;
        }
        
        resetCoords();
        addCoord(startCoord);
        addCoord(getRectCoord(event));
        
        redraw();
        hasRected = true;
    }
    
    function cancelRecting() {
        if (!recting) {
            return;
        }
        
        recting = false;
        coords.start.x = backupStartX;
        coords.start.y = backupStartY;
        coords.stop.x = backupStopX;
        coords.stop.y = backupStopY;
        
        redraw();
    }
    
    function getRectCoord(event) {
        var x = (event.clientX - $canvas[0].getBoundingClientRect().left) / cFactor;
        var y = (event.clientY - $canvas[0].getBoundingClientRect().top) / cFactor;
        
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > $image[0].naturalWidth) x = $image[0].naturalWidth;
        if (y > $image[0].naturalHeight) y = $image[0].naturalHeight;
        
        return {x: x, y: y};
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // New
    var isTagged = false;
    
    
    $isNotTaggedButtonArray = $("#is-not-tagged-button-array");
    $isTaggedButtonArray = $("#is-tagged-button-array");
    $tagReset = $("#tag-reset");
    $tagSave = $("#tag-save");
    
    function tagTrigger() {
        isTagged = true;
        $isNotTaggedButtonArray.addClass("d-none");
        $isTaggedButtonArray.removeClass("d-none");
    }
    
    function tagReset() {
        resetCoords();
        redraw();
        $isNotTaggedButtonArray.removeClass("d-none");
        $isTaggedButtonArray.addClass("d-none");
        isTagged = false;
    }
    $tagReset.click(tagReset);
    
    
    
    function tagSave() {
        var tagInfo = getCoordiates();
        tagInfo.id = currentImageData.id;
        
        $.post("/tag", JSON.stringify(tagInfo), function(data) {
            var result = JSON.parse(data);
            if (result.success == true) {
                tagReset();
                getImage();
            } else {
                alert("Tag couldn't be saved!");
            }
        });
    }
    $tagSave.click(tagSave);
    
    
    
    function getCoordiates() {
        var coordinates = {};
        
        coordinates.x = coords.start.x;
        coordinates.y = coords.start.y;
        coordinates.width = coords.stop.x - coords.start.x;
        coordinates.height = coords.stop.y - coords.start.y;
        
        return coordinates;
    }
    
    
    var currentImageData;
    function getImage() {
        
        $("#totag").text("Loading...");
        $("#loading").text("Loading...");
        
        
        $.get("/untagged", function(data) {
            currentImageData = JSON.parse(data);
            
            if (currentImageData.image) {
                loadImage(currentImageData.url);
                $("#totag").text(currentImageData.label);
            } else {
                loadImage("");
                $("#totag").text("...");
                $("#loading").text("Inbox zero :)");
            }
            
        });
    }
    
    
    $("#skip").click(function() {
        getImage();
    });
    
    
    getImage();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // TODO
    
    
    // Enable picture buttons
    $("#b1").click(function() {
        loadImage("https://frank.kohlhepp.me/tmp/querformat.jpg");
    });
    
    $("#b2").click(function() {
        loadImage("https://frank.kohlhepp.me/tmp/hochformat.jpg");
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
    
    $("#plus").click(plus);
    $("#minus").click(minus);
    $("#reset").click(reset);
    
    $("#up").click(up);
    $("#left").click(left);
    $("#down").click(down);
    $("#right").click(right);
    
    
    
    
    
    
    
    
    
    
    
    
    
});

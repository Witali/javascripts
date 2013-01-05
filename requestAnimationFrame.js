window.requestAnimFrame = (function() {
    return 
        window.requestAnimationFrame || 
        window.msRequestAnimationFrame ||
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        (function(callback) { window.setTimeout(callback, 1000 / 60); });
})();
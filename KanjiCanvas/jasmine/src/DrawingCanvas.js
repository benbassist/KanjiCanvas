var DrawingCanvas = (function(){
    'use strict';
    function DrawingCanvas(el) {
        this.c = el;
        this.ctx = this.c.getContext('2d');
        this.moveHandler = null;
        this.upHandler = null;
        this.outHandler = null;
        this.drawStartCallback = null;
        this.drawCallback = null;
        this.drawEndCallback = null;
        this.c.addEventListener("mousedown", this.drawStart.bind(this), false);

        // canvas and line style
        this.c.height = this.c.clientHeight;
        this.c.width = this.c.clientWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 3;
    }

    // given a mouse event, returns mouse coordinates relative to the canvas
    DrawingCanvas.prototype.getOffset = function(e) {
        var rect = e.target.getBoundingClientRect();
        return {
            x: e.offsetX || e.pageX - rect.left - window.scrollX,
            y: e.offsetY || e.pageY - rect.top - window.scrollY
        };
    };

    // initializes canvas path, registers handlers for other mouse events
    DrawingCanvas.prototype.drawStart = function(e) {
        var p = this.getOffset(e);
        this.c.addEventListener("mousemove", this.moveHandler = this.draw.bind(this), false);
        this.c.addEventListener("mouseup", this.upHandler = this.drawEnd.bind(this), false);
        this.c.addEventListener("mouseout", this.outHandler = this.drawEnd.bind(this), false);
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x, p.y);
        this.ctx.stroke();
        if(typeof this.drawStartCallback === 'function') {
            this.drawStartCallback(p.x, p.y);
        }
    };

    // continues the path to the current mouse coordinates and draws it
    DrawingCanvas.prototype.draw = function(e) {
        var p = this.getOffset(e);
        this.ctx.lineTo(p.x, p.y);
        this.ctx.stroke();
        if(typeof this.drawCallback === 'function') {
            this.drawCallback(p.x, p.y);
        }
    };

    // closes the path and removes the mouse event handlers
    DrawingCanvas.prototype.drawEnd = function (e) {
        this.ctx.closePath();
        this.c.removeEventListener('mousemove', this.moveHandler);
        this.c.removeEventListener('mouseup', this.upHandler);
        this.c.removeEventListener('mouseout', this.outHandler);
        this.upHandler = null;
        this.moveHandler = null;
        this.outHandler = null;
        if(typeof this.drawEndCallback === 'function') {
            this.drawEndCallback();
        }
    };

    DrawingCanvas.prototype.clear = function () {
        this.ctx.clearRect(0,0,this.c.width, this.c.height);
    };

    DrawingCanvas.prototype.onDrawStart = function(callback) {
        this.drawStartCallback = callback;
    };

    DrawingCanvas.prototype.onDraw = function(callback) {
        this.drawCallback = callback;
    };

    DrawingCanvas.prototype.onDrawEnd = function(callback) {
        this.drawEndCallback = callback;
    };

    return DrawingCanvas;
})();
var CanvasDraw = (function(){
    'use strict';
    function CanvasDraw(el) {
        this.c = el;
        this.ctx = this.c.getContext('2d');
        this.moveHandler = null;
        this.upHandler = null;
        this.outHandler = null;
        this.c.addEventListener("mousedown", this.drawStart.bind(this), false);

        // canvas and line style
        this.c.height = this.c.clientHeight;
        this.c.width = this.c.clientHeight;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 3;
    }

    // given a mouse event returns mouse coordinates relative to the canvas
    CanvasDraw.prototype.getOffset = function(e) {
        var rect = e.target.getBoundingClientRect();
        return {
            x: e.offsetX || e.pageX - rect.left - window.scrollX,
            y: e.offsetY || e.pageY - rect.top - window.scrollY
        };
    };

    // initializes canvas path, registers handlers for other mouse events
    CanvasDraw.prototype.drawStart = function(e) {
        var p = this.getOffset(e);
        this.c.addEventListener("mousemove", this.moveHandler = this.draw.bind(this), false);
        this.c.addEventListener("mouseup", this.upHandler = this.drawEnd.bind(this), false);
        this.c.addEventListener("mouseout", this.outHandler = this.drawEnd.bind(this), false);
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
    };

    // continues the path to the current mouse coordinates and draws it
    CanvasDraw.prototype.draw = function(e) {
        var p = this.getOffset(e);
        this.ctx.lineTo(p.x, p.y);
        this.ctx.stroke();
    };

    // closes the path and removes the mouse event handlers
    CanvasDraw.prototype.drawEnd = function (e) {
        this.draw(e);
        this.ctx.closePath();
        this.c.removeEventListener('mousemove', this.moveHandler);
        this.c.removeEventListener('mouseup', this.upHandler);
        this.c.removeEventListener('mouseout', this.outHandler);
        this.upHandler = null;
        this.moveHandler = null;
    }

    return CanvasDraw;
})();
var CanvasDraw = (function(){
    'use strict';
    function CanvasDraw(el) {
        this.c = el;
        this.ctx = this.c.getContext('2d');
        this.moveHandler = null;
        this.c.addEventListener("mousedown", this.drawStart.bind(this), false);
        this.c.addEventListener("mouseup", this.drawEnd.bind(this), false);
        this.c.addEventListener("mouseout", this.drawEnd.bind(this), false);

        this.c.height = this.c.clientHeight;
        this.c.width = this.c.clientHeight;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 3;
    }

    CanvasDraw.prototype.getOffset = function(e) {
        var rect = e.target.getBoundingClientRect();
        return {
            x: e.offsetX || e.pageX - rect.left - window.scrollX,
            y: e.offsetY || e.pageY - rect.top - window.scrollY
        };
    };

    CanvasDraw.prototype.drawStart = function(e) {
        var p = this.getOffset(e);
        this.c.addEventListener("mousemove", this.moveHandler = this.draw.bind(this), false);
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
    };

    CanvasDraw.prototype.draw = function(e) {
        var p = this.getOffset(e);
        this.ctx.lineTo(p.x, p.y);
        this.ctx.stroke();
    };

    CanvasDraw.prototype.drawEnd = function(e) {
        if(this.moveHandler) {
            this.draw(e);
            this.ctx.closePath();
            this.c.removeEventListener('mousemove', this.moveHandler);
            this.moveHandler = null;
        }
    }

    return CanvasDraw;
})();
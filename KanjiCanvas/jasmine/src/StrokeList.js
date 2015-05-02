var StrokeList = (function(helper){
	'use strict';

	function StrokeList() {
		this.strokes = [];
		this.add = function (stroke) {
			this.strokes.push(stroke);
		};
	}

    StrokeList.prototype.area = function() {
        return (this.maxX() - this.minX()) * (this.maxY() - this.minY());
    };

    StrokeList.prototype.maxX = function() {
        var i, temp, x = null;
        for(i = 0; i < this.strokes.length; i++){
            temp = this.strokes[i].maxX();
            if(x === null || temp > x) {
                x = temp;
            }
        }
        return x;
    };

    StrokeList.prototype.maxY = function() {
        var i, temp, y = null;
        for(i = 0; i < this.strokes.length; i++){
            temp = this.strokes[i].maxY();
            if(y === null || temp > y) {
                y = temp;
            }
        }
        return y;
    };

    StrokeList.prototype.minX = function() {
        var i, temp, x = null;
        for(i = 0; i < this.strokes.length; i++){
            temp = this.strokes[i].minX();
            if(x === null || temp < x) {
                x = temp;
            }
        }
        return x;
    };

    StrokeList.prototype.minY = function() {
        var i, temp, y = null;
        for(i = 0; i < this.strokes.length; i++){
            temp = this.strokes[i].minY();
            if(y === null || temp < y) {
                y = temp;
            }
        }
        return y;
    };    
    
	return StrokeList;
})(helper);
var StrokeList = (function(helper){
	'use strict';

	function StrokeList() {
		var maxX, maxY, minX, minY;
		this.strokes = [];
		this.area = 0;
		this.add = function (stroke) {
			this.strokes.push(stroke);
			maxX = helper.max(maxX, stroke[0].x, stroke[1].x);
			maxY = helper.max(maxY, stroke[0].y, stroke[1].y);
			minX = helper.min(minX, stroke[0].x, stroke[1].x);
			minY = helper.min(minY, stroke[0].y, stroke[1].y);
			this.area = (maxX - minX) * (maxY - minY);
		};
	}

	return StrokeList;
})(helper);
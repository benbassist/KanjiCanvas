var Stroke = (function () {
	'use strict';

	function Stroke() {
		this.points = arguments.length === 0 ? [] :
			Array.prototype.slice.call(arguments);
		this.angle = NaN;
	}

	Stroke.prototype.add = function (point) {
		this.points.push(point);
		if (this.points.length > 1) {
			this.angle = this.getAngle();
		}
	};

	Stroke.prototype.maxX = function () {
		var i, x = null;
		for (i = 0; i < this.points.length; i++) {
			if (x === null || this.points[i].x > x) {
				x = this.points[i].x;
			}
		}
		return x;
	};

	Stroke.prototype.minX = function () {
		var i, x = null;
		for (i = 0; i < this.points.length; i++) {
			if (x === null || this.points[i].x < x) {
				x = this.points[i].x;
			}
		}
		return x;
	};

	Stroke.prototype.maxY = function () {
		var i, y = null;
		for (i = 0; i < this.points.length; i++) {
			if (y === null || this.points[i].y > y) {
				y = this.points[i].y;
			}
		}
		return y;
	};

	Stroke.prototype.minY = function () {
		var i, y = null;
		for (i = 0; i < this.points.length; i++) {
			if (y === null || this.points[i].y < y) {
				y = this.points[i].y;
			}
		}
		return y;
	};

	Stroke.prototype.area = function () {
		return (this.maxX() - this.minX()) * (this.maxY() - this.minY());
	};

	Stroke.prototype.getAngle = function () {
		var p1 = this.points[0],
			p2 = this.points[this.points.length - 1];
		return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
	};

	return Stroke;
})();
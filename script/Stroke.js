var Stroke = (function () {
	'use strict';

	function Stroke() {
		this.points = [];
		this.angle = NaN;
		this.area = NaN;

		var args = Array.prototype.slice.call(arguments);
		for(var i = 0; i < args.length; i++) {
			this.add(args[i]);
		}
	}

	Stroke.prototype.add = function (point) {
		this.points.push(point);
		if (this.points.length > 1) {
			this.angle = this.getAngle();
			this.area = this.getArea();
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

	Stroke.prototype.getAngle = function () {
		var p1 = this.points[0],
			p2 = this.points[this.points.length - 1];
		return Math.atan2((p2.y - p1.y) * -1, p2.x - p1.x) * 180 / Math.PI;
	};

	Stroke.prototype.getArea = function () {
		return (this.maxX() - this.minX()) * (this.maxY() - this.minY());
	};

	return Stroke;
})();
var Stroke = (function(){
	function Stroke() {
		this.points = [];
	}

	Stroke.prototype.add = function(point) {
		this.points.push(point);
	};

	return Stroke;
})();
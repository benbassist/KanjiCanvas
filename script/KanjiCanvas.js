var KanjiCanvas = (function (kanjiMatcher, DrawingCanvas, StrokeList, Stroke, p) {
	'use strict';

	function KanjiCanvas(el) {
		this.kc = el;
		this.canvas = new DrawingCanvas(el.querySelector('canvas'));
		this.clearBtn = this.kc.querySelector('.clear');
		this.submitBtn = this.kc.querySelector('.submit');
		this.strokeList = new StrokeList();
		this.currStroke = null;
		this.canvas.onDrawStart(this.drawStartHandler.bind(this));
		this.canvas.onDraw(this.drawHandler.bind(this));
		this.canvas.onDrawEnd(this.drawEndHandler.bind(this));
		this.submitCallback = null;
		this.clearBtn.addEventListener('click', this.clear.bind(this));
		this.submitBtn.addEventListener('click', this.submit.bind(this));
	}

	KanjiCanvas.prototype.clear = function () {
		this.canvas.clear();
		this.strokeList.clear();
	};

	KanjiCanvas.prototype.submit = function () {
		var strokes = this.strokeList.strokes.map(function(i){ return i.angle; });
		var results = kanjiMatcher.match(this.strokeList);
		console.log(results);
		if (typeof this.submitCallback === 'function') {
			this.submitCallback(results);
		}
	};

	KanjiCanvas.prototype.drawStartHandler = function (x, y) {
		this.currStroke = new Stroke(p(x, y));
	};

	KanjiCanvas.prototype.drawHandler = function (x, y) {
		if (this.currStroke) {
			this.currStroke.add(p(x, y));
		}
	};

	KanjiCanvas.prototype.drawEndHandler = function () {
		if (this.currStroke) {
			this.strokeList.add(this.currStroke);
		}
	};

	KanjiCanvas.prototype.onSubmit = function (callback) {
		this.submitCallback = callback;
	};

	return KanjiCanvas;

})(kanjiMatcher, DrawingCanvas, StrokeList, Stroke, p);
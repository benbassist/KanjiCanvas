(function(){
	'use strict';

	describe('StrokeList', function() {
		var strokeList;

		beforeEach(function(){
			strokeList = new StrokeList();
		});

		it('should have an empty stroke list when instantiated', function(){
			expect(strokeList.strokes).toEqual([]);
		});

		//it('should allow a stroke to be added', function(){
		//	//var stroke1 = [{x: 0, y: 0}, {x: 1, y: 1}];
		//	var stroke1 = new Stroke(p(0,0), p(1,1));
		//	strokeList.add(stroke1);
		//	expect(strokeList.strokes).toContain(stroke1);
		//});

		//it('should maintain the order of strokes added', function(){
		//	var stroke1 = [{x: 0, y: 0}, {x: 1, y: 1}],
		//		stroke2 = [{x: 1, y: 1}, {x: 2, y: 2}],
		//		stroke3 = [{x: -3, y: -3}, {x: 0, y: 10}];
		//	strokeList.add(stroke1);
		//	strokeList.add(stroke2);
		//	strokeList.add(stroke3);
		//	expect(strokeList.strokes[0]).toEqual(stroke1);
		//	expect(strokeList.strokes[1]).toEqual(stroke2);
		//	expect(strokeList.strokes[2]).toEqual(stroke3);
		//});
		//
		//it(
		//	'should calculate the area of the bounding box around all strokes',
		//	function() {
		//		var stroke1 = [{x: 0, y: 0}, {x: 1, y: 1}],
		//			stroke2 = [{x: 0, y: 0}, {x: 2, y: 2}],
		//			stroke3 = [{x: -5, y: -5}, {x: -5, y: 5}];
		//		strokeList.add(stroke1);
		//		expect(strokeList.area).toEqual(1);
		//		strokeList.add(stroke2);
		//		expect(strokeList.area).toEqual(4);
		//		strokeList.add(stroke3);
		//		expect(strokeList.area).toEqual(70);
		//	}
		//);
	});
})();
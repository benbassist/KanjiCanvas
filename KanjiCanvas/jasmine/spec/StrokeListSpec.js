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

		it('should allow a stroke to be added', function(){
			var stroke1 = new Stroke(p(0,0), p(1,1));
			strokeList.add(stroke1);
			expect(strokeList.strokes).toContain(stroke1);
		});

		it('should maintain the order of strokes added', function(){
			var stroke1 = new Stroke(p(0,0), p(1,1)),
				stroke2 = new Stroke(p(1,1), p(2,2)),
				stroke3 = new Stroke(p(-3,-3), p(0,10));
			strokeList.add(stroke1);
			strokeList.add(stroke2);
			strokeList.add(stroke3);
			expect(strokeList.strokes[0]).toEqual(stroke1);
			expect(strokeList.strokes[1]).toEqual(stroke2);
			expect(strokeList.strokes[2]).toEqual(stroke3);
		});

		it(
			'should be able to return the area of the bounding box around all strokes',
			function() {
                var stroke1 = new Stroke(p(0,0), p(1,1)),
                    stroke2 = new Stroke(p(1,1), p(2,2)),
                    stroke3 = new Stroke(p(-5,-5), p(-5,5));
				strokeList.add(stroke1);
				expect(strokeList.area()).toEqual(1);
				strokeList.add(stroke2);
				expect(strokeList.area()).toEqual(4);
				strokeList.add(stroke3);
				expect(strokeList.area()).toEqual(70);
			}
		);
	});
})();
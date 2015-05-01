(function(){
	'use strict';
	describe('Stroke', function() {
		var stroke;

		beforeEach(function(){
			stroke = new Stroke();
		});

		it('should exist', function(){
			expect(stroke).toExist();
		});

		it('should allow you to add points', function(){
			var p1 = p(1,1);
			stroke.add(p1);
			expect(stroke.points).toContain(p1);
		});

		it('should maintain the order of points added', function(){
			var p1 = p(1,1),
				p2 = p(2,2),
				p3 = p(3,3);
			stroke.add(p1);
			stroke.add(p2);
			stroke.add(p3);
			expect(stroke.points[0]).toEqual(p1);
			expect(stroke.points[1]).toEqual(p2);
			expect(stroke.points[2]).toEqual(p3);
		});

		describe('max min functionality', function() {
			beforeEach(
				function () {
					var p1 = p(0, 1), p2 = p(1, 2), p3 = p(2, 3);
					stroke.add(p1);
					stroke.add(p2);
					stroke.add(p3);
				}
			)
			it('should be able to return its max x coordinate', function () {
				expect(stroke.maxX()).toEqual(2);
			});
			it('should be able to return its min x coordinate', function () {
					expect(stroke.minX()).toEqual(0);
				});
			it('should be able to return its max y coordinate', function () {
					expect(stroke.maxY()).toEqual(3);
				});
			it('should be able to return its min y coordinate', function () {
					expect(stroke.minY()).toEqual(1);
				});
		});
	});
})();

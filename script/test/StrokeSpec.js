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

		it('should allow you to add points on instantiation', function(){
			var p1 = p(1,1),
                p2 = p(2,2),
                s = new Stroke(p1, p2);

			expect(s.points).toContain(p1);
            expect(s.points).toContain(p2);
		});

        it('should allow you to add points after instantiation', function(){
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

        it(
            'should be able to return the angle ' +
            'of the line drawn between the start and end points',
            function(){
                var p1 = p(54.5, 20),
                    p2 = p(54.28, 26.27),
                    p3 = p(16.5, 87.25);
                stroke.add(p1);
                stroke.add(p2);
                stroke.add(p3);
                expect(stroke.angle).toBeCloseTo(-119.46887004217427, 0);
            }
        );

        it(
            'should be able to return the area of the bounding box of the stroke',
            function(){
                var p1 = p(0,6),
                    p2 = p(3,3),
                    p3 = p(-4,-1);
                stroke.add(p1);
                stroke.add(p2);
                stroke.add(p3);
                expect(stroke.area).toEqual(49);
            }
        );

		describe('max min functions', function() {
			beforeEach(
				function () {
					var p1 = p(0, 1), p2 = p(1, 2), p3 = p(2, 3);
					stroke.add(p1);
					stroke.add(p2);
					stroke.add(p3);
				}
			);
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

describe('point', function(){
	it('should take x & y coordinates and return an object containing both coordinates',
		function(){
			var p1 = p(0,0);
			expect(p1).toEqual({x:0, y:0});
		}
	);

	it('should throw an error if either coordinate is not a number',
		function(){
			expect(function(){ p('a',1); }).toThrow(new TypeError('point coordinate is not a number'));
			expect(function(){ p(1,'a'); }).toThrow(new TypeError('point coordinate is not a number'));
		}
	);

	it('should throw an error if it is not passed exactly 2 coordinates',
		function(){
			expect(function(){ p(1); }).toThrow(new Error('point requires 2 coordinates'));
			expect(function(){ p(1,2,3); }).toThrow(new Error('point requires 2 coordinates'));
		}
	);
});
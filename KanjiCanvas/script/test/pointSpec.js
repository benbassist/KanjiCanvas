describe('point', function(){
	it('should take x & y coordinates and return an object containing both coordinates',
		function(){
			var p1 = p(0,0);
			expect(p1).toEqual({x:0, y:0});
		}
	);

	it('should throw an error if either coordinate is not a number',
		function(){
			expect(function(){ p('a',1); }).toThrowError(TypeError);
			expect(function(){ p(1,'a'); }).toThrowError(TypeError);
		}
	);

	it('should throw an error if it is not passed exactly 2 coordinates',
		function(){
			expect(function(){ p(1); }).toThrowError(Error);
			expect(function(){ p(1,2,3); }).toThrowError(Error);
		}
	);
});
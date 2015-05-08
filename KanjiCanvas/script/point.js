function p(x, y) {
	if(arguments.length !== 2) {
		throw new Error('point requires 2 coordinates');
	}
	if(isNaN(x) || isNaN(y)) {
		throw new TypeError('point coordinate is not a number');
	}
	return {'x': x, 'y': y};
}
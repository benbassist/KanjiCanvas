describe('KanjiMatcher', function () {
    it('should exist.', function () {
        expect(kanjiMatcher).toExist();
    });

    it('should have a match function.', function(){
        expect(typeof kanjiMatcher.match).toEqual('function');
    });

    describe('match function', function(){
        it('should return null if not passed an array.', function(){
         expect(kanjiMatcher.match()).toBe(null);
        });
        it('should, when passed an array of angles, return an array of strings ' +
            'representing kanji unicode.', function() {
            var ret = kanjiMatcher.match([1, 2, 3]);
            expect(Array.isArray(ret)).toEqual(true);
        });
        it('should, when passed an array of angles, return an array with the ' +
            'first element being the unicode of the best match.', function(){
            var ret = kanjiMatcher.match([-119.46887004217427, -36.86989764584401]);
            expect(ret[0]).toEqual('04eba');
        });
    });
});
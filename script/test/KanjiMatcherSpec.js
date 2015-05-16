describe('KanjiMatcher', function () {
    var km;

    beforeEach(function(){
        km = new KanjiMatcher();
    });

    it('should exist', function () {
        expect(KanjiMatcher).toExist();
    });

    it('should have a match function', function(){
        expect(typeof km.match).toEqual('function');
    });

    describe('match function', function(){
        it('should return null if not passed an array', function(){
         expect(km.match()).toBe(null);
        });
        it('should return an array of strings representing ' +
            'kanji unicode when passed an array of angles', function() {
                var ret = km.match([1, 2, 3]);
                expect(Array.isArray(ret)).toEqual(true);
        });

    });
});
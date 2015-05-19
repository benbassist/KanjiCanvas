describe('KanjiMatcher', function () {
    it('should exist.', function () {
        expect(kanjiMatcher).toExist();
    });

    it('should have a match function.', function () {
        expect(typeof kanjiMatcher.match).toEqual('function');
    });

    describe('match function', function () {
        var sl;
        beforeEach(function () {
            sl = new StrokeList();
            sl.add(new Stroke(p(54.5, 20), p(16.5, 87.25)));
            sl.add(new Stroke(p(46, 54.25), p(93, 89.5)));
        });

        it('should return null if not passed a StrokeList.', function () {
            expect(kanjiMatcher.match()).toBe(null);
        });
        it('should, when passed an array of angles, return an array of strings ' +
            'representing kanji unicode.', function () {
            var ret = kanjiMatcher.match(sl);
            expect(Array.isArray(ret)).toEqual(true);
        });
        it('should, when passed an array of angles, return an array with the ' +
            'first element being the unicode of the best match.', function () {
            var ret = kanjiMatcher.match(sl);
            expect(ret[0]).toEqual('04eba');
        });
    });
});
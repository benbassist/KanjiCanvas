describe('kanjiData', function(){
    it('has a list kanji', function(){
        expect(kanjiList).toExist();
    });
    it('has an index of kanji by number of strokes', function() {
        expect(numStrokeIndex).toExist();
    });
    it('indexes 2136 kanji', function(){
        expect(Object.keys(kanjiList).length).toEqual(2136);
    });
});
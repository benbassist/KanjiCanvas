describe('kanjiData', function(){
    it('exists', function(){
        expect(kanjiData).toExist();
    });

    it('has a kanji stroke data', function(){
        expect(kanjiData.strokeData).toExist();
    });
    it('has an index of kanji by number of strokes', function() {
        expect(kanjiData.numStrokesIndex).toExist();
    });
    it('indexes 2136 kanji', function(){
        expect(Object.keys(kanjiData.strokeData).length).toEqual(2136);
    });
});
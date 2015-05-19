var kanjiMatcher = {};

(function (kanjiData) {
    kanjiMatcher.match = function (strokeData) {
        if (!Array.isArray(strokeData)) {
            return null;
        }

        var numStrokes = strokeData.length;
        var potentialMatches = kanjiData.numStrokesIndex[numStrokes];
        var rankedMatches = rank(strokeData, potentialMatches);

        return rankedMatches;
    };

    function rank(strokeData, potentialMatches) {
        var i, j;
        var scores = [];
        for(i = 0; i < potentialMatches.length; i++) {
            var key = potentialMatches[i];
            scores[i] = { key: key, score: 0 };
            for(j = 0; j < strokeData.length; j++) {
                var diff = getAngleDiff(strokeData[j], kanjiData.strokeData[key][j]);
                scores[i].score += diff;
            }
        }
        scores.sort(function (a, b) {
            if (a.score < b.score) {
                return -1;
            }
            if (a.score > b.score) {
                return 1;
            }
            return 0;
        });

        return scores.map(function(item){
            return item.key;
        });
    }

    function getAngleDiff(a, b) {
        if(a < 0) { a = 360 + a; }
        if(b < 0) { b = 360 + b; }
        var diff = Math.abs(a - b);
        if(diff > 180) {
            diff = 360 - diff;
        }
        return diff;
    }
})(kanjiData);
// Print all of the news items on Hacker News
var jsdom = require("jsdom"),
    fs = require("fs"),
    jquery = fs.readFileSync("./jquery-1.11.2.min.js", "utf-8"),
    RXPathCommand = /([MmCcLlSsZzHhVvQqTtAa])[\s\d.,-]+/g,
    RXCommandCoord = /-?\d+(\.\d+)?/,
    RXCommandCoordPair = /-?\d+(\.\d+)?(\s*,?)-?\d+(\.\d+)?/;

jsdom.env({
    file: './kanjivg/0f9a8.svg',
    src: [jquery],
    done: parseKanji
});

// TODO:
// - parse start & end point of each path
// - calculate angle of stroke
// - calculate area of stroke bounding box
// - calculate stroke origin?
// - calculate bounding box origin?
function parseKanji(errors, window) {
    var $ = window.$;
    $("path").each(function () {
        //console.log($(this).attr('d'));
        //var result = $(this).attr('d').match(RXPathCommand);
        //console.log(result);

        var result = null;
        while(result = RXPathCommand.exec($(this).attr('d'))) {
            console.log(result[0]);
            console.log('type: ' + result[1]);
        }
    });
}

var curr = 0;
var kanji = [];
for(var i = 0; i < 217; i++) {
    kanji.push([]);
    for(var j = 0; j < 12; j++) {
        var ang = curr % 360;
        if (ang > 160 && ang < 200) {
            kanji[i].push(ang);
        } else {
            kanji[i].push(false);
        }
        curr++;
    }
}
console.log(kanji);

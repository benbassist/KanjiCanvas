'use strict';
var fs = require('fs');
require('dive')('./kanjivg', diveFileHandler);

// parse the file and create a new JSON file
function diveFileHandler(err, file) {
    if(err) { throw err; return; }
    var filename,
        kanji,
        svg,
        strokes;
    svg = fs.readFileSync(file);
    if(!svg) { return; }
    filename = parseFileName(file);
    kanji = parseKanjiChar(svg);
    strokes = getStrokeData(svg);
    fs.writeFileSync(
        './kanjijson/' + filename + '.json',
        '// ' + kanji + ' - ' + filename + '\n' + strokes
    );
}

// given a file path, returns the file name without extension or folder names
function parseFileName(filepath) {
    var RX = /\/([^\/]*?)(?:\.[^\.]*$|$)/;
    var filename = RX.exec(filepath);
    if (filename) { filename = filename[1]; }
    return filename;
}

// parses the kanji character from a kanjivg SVG file
function parseKanjiChar(svg) {
    var RX = /kvg:element="(.+)"/;
    var kanji = RX.exec(svg);
    kanji = kanji != null ? kanji[1] : 'not kanji';
    return kanji;
}

// parses stroke data from kanjivg SVG file
function getStrokeData(svg) {
    var RXPathCommand = /([MmCcLlSsZzHhVvQqTtAa])[\s\d.,-]+/g,
        RXCommandCoord = /-?\d+(\.\d+)?/,
        RXCommandCoordPair = /-?\d+(\.\d+)?(\s*,?)-?\d+(\.\d+)?/;
    var RX = /<path.*\sd="(.*)".*\/>/g;
    var result = '';
    var strokes;
    while (strokes = RX.exec(svg)) {
        result += strokes[1] + '\n';
    }
    return result;
}
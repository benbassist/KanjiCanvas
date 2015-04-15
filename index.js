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
    strokes = JSON.stringify(strokes);
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
    var RXCommand = /([MmCcLlSsZzHhVvQqTtAa])[\s\d.,-]+/g,
        RXCoord = /(-?\d+(?:\.\d+)?)/g,
        RXCoordPair = /(-?\d+(?:\.\d+)?)(\s*,?)(-?\d+(?:\.\d+)?)/g,
        RXPath = /<path.*\sd="(.*)".*\/>/g,
        path = '',
        command = '',
        coord = '',
        kanji = [];

    // in each SVG find all paths
    while (path = RXPath.exec(svg)) {
        var stroke = [];

        // in each path find all commands
        while (command = RXCommand.exec(path[1])) {

            var type = command[1],
                RX = (type=='h' || type=='H' || type=='v' || type=='V') ? RXCoord : RXCoordPair,
                com = {
                    'type': type,
                    'coords': []
                };

            // in each command find all coords
            while (coord = RX.exec(command[0])) {
                if(RX == RXCoord) {
                    com.coords.push(coord[0]);
                } else {
                    com.coords.push({
                        x: coord[1],
                        y: coord[2]
                    })
                }
            }

            stroke.push(com);
        }

        kanji.push(stroke);
    }
    return kanji;
}
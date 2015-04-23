'use strict';
var fs = require('fs');
require('dive')('./kanjivg', diveFileHandler, function(){ console.log(commandTypeStats)});

var commandTypeStats = {};

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
    strokes = getStrokePoints(strokes);
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
        RXCoordPair = /(-?\d+(?:\.\d+)?)(?:\s*,?)(-?\d+(?:\.\d+)?)/g,
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

            if(typeof commandTypeStats[type] == 'undefined') {
                commandTypeStats[type] = 0;
            } else {
                commandTypeStats[type]++;
            }

            // in each command find all coords
            while (coord = RX.exec(command[0])) {
                if(RX == RXCoord) {
                    com.coords.push(coord[0]);
                } else {
                    com.coords.push({
                        x: parseFloat(coord[1]),
                        y: parseFloat(coord[2])
                    })
                }
            }
            stroke.push(com);
        }
        kanji.push(stroke);
    }
    return kanji;
}

// returns an array with start and end coordinates for each stroke in strokes
function getStrokePoints(strokes) {
    var s = [], i, j, k;

    // for each path
    for (i = 0; i < strokes.length; i++) {
        var last = {x:0, y:0}, p = [];

        // for each command
        for(j = 0; j < strokes[i].length; j++) {
            switch(strokes[i][j].type) {
                case 'M':
                case 'm':
                    last = strokes[i][j].coords[0];
                    p.push(last);
                    break;

                case 'C':
                    for(k = 0; k < strokes[i][j].coords.length; k++) {
                        if(k % 3 == 2) {
                            last = strokes[i][j].coords[k];
                            p.push(last);
                        }
                    }
                    break;

                case 'c':

                    // for each coord
                    for(k = 0; k < strokes[i][j].coords.length; k++) {
                        if(k % 3 == 2) {
                            var temp = strokes[i][j].coords[k];
                            last = {x:last.x + temp.x, y: last.y + temp.y};
                            p.push(last);
                        }
                    }
                    break;
            }
        }
        s.push(p);
    }
    return s;
}
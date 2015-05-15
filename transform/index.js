(function () {
    'use strict';
    var fs = require('fs');
    require('dive')('./kanjivg', diveFileHandler, function () {
        console.log(commandTypeStats);
    });

    var commandTypeStats = {};
    var angles = {};


// parse the file and create a new JSON file
    function diveFileHandler(err, file) {
        if (err) {
            throw err;
        }
        var filename;
        var kanji;
        var svg;
        var strokes;
        var strokesString;
        svg = fs.readFileSync(file);
        if (!svg) {
            return;
        }
        filename = parseFileName(file);
        kanji = parseKanjiChar(svg);
        if(kanji && !kanji.match(/kvg/)) {
            strokes = getStrokeData(svg);
            strokes = getStrokePoints(strokes);
            strokes = addAngles(strokes);
            strokesString = JSON.stringify(strokes);
            fs.writeFileSync(
                './kanjijson/' + filename + '.json',
                '// ' + kanji + ' - ' + filename + '\n' + strokesString
            );
            angles[filename] = getAngles(strokes);
            fs.writeFileSync('./kanjijson/000_test.json', JSON.stringify(angles));
        }
    }

// given a file path, returns the file name without extension or folder names
    function parseFileName(filepath) {
        var RX = /\/([^\/]*?)(?:\.[^\.]*$|$)/;
        var filename = RX.exec(filepath);
        if (filename) {
            filename = filename[1];
        }
        return filename;
    }

// parses the kanji character from a kanjivg SVG file
    function parseKanjiChar(svg) {
        var RX = /kvg:element="(.+)"/;
        var kanji = RX.exec(svg);
        if (kanji !== null) { kanji = kanji[1]; }
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
        while ((path = RXPath.exec(svg))) {
            var stroke = [];

            // in each path find all commands
            while ((command = RXCommand.exec(path[1]))) {
                var type = command[1],
                    RX = (type == 'h' || type == 'H' || type == 'v' || type == 'V') ? RXCoord : RXCoordPair,
                    com = {
                        'type': type,
                        'coords': []
                    };

                if (typeof commandTypeStats[type] == 'undefined') {
                    commandTypeStats[type] = 0;
                } else {
                    commandTypeStats[type]++;
                }

                // in each command find all coords
                while ((coord = RX.exec(command[0]))) {
                    if (RX == RXCoord) {
                        com.coords.push(coord[0]);
                    } else {
                        com.coords.push({
                            x: parseFloat(coord[1]),
                            y: parseFloat(coord[2])
                        });
                    }
                }
                stroke.push(com);
            }
            kanji.push(stroke);
        }
        return kanji;
    }

// returns an array with coordinates for each point in strokes
    function getStrokePoints(strokes) {
        var s = [], i, j, k;

        // for each path
        for (i = 0; i < strokes.length; i++) {
            var last = {x: 0, y: 0}, p = [];

            // for each command
            for (j = 0; j < strokes[i].length; j++) {
                switch (strokes[i][j].type) {
                    case 'M':
                    case 'm':
                        last = strokes[i][j].coords[0];
                        p.push(last);
                        break;
                    case 'C':
                        for (k = 0; k < strokes[i][j].coords.length; k++) {
                            if (k % 3 == 2) {
                                last = strokes[i][j].coords[k];
                                p.push(last);
                            }
                        }
                        break;
                    case 'c':
                        // for each coord
                        for (k = 0; k < strokes[i][j].coords.length; k++) {
                            if (k % 3 == 2) {
                                var temp1 = strokes[i][j].coords[k];
                                last = {x: last.x + temp1.x, y: last.y + temp1.y};
                                p.push(last);
                            }
                        }
                        break;
                    case 'S':
                        for (k = 0; k < strokes[i][j].coords.length; k++) {
                            if (k % 2 == 1) {
                                last = strokes[i][j].coords[k];
                                p.push(last);
                            }
                        }
                        break;
                    case 's':
                        // for each coord
                        for (k = 0; k < strokes[i][j].coords.length; k++) {
                            if (k % 2 == 1) {
                                var temp2 = strokes[i][j].coords[k];
                                last = {x: last.x + temp2.x, y: last.y + temp2.y};
                                p.push(last);
                            }
                        }
                        break;
                }
            }
            s.push({points: p});
        }
        return s;
    }

    function getStrokeEndPoints(strokes) {
        var i, j, s = [], curr;
        for (i = 0; i < strokes.length; i++) {
            curr = strokes[i];
            s.push([curr[0], curr[curr.length - 1]]);
        }
        return s;
    }

    // returns an array of ordered stroke angles
    function getAngles(strokes) {
        var i, s = strokes;
        for (i = 0; i < s.length; i++) {
            var p1 = s[i].points[0],
                p2 = s[i].points[s[i].points.length - 1];

            // SVG coordinates are flipped on y-axis so multiply y by -1
            s[i] = Math.atan2(p2.y * (-1) - p1.y * (-1), p2.x - p1.x) * 180 / Math.PI;
        }
        return s;
    }

    // adds angle property to each stroke in strokes
    function addAngles(strokes) {
        var i, s = strokes;
        for (i = 0; i < s.length; i++) {
            var p1 = s[i].points[0],
                p2 = s[i].points[s[i].points.length - 1];

            // SVG coordinates are flipped on y-axis so multiply y by -1
            s[i].angle = Math.atan2(p2.y * (-1) - p1.y * (-1), p2.x - p1.x) * 180 / Math.PI;
        }
        return s;
    }
})();
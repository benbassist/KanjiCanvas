'use strict';

var jsdom = require('jsdom'),
    fs = require('fs'),
    dive = require('dive'),
    jquery = fs.readFileSync('./jquery-1.11.2.min.js', 'utf-8'),
    RXPathTag = /<path[^>]*(d=".*")[^>]*\/>/g,
    RXPathCommand = /([MmCcLlSsZzHhVvQqTtAa])[\s\d.,-]+/g,
    RXCommandCoord = /-?\d+(\.\d+)?/,
    RXCommandCoordPair = /-?\d+(\.\d+)?(\s*,?)-?\d+(\.\d+)?/;

dive('./kanjivg',
    function(err,file) {
        if(err) {
            throw err;
        } else {
            var svgText = fs.readFileSync(file);
            var result = null;
            while (result = RXPathTag.exec(svgText)) {
                //console.log(result[0]);
                //console.log(result[1]);
                fs.appendFileSync('./test.txt', result[1]);
            }
        }
    },
    function() {
        console.log('complete');
    }
);

//jsdom.env({
//    file: file,
//    src: [jquery],
//    done: parseKanji
//});

// TODO:
// - parse start & end point of each path
// - calculate angle of stroke
// - calculate area of stroke bounding box
// - calculate stroke origin?
// - calculate bounding box origin?
//function parseKanji(errors, window) {
    //var $ = window.$;
    //$("path").each(function () {
    //    //console.log($(this).attr('d'));
    //    //var result = $(this).attr('d').match(RXPathCommand);
    //    //console.log(result);
    //
    //    var result = null;
    //    while(result = RXPathCommand.exec($(this).attr('d'))) {
    //        console.log(result[0]);
    //        console.log('type: ' + result[1]);
    //    }
    //});
    //console.log($('svg > g[kvg:element]').attr('kvg:element'));
    //console.log('.');
//}
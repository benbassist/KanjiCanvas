// Print all of the news items on Hacker News
var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("./jquery-1.11.2.min.js", "utf-8");
var RXPathCommand = /([MmCcLlSsZzHhVvQqTtAa])[\s\d.,-]+/g;
var RXCommandCoord = /-?\d+(\.\d+)?/;
var RXCommandCoordPair = /-?\d+(\.\d+)?(\s*,?)-?\d+(\.\d+)?/;

jsdom.env({
    //url: "http://news.ycombinator.com/",
    file: './kanjivg/0f9a8.svg',
    src: [jquery],
    done: function (errors, window) {
        var $ = window.$;
        $("path").each(function () {
            //console.log($(this).attr('d'));
            //var result = $(this).attr('d').match(RXPathCommand);
            //console.log(result);

            result=null;
            while(result = RXPathCommand.exec($(this).attr('d'))) {
                console.log(result[0]);
                console.log('type: ' + result[1]);
            }
        });
    }
});
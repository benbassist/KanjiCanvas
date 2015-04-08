// Print all of the news items on Hacker News
var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("./jquery-1.11.2.min.js", "utf-8");

jsdom.env({
    //url: "http://news.ycombinator.com/",
    file: './kanji/0f9a8.svg',
    src: [jquery],
    done: function (errors, window) {
        var $ = window.$;
        $("path").each(function () {
            console.log($(this).attr('d'));
        });
    }
});
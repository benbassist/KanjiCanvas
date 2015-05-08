// set fixtures
var path = '';
jasmine.getFixtures().fixturesPath = 'base/script/test/fixtures';

// programatically dispatch mouse events
function dispatchMouseEvent(el, type, x, y) {
    if(typeof MouseEvent == 'function') {
        var e = new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            screenX: x,
            screenY: y,
            clientX: x,
            clientY: y
        });
        el.dispatchEvent(e);

    } else {
        var e2 = document.createEvent("MouseEvents");
        e2.initMouseEvent(type, true, true, window, 0, x, y, x, y, false, false, false, false, 0, null);
        el.dispatchEvent(e2);
    }
}

// polyfill bind for PhantomJS
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(
                    this instanceof fNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

//beforeEach(function () {
//  jasmine.addMatchers({
//    toBePlaying: function () {
//      return {
//        compare: function (actual, expected) {
//          var player = actual;
//
//          return {
//            pass: player.currentlyPlayingSong === expected && player.isPlaying
//          }
//        }
//      };
//    }
//  });
//});
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
jasmine.getFixtures().fixturesPath = 'spec/fixtures';

function dispatchMouseEvent(el, type, x, y) {
    var e = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window,
        screenX: x,
        screenY: y,
        clientX: x,
        clientY:y
    });

    el.dispatchEvent(e);
}
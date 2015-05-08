(function(){
    'use strict';
    describe('Drawing Canvas', function() {
        var can;
        beforeEach(function() {
            loadFixtures('DrawingCanvasFixture.html');
            can = new DrawingCanvas(document.querySelector('.canvas'));
        });
        it('should store a reference to its canvas element', function(){
            expect(can.c).toExist();
        });
        it('should store a reference to its canvas context', function(){
            expect(can.ctx).toExist();
        });
        it('should allow you to register a drawStart callback', function(){
            var cb = function() { return 'foo' };
            can.onDrawStart(cb);
            expect(can.drawStartCallback).toEqual(cb);
        });
        it('should allow you to register a draw callback', function(){
            var cb = function() { return 'foo' };
            can.onDraw(cb);
            expect(can.drawCallback).toEqual(cb);
        });
        it('should allow you to register a drawEnd callback', function(){
            var cb = function() { return 'foo' };
            can.onDrawEnd(cb);
            expect(can.drawEndCallback).toEqual(cb);
        });
        it('should call the drawStartCallback, passing the mousedown coordinates', function(done){
           var xy,
               cb = function (x, y) {
                   xy = {'x': x, 'y': y};
               };
            can.onDrawStart(cb);
            can.drawStart({offsetX:10, offsetY:22, target: { getBoundingClientRect: function(){}}});
            expect(xy).toEqual({'x': 10, 'y': 22});
            done();
        });
        it('should call the drawCallback, passing the mousemove coordinates', function(done){
            var xy,
                cb = function (x, y) {
                    xy = {'x': x, 'y': y};
                };
            can.onDraw(cb);
            can.draw({offsetX:11, offsetY:23, target: { getBoundingClientRect: function(){}}});
            expect(xy).toEqual({'x': 11, 'y': 23});
            done();
        });
        it('should call the drawEndCallback', function(){
            var cb = { foo: function () { return 0; }},
                mouse = document.createEvent('MouseEvents');
            spyOn(cb, 'foo');
            can.onDrawEnd(cb.foo);
            //mouse.initEvent('mousedown', true, true);
            //can.c.dispatchEvent(mouse);
            //mouse.initEvent('mouseup', true, true);
            //can.c.dispatchEvent(mouse);
            var rect = can.c.getBoundingClientRect();
            var canvasLeft = rect.left - window.scrollX;
            var canvasTop = rect.top - window.scrollY;
            dispatchMouseEvent(can.c, 'mousedown', canvasLeft, canvasTop);
            dispatchMouseEvent(can.c, 'mouseup', canvasLeft + 10, canvasTop + 10);
            expect(cb.foo).toHaveBeenCalled();
        });
    });
})();

(function(){
    describe('KanjiCanvas', function(){
        var kc, canvasEl, canvasTop, canvasLeft;

        beforeEach(function(){
            loadFixtures('KanjiCanvasFixture.html');
            kc = new KanjiCanvas(document.getElementById('KanjiCanvas'));
            canvasEl = kc.kc.querySelector('canvas');
            var rect = canvasEl.getBoundingClientRect();
            canvasLeft = rect.left - window.scrollX;
            canvasTop = rect.top - window.scrollY;
        });

        it('should have a DrawingCanvas', function(){
            expect(kc.canvas).toEqual(jasmine.any(DrawingCanvas));
        });
        it('should have a Clear button', function(){
            expect(kc.clearBtn).toEqual(kc.kc.querySelector('.clear'))
        });
        it('should have a Submit button', function(){
            expect(kc.submitBtn).toEqual(kc.kc.querySelector('.submit'))
        });
        it('should have a StrokeList', function(){
            expect(kc.strokeList).toEqual(jasmine.any(StrokeList));
        });

        describe('event handling', function(){
            beforeEach(function(){
                dispatchMouseEvent(canvasEl, 'mousedown', canvasLeft, canvasTop);
                dispatchMouseEvent(canvasEl, 'mousemove', canvasLeft + 10, canvasTop + 10);
                dispatchMouseEvent(canvasEl, 'mouseup', canvasLeft + 10, canvasTop + 10);
            });

            it('should add a stroke to StrokeList when a stroke is drawn', function(){
                expect(kc.strokeList.strokes.length).toEqual(1);
            });
            it('should clear its strokeList when Clear is clicked', function(){
                expect(kc.strokeList.strokes.length).toEqual(1);
                dispatchMouseEvent(kc.clearBtn, 'click', 0, 0);
                expect(kc.strokeList.strokes.length).toEqual(0);
            });
            it('should fire a callback on submit, passing the current strokeList', function(){
                var r;
                var foo = {
                    bar: function(data){
                        r = data;
                    }
                }
                spyOn(foo, 'bar').and.callThrough();
                kc.onSubmit(foo.bar);
                kc.submitBtn.addEventListener('click', function(){ console.log('hello');});
                console.log(kc.submitBtn);
                dispatchMouseEvent(kc.submitBtn, 'click', 0, 0);
                expect(foo.bar).toHaveBeenCalled();
                expect(r).toEqual(jasmine.any(StrokeList));
            });
        });
    });
})();
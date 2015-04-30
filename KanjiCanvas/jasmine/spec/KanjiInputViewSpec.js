(function(){
	'use strict';

	describe('KanjiSearchView', function() {
		var view;

		beforeEach(function(){
			loadFixtures('KanjiInputView.html');
			view = new KanjiInputView({selector:'#kanjiInput'});
		});

		it('should expose a property with its DOM element', function() {
			expect(view.$element).toExist();
		});
		
		it('should allow input of a stroke', function(){

		});

		it('should maintain an ordered list of strokes that have been input', function(){

		});
	});
})();
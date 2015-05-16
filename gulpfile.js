var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('karma').server;

var testScript = ['./script/test/**/*.js'];
var srcScript = ['./script/*.js'];
var transformScript = ['./transform/*.js'];
var scriptExclude = [
	'!./script/lib/**/*',
	'!**/node_modules/**/*'
];
//var scripts = scriptInclude.concat(scriptExclude);

gulp.task('default', function() {
	// place code for your default task here
});

gulp.task('test', ['lint'], function(done) {
	karma.start({
		configFile: __dirname + '/karma.conf.js'
	}, done);
});

gulp.task('lint', ['clear'], function() {
	return gulp.src(testScript.concat(srcScript).concat(transformScript))
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('lint:watch', function(){
	gulp.watch(testScript.concat(srcScript).concat(transformScript), ['lint']);
});

gulp.task('clear', function(){
	console.log('\033[2J\033[0f');
});
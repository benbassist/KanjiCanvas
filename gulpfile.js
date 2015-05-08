var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('karma').server;

var scriptInclude = ['./script/**/*.js'];
var scriptExclude = [
	'!./script/lib/**/*',
	'!**/node_modules/**/*'
];
var scripts = scriptInclude.concat(scriptExclude);

gulp.task('default', function() {
	// place code for your default task here
});

gulp.task('test', ['lint'], function(done) {
	karma.start({
		configFile: __dirname + '/karma.conf.js'
	}, done);
});

gulp.task('lint', function() {
	return gulp.src(scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
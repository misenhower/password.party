var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');

gulp.task('default', ['styles', 'fonts', 'scripts']);

gulp.task('styles', function() {
	var sassOptions = {
		outputStyle: 'compressed',
		includePaths: [
			__dirname + '/node_modules/bootstrap-sass/assets/stylesheets/',
			__dirname + '/node_modules/bootswatch/'
		]
	};

	return gulp.src('sass/**/*.scss')
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('fonts', function() {
	return gulp.src('node_modules/bootstrap-sass/assets/fonts/**/*')
		.pipe(gulp.dest('./public/fonts/'));
});

gulp.task('scripts', function() {
	return gulp.src(['scripts/main.js'])
		.pipe(webpack({output: {filename: 'main.js'}}))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', ['styles', 'fonts', 'scripts'], function() {
	return gulp.watch(['sass/**/*.scss', 'scripts/main.js'], ['styles', 'fonts', 'scripts']);
});

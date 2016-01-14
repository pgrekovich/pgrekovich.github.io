var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync').create(),
	postcss = require('gulp-postcss'),
	nano = require('gulp-cssnano'),
	htmlmin = require('gulp-htmlmin'),

	processors = [
		require("postcss-cssnext"),
		require('postcss-mixins'),
		require('postcss-simple-vars'),
		require('postcss-nested'),
		require('autoprefixer')({ browsers: ['last 5 versions', '> 2%'] }),
		require('postcss-flexbugs-fixes')
	];

gulp.task('default', ['server', 'build']);

var params = {
	devFolder: 'dev',
	out: 'app',
	htmlSrc: 'dev/*.html',
	stylesSrc: 'dev/*.css',
	scriptsSrc: 'dev/*.js'
};

gulp.task ('server', function() {
	browserSync.init ({
			server: params.out
		});

	gulp.watch(params.htmlSrc, ['html']);
	gulp.watch(params.stylesSrc, ['css']);
	gulp.watch(params.scriptsSrc, ['scripts']);
});


gulp.task('build', ['html', 'css', 'scripts']);

gulp.task('html', function() {
	gulp.src(params.htmlSrc)
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest(params.out))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('css', function() {
	gulp.src(params.stylesSrc)
	.pipe(concat('styles.css'))
	.pipe(sourcemaps.write())
	.pipe(postcss(processors))
	.pipe(nano())
	.pipe(gulp.dest(params.out))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function() {
	gulp.src(params.scriptsSrc)
	.pipe(concat('main.js'))
	.pipe(gulp.dest(params.out))
	.pipe(browserSync.reload({stream:true}));
});

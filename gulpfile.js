var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var imagemin = require("gulp-imagemin");
var run = require("run-sequence");
var del = require("del");

gulp.task('js', function() {
	return gulp.src('js/**/*.js')
		.pipe(gulp.dest("build/js/**"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
	return gulp.src('*.html')
		.pipe(gulp.dest("build"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
	return gulp.src('sass/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({browsers: [
				'last 2 versions',
				'ie 10',
				'Android >= 4.1',
				'Safari >= 8',
				'iOS >= 8'
			]}),
          	mqpacker({
				sort: true 
			})
		]))
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.reload({stream: true}))
    	.pipe(minify())
    	.pipe(rename("style.min.css"))
    	.pipe(gulp.dest("build/css"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("serve", function() {

	browserSync.init({
		server: "build"
	});


	gulp.watch("sass/**/*.scss", ["sass"]);
	gulp.watch("*.html", ["html"]);
	gulp.watch("js/**/*.js", ["js"]);

});

// gulp.task('serve', function () {

//     // Serve files from the root of this project
//     browserSync.init({
//         server: {
//             baseDir: "build"
//         }
//     });

//     gulp.watch("*.html").on("change", browserSync.reload);
// });

gulp.task("symbols", function() {
  return gulp.src("build/img/icons/*.svg") .pipe(svgmin())
	.pipe(svgstore({
		inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
	.pipe(gulp.dest("build/img")); 
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
	]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function() {
	return gulp.src([
		"fonts/**/*.{woff,woff2}",
		"img/**",
		"js/**",
		"*.html"
	], {
		base: "."
	})
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
	return del("build");
});

gulp.task("build", function(fn) {
  	run(
  		"clean",
    	"copy",
    	"sass",
		"images",
		fn
	); 
});


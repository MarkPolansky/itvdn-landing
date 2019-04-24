var gulp 		 		 = require('gulp'),
		sass 		 		 = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		rename 			 = require('gulp-rename'),
		cleanCSS 		 = require('gulp-clean-css'),
		concat 			 = require('gulp-concat'),
		notify 			 = require('gulp-notify'),
		browserSync  = require('browser-sync').create(),
		imagemin 		 = require('gulp-imagemin'),
		del					 = require('del');

function styles() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(concat('main.css'))
		.pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer({
				browsers: ['> 0.1%'],
				cascade: false
	    }))
		.pipe(cleanCSS({
				level: 2
			}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
}

function images() {
	return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
}

function copyFonts() {
	return gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts'));
}

function watch() {
  browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
  });
	gulp.watch('src/scss/**/*.scss', styles);
	gulp.watch('./*.html').on('change', browserSync.reload);
}

function clean() {
	return del(['dist/*']);
}

gulp.task('styles', styles);
gulp.task('images', images);
gulp.task ('copyFonts', copyFonts);
gulp.task('watch', watch);
gulp.task('clean', clean);
gulp.task('build', gulp.series(clean,
									 gulp.parallel(styles, images, copyFonts)
								));
gulp.task('default', gulp.series('build', 'watch'));
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

gulp.task('sass-compile-concat-sourcemaps-and-bundle', function () {
    gulp.src([
        './build/materialize-css/materialize.scss',
        './build/materialize-css/materialize-overrides.scss',
        './build/site/site.scss',
        './build/font-awesome/font-awesome.scss'])
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('site.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass-watch', function () {
    //gulp.watch('./build/sass/_materialize-variables.scss', ['sass-compile-concat-sourcemaps-and-bundle']);
    //gulp.watch('./build/sass/_font-awesome-variables.scss', ['sass-compile-concat-sourcemaps-and-bundle']);
    gulp.watch('./build/materialize-css/materialize.scss', ['sass-compile-concat-sourcemaps-and-bundle']);
    gulp.watch('./build/materialize-css/materialize-overrides.scss', ['sass-compile-concat-sourcemaps-and-bundle']);
    gulp.watch('./build/sass/site.scss', ['sass-compile-concat-sourcemaps-and-bundle']);
});

gulp.task('copy-assets', function () {
    return [
        gulp.src('./node_modules/mithril/mithril.min.js').pipe(gulp.dest('./public/js/vendor')),
        gulp.src('./node_modules/materialize-css/dist/js/materialize.min.js').pipe(gulp.dest('./public/js/vendor')),
        gulp.src('./node_modules/materialize-css/font/roboto/**/*').pipe(gulp.dest('./public/fonts/roboto')),
        gulp.src('./node_modules/materialize-css/font/material-design-icons/**/*').pipe(gulp.dest('./public/fonts/material-design-icons')),
        gulp.src('./node_modules/font-awesome/fonts/**/*').pipe(gulp.dest('./public/fonts/font-awesome'))
    ];
});

gulp.task('default', [
    'sass-compile-concat-sourcemaps-and-bundle',
    'sass-watch',
    'copy-assets']);
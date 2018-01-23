var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var less = require('gulp-less');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('build-less', function(){
  gulp.src(['src/less/uk-colors.less', 'src/less/uk-colors.defaults.less'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(less())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['build-less']);

gulp.task('watch', ['browser-sync'], function(){
  gulp.watch("src/less/**/*.less", ['build-less']);
  gulp.watch("*.html", ['bs-reload']);
});
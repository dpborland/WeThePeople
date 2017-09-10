'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

var sassFiles = 'sites/repContact/repContactResources/repContactSCSS.scss';
var cssDest = 'sites/repContact/repContactResources/repContactCSS.css';

gulp.task('sass', function() {
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

gulp.task('watch', function() {
    gulp.watch(sassFiles, ['sass']);
})
/*
    Much thanks to Dan Tello for help with this:
    https://www.viget.com/articles/gulp-browserify-starter-faq
*/

var gulp = require('gulp');

// add in browserify module to bundle the JS
// We can use this directly instead of 'gulp-browserify' with help 
// from 'vinyl-source-stream'
var browserify = require('browserify');

// Add in vinyl-source-stream to help link browserify and gulp streams
var source = require('vinyl-source-stream');

gulp.task('browserify', () => {

    return browserify('./js/main.js') // source to compile
        .bundle()   // compile it...
        .pipe(source('popup.js'))  // pipe to output file
        .pipe(gulp.dest('./js/'));  // put output back into ./js/
});
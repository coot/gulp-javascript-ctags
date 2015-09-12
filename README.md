# [gulp](https://github.com/gulpjs/gulp)-javascript-ctags

Gulp plugin for [javascript-ctags](https://github.com/andersjanmyr/javascript-ctags).

## Instalation

Run `npm install --save-dev gulp-javascript-ctags`.

## Usage


```
var tags = require('gulp-javascript-ctags');

gulp.task('tags', function() {
  return gulp.src('src/**/*.js')
    .pipe(tags('tags'))  // filename of the output tags file
    .pipe(gulp.dest('./'));  // destination folder
});

gulp.task('watch-tags', ['tags'], function() {
  return gulp.watch('src/**/*.js', ['tags']);
}); 
```

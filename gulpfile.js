const gulp    = require("gulp");
const sass    = require("gulp-sass");
const uglify  = require('gulp-uglify');
const concat  = require('gulp-concat');


/*
  generate the css with sass
*/
gulp.task('css', function() {
  return gulp.src('./src/_assets/stylesheets/app.scss')
    .pipe(sass({
      // outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./src/static/css'));
});

/*
  Watch folders for changess
*/
gulp.task("watch", function() {
  gulp.watch('./src/_assets/**/*.scss', gulp.parallel('css'));
});


/*
  Let's build this sucker.
*/
gulp.task('build', gulp.parallel(
  'css'
));
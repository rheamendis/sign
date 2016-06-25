var gulp = require('gulp');

var sass = require('gulp-sass');

var mini = require('gulp-uglify');

gulp.task('sass',function(){
   return gulp.src('app/scss/*.scss')
       .pipe(sass())
       .pipe(gulp.dest('app/css'))
});

gulp.task('watch',function(){
 
    gulp.watch('app/**/*',['sass']);
})
;

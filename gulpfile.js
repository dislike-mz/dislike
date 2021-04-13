const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('buildSass', (done) => {
        gulp.src('./sass/*.scss').pipe(sass({outputStyle:'expanded'}).on('error',sass.logError)).pipe(gulp.dest('./css'))

        done()
    })

gulp.task('default',()=>{


    gulp.watch('./sass/*.scss',gulp.series('buildSass'))
})
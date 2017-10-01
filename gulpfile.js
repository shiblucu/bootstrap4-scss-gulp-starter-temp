var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// gulp sass compiling
gulp.task('sass', function(){
    return gulp.src('./sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./css'))
            .pipe(browserSync.reload({
                stream: true
            }));
});

// error function
function logError(error){
    console.error.bind(error);
    this.emit('end');
}

// gulp watch task
gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('sass/*.scss', ['sass']);

    // reload browser on HTML, CSS and JavaScript file changes
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./*.css', browserSync.reload);
    gulp.watch('./*.js', browserSync.reload);
});

// browser auto load
gulp.task('browserSync', function(){
    browserSync.init({
        server:{
            baseDir:'./'
        },
        proxy:''
    })
});
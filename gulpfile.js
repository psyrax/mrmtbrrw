const gulp        	= require('gulp');
const browserSync 	= require('browser-sync').create();
const sass        	= require('gulp-sass');
const imagemin 		= require('gulp-imagemin');
const clean 		= require('gulp-clean');
const gulpCopy 		= require('gulp-copy');

const filesPath = __dirname + '/publicWeb/';
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: filesPath + "src"
    });

    gulp.watch(filesPath + "src/scss/*.scss", ['sass']);
    gulp.watch(filesPath + "src/*.html").on('change', browserSync.reload);
    gulp.watch(filesPath + "img/*.*").on('change', browserSync.reload);
    gulp.watch(filesPath + "js/*.*").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(filesPath + "src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest(filesPath + "src/css"))
        .pipe(browserSync.stream());
});


gulp.task('clean', function () {
    return gulp.src(filesPath + "dist/**", {read: false})
        .pipe(clean());
});

gulp.task('copy',  ['clean'], function(){
	return gulp.src([filesPath + "src/*.html", filesPath + "src/js/*.js"])
    	.pipe(gulpCopy(filesPath + "dist/",{prefix:2}))
});

gulp.task('releaseSass',  ['clean'], function(){
	return gulp.src(filesPath + "src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest(filesPath + "dist/css"));
});

gulp.task('imageMin', ['clean'], function (){
    return gulp.src( filesPath + "src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest(filesPath + "dist/img"))	
});

gulp.task('distro', ['copy', 'imageMin', 'releaseSass']);

gulp.task('default', ['serve']);

gulp.task('release', ['clean','distro']);
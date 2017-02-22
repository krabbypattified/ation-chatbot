/* Requires
===================*/
var gulp         = require('gulp'),
    stylus       = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    kit          = require('gulp-kit'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;



/* Styles
===================*/
gulp.task('styles', function () {
gulp.src('assets/styl/main.styl')
    .pipe(plumber(plumberOptions))
    .pipe(stylus())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('assets/css'))
    .pipe(reload({stream:true}));
});

/* Kit
===================*/
gulp.task('kit', function () {
gulp.src('pages/**/*.kit')
    .pipe(plumber(plumberOptions))
    .pipe(kit())
    .pipe(gulp.dest('build'))
    .pipe(reload({stream:true}));
});

/* Scripts
===================*/
gulp.task('scripts', function () {
gulp.src('assets/js/**/*.js')
    .pipe(gulp.dest('build'))
    .pipe(reload({stream:true}));
});



/* Browser Sync
===================*/
gulp.task('browser-sync', function () {
  browserSync(browserSyncOptions)
});

/* Watch
===================*/
gulp.task('watch', function () {
  gulp.watch(['pages/**/*.styl', 'components/**/*.styl', 'assets/styl/**/*.styl'], ['styles']);
  gulp.watch(['pages/**/*.kit', 'components/**/*.kit'], ['kit']);
  gulp.watch('assets/js/**/*.js', ['scripts']);
});

/* Options
===================*/
var plumberOptions = {
  errorHandler: notify.onError({
    title: 'Kit, Stylus, or Materialize Error',
    message: '<%= error.message %>'
  })
};

var sassOptions = {
  outputStyle: 'compressed'
};

var autoprefixerOptions = {
  browsers: ['> 5% in US']
};

var browserSyncOptions = {
  server:{
    baseDir: './',
    routes: {
      "/": "build"
    }
  }
}

/* Default
===================*/
gulp.task('default', ['styles', 'kit', 'browser-sync', 'watch']);

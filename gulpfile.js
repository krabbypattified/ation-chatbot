/* Requires
===================*/
var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    order        = require('gulp-order'),
    uglify       = require('gulp-uglify'),
    babel        = require('gulp-babel'),
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
  return gulp.src('assets/styl/main.styl')
  .pipe(plumber(plumberOptions))
  .pipe(stylus())
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(gulp.dest('assets/css'))
  .pipe(reload({stream:true}));
});

/* Kit
===================*/
gulp.task('kit', function () {
  return gulp.src('pages/**/*.kit')
  .pipe(plumber(plumberOptions))
  .pipe(kit())
  .pipe(gulp.dest('build'))
  .pipe(reload({stream:true}));
});

/* Scripts
===================*/
gulp.task('scripts', function () {
  return gulp.src('assets/**/*.js')
  .pipe(order([
    'assets/js/chat.js',
    'assets/js/chatConfig.js',
    'assets/**/*.js'
  ]))
  .pipe(concat('bundle.js'))
  .pipe(babel({presets: ['es2015']}))
  .pipe(uglify())
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
  gulp.watch('assets/**/*.json', ['scripts']);
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
gulp.task('default', ['styles', 'kit', 'scripts', 'browser-sync', 'watch']);

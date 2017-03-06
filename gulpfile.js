/* Requires
===================*/
const gulp         = require('gulp'),
      webpack      = require('webpack');
      gulpWebpack  = require('gulp-webpack'),
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
  return gulp.src('src/styl/main.styl')
  .pipe(plumber(plumberOptions))
  .pipe(stylus())
  .pipe(autoprefixer({browsers: ['> 5% in US']}))
  .pipe(gulp.dest('dist'))
  .pipe(reload({stream:true}));
});


/* Kit
===================*/
gulp.task('kit', function () {
  return gulp.src('src/kit/index.kit')
  .pipe(plumber(plumberOptions))
  .pipe(kit())
  .pipe(gulp.dest('dist'))
  .pipe(reload({stream:true}));
});


/* Scripts
===================*/
gulp.task('scripts', function () {
  return gulp.src('src/js/index.js')
  .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
  .pipe(gulp.dest('dist'))
  .pipe(reload({stream:true}));
});
/*=================*/
gulp.task('scripts-uglify', function () {
  return gulp.src('src/js/index.js')
  .pipe(gulpWebpack(require('./webpack.config.dist.js'), webpack))
  .pipe(gulp.dest('dist'));
});


/* Images
===================*/
gulp.task('images', function () {
  return gulp.src('src/img/*')
  .pipe(gulp.dest('dist/img'))
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
  gulp.watch(['**/*.styl'], ['styles']);
  gulp.watch(['**/*.kit'], ['kit']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/img/*', ['images']);
});


/* Options
===================*/
const plumberOptions = {
  errorHandler: notify.onError({
    title: 'Kit, Stylus, or Materialize Error',
    message: '<%= error.message %>'
  })
};
const browserSyncOptions = {
  server:{
    baseDir: './',
    routes: { "/": "dist" }
  }
}


/* Default
===================*/
gulp.task('default', ['styles', 'kit', 'scripts', 'images', 'browser-sync', 'watch']);
gulp.task('build', ['styles', 'kit', 'scripts-uglify', 'images']);

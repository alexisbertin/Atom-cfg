/*global -$ */
'use strict';
import gulp        from 'gulp';
import watch       from 'gulp-watch';
import shell       from 'gulp-shell';
import sass        from 'gulp-sass';
import imagemin    from 'gulp-imagemin';

import minify      from 'gulp-babel-minify';
import concat      from 'gulp-concat';
import babel       from 'gulp-babel';

import browserSync from 'browser-sync';
import svgmin      from 'gulp-svgmin';
import sourcemaps  from 'gulp-sourcemaps';
import notify      from 'gulp-notify';

const reload = browserSync.reload;


var paths = {
  src: './public/src/',
  dest: './public/dest/',
  'styles': {
    src: './public/src/scss/main.scss',
    dest: './public/dest/styles/'
  },
  'scripts': {
    src: './public/src/scripts/',
    dest: './public/dest/scripts/'
  },
};



//gulp.task('sass', function(){
//  gulp.src(paths.style.all)
//    .pipe(sass().on('error', sass.logError))
//    .pipe(gulp.dest(paths.style.output));
//});

gulp.task('styles', () => (
  gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.reload({stream:true}))
));


gulp.task('scripts', () => (
  gulp.src([paths.scripts.src + '__vendor/*.js', paths.scripts.src + 'js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['env']}))
    .pipe(concat('scripts.min.js'))
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
));


gulp.task('images', () => (
  gulp.src(paths.src + 'images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(paths.dest + 'images'))
));


gulp.task('svg', () => (
  gulp.src(paths.src + 'svg/**/*')
    .pipe(svgmin())
    .pipe(gulp.dest(paths.dest + 'svg'))
));


gulp.task('fonts', () => (
  gulp.src(paths.src + 'fonts/**/*')
    .pipe(gulp.dest(paths.dest + 'fonts'))
));






gulp.task('browser-sync', function(){
  //watch files
  var files = [
    paths.dest + 'styles/**/*.css',
    paths.dest + 'scripts/**/*.js',
    paths.dest + 'images/**/*',
  ];
  return browserSync.init(files, {
    proxy: "http://localhost:3000", //change this to whatever your local development URL is.
    open: false,
    injectChanges: true
  });
});
gulp.task('watch',  ['images', 'svg', 'fonts', 'styles', 'scripts', 'browser-sync'],function () {
  gulp.watch(paths.src + 'images/**/*', ['images']);
  gulp.watch(paths.src + 'svg/**/*', ['svg']);
  gulp.watch(paths.src + 'fonts/*', ['fonts']);
  gulp.watch(paths.src + 'scss/**/*.scss', ['styles']);
  gulp.watch(paths.src + 'scripts/**/*', ['scripts']);
});
gulp.task('cleanFonts', require('del').bind(null, [paths.dest + 'fonts']));
gulp.task('clean', require('del').bind(null, ['.tmp', 'build']));


// gulp.task('runKeystone', shell.task('node keystone.js'));


gulp.task('build', ['images', 'svg', 'fonts', 'styles', 'scripts'], function () {
  return gulp.src(paths.dest)
    .pipe(notify({
      title: 'Build',
      message: 'Build passed. Let it fly!',
    }))
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
  gulp.start('watch');
});

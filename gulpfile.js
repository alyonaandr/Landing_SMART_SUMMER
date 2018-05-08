const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require("gulp-notify");
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const pug = require("gulp-pug");
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const browserSync = require("browser-sync");
const reload = browserSync.reload;

//Task for SCSS
gulp.task('scss', () => {
  gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })
    .on('error', function (err) {
      return notify().write(err);
    }))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({ stream: true }));
});

// Task for Pages (pug)
gulp.task('pages', () => {
  gulp.src('./src/pages/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./public'))
    .pipe(reload({ stream: true }));
});

// task for Fonts
gulp.task('fonts', function() {
  gulp.src('./src/fonts/**/*.*')
      .pipe(newer('./public/fonts/'))
      .pipe(gulp.dest('./public/fonts'))
      .pipe(reload({ stream: true }));
});

// Task for Images
gulp.task('images', () => {
  gulp.src('./src/img/**/*.*')
    .pipe(newer('./public/img/'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest('./public/img/'))
    .pipe(reload({ stream: true }));
});

// Task for JS
gulp.task('js', () => {
  gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './src/blocks/**/*.js',
    './src/js/main.js'
  ])
    .pipe(concat('main.js'))
    .pipe(minify({
      ext: {
        min: '.js'
      },
      compress: true,
      noSource: true,
    }))
    .pipe(gulp.dest('./public/js'))
    .pipe(reload({ stream: true }));
});


// Task for PHP
gulp.task('php', () => {
  gulp.src('./src/**/*.php')
    .pipe(newer('./public/'))
    .pipe(gulp.dest('./public/'))
    .pipe(reload({ stream: true }));
});

// Task for file .htaccess
gulp.task('htaccess', () => {
  gulp.src('./src/.htaccess')
    .pipe(newer('./public/'))
    .pipe(gulp.dest('./public/'))
});

// Task Public
gulp.task('public', ['pages', 'scss', 'js', 'fonts', 'images', 'php', 'htaccess']);

// Task Watch
gulp.task('watch', () => {
  watch('./src/**/*.pug', () => gulp.run('pages'));
  watch('./src/**/*.scss', () => gulp.run('scss'));
  watch('./src/**/*.js', () => gulp.run('js'));
  watch('./src/fonts/**/*.*', () => gulp.run('fonts'));
  watch('./src/img/**/*.*', () => gulp.run('images'));
});


// Task for webserver
const config = {
  server: {
    baseDir: "./public"
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: "alyona-server"
};

gulp.task('webserver', () => browserSync(config));

// //Task Clean
// gulp.task('clean', () => {
//   gulp.src('public', { read: false })
//     .pipe(clean());
// });

// Default task
gulp.task('default', ['public', 'webserver', 'watch']);
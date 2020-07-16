const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gulpStylelint = require('gulp-stylelint');
const rename = require('gulp-rename');
const gcmq = require('gulp-group-css-media-queries');

module.exports = function styles() {
  return gulp
    .src('src/styles/*.scss')
    .pipe(plumber())
    .pipe(
      gulpStylelint({
        failAfterError: false,
        reporters: [
          {
            formatter: 'string',
            console: true,
          },
        ],
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: true,
      }),
    )
    .pipe(gcmq())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css'));
};

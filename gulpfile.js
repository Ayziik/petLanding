const gulp = require('gulp');

const serve = require('./gulp/serve');
const pug2html = require('./gulp/pug2html');
const stylesProd = require('./gulp/stylesProd');
const stylesDev = require('./gulp/stylesDev');
const script = require('./gulp/script');
const fonts = require('./gulp/fonts');
const imageMinify = require('./gulp/imageMinify');
const clean = require('./gulp/clean');
const svgSprite = require('./gulp/svgSprite');

function setMode(isProduction = false) {
  return (cb) => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development';
    cb();
  };
}

const dev = gulp.series(
  clean,
  gulp.parallel(pug2html, stylesDev, script, fonts, imageMinify, svgSprite),
);

const build = gulp.series(
  clean,
  gulp.parallel(pug2html, stylesProd, script, fonts, imageMinify, svgSprite),
);

module.exports.start = gulp.series(setMode(true), dev, serve);
module.exports.dev = gulp.series(setMode(true), dev);
module.exports.build = gulp.series(setMode(true), build);

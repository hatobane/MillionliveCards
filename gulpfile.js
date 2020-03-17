/*
  modules
*/

const {src, dest, watch, series, parallel} = require('gulp')
const stylus = require('gulp-stylus')
//const nib = require('nib')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const cleanCSS = require('gulp-clean-css')
const yaml = require('gulp-yaml')

/*
  css
*/

const css = (cb) => {
  return src([
    './src/assets/styl/**/*.styl',
    '!./src/assets/styl/**/_*.styl'
  ])
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(stylus({
    compress: false,
    linenos: false
  }))
  .pipe(autoprefixer({
    cascade: false
  }))
  //.pipe(cleanCSS())
  .pipe(dest('./src/assets/css/'))
}

/*
  yaml to json
*/
const yamlToJson = (cb) => {
  return src([
    './src/assets/data/*.yaml',
  ])
  .pipe(yaml({
    space: 2
  }))
  .pipe(dest('./src/assets/data/'))
}

/*
  exports
*/
exports.default = () => {
  watch('./src/assets/styl/**/*.styl', css)
}

exports.yaml = yamlToJson
var js = require('atomify-js')
  , css = require('atomify-css')
  , server = require('./lib/server')

module.exports = atomify

function atomify (opts, cb) {
  if (opts.css) css(opts.css, callback(cb, 'css'))
  if (opts.js) js(opts.js, callback(cb, 'js'))
}

atomify.js = js
atomify.css = css
atomify.server = server

function callback (cb, type) {
  return function (err, src) {
    cb(err, src, type)
  }
}

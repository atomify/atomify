var js  = require('atomify-js')
  , css = require('atomify-css')

function error (e, resp) {

  // Jaws-like router support
  if (typeof resp.error == 'function') return resp.error(e)

  resp.writeHead(500, {'Content-Type': 'text/plain'})
  resp.end(e.message)

}

function respond (type, resp) {
  return function (e, src) {
    if (e) return error(e, resp)
    resp.setHeader('content-type', 'text/'+type)
    resp.end(src)
  }
}

module.exports = function (opts) {

  return {
    css: function (req, resp) {
      css(opts.css, respond('css', resp));
    }

  , js: function (req, resp) {
      js(opts.js, respond('javascript', resp));
    }

  }

}

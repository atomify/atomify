var browserify = require('browserify')
  , hbsfy      = require('hbsfy')
  , brfs       = require('brfs')
  , npmcss     = require('npm-css')
  , rework     = require('rework')
  , variables  = require('rework-vars')
  , path       = require('path')

function error (resp, e) {

  // Jaws-like router support
  if (typeof resp.error == 'function') return resp.error(e)

  resp.writeHead(500, {'Content-Type': 'text/plain'})
  resp.end(e.message)

}

module.exports = function (opts) {

  return {
    css: function (req, resp) {
      var file = npmcss(path.join(process.cwd(), opts.css.entry))
      var css = rework(file)
      css.use(variables(opts.css.variables))
      resp.setHeader('content-type', 'text/css')
      resp.end(css.toString())
    }

  , js: function (req, resp) {
      var bundle = browserify([opts.js.entry])
      bundle.transform(hbsfy)
      bundle.transform(brfs)
      bundle.bundle({debug: opts.debug || false}, function (e, src) {
        if (e) return error(resp, e);
        resp.setHeader('content-type', 'text/javascript')
        resp.end(src)
      })
    }

  }

}

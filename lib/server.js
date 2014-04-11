var st = require('st')
  , http = require('http')
  , path = require('path')
  , js = require('atomify-js')
  , css = require('atomify-css')
  , open = require('open')
  , through = require('through')
  , tinylr = require('tiny-lr-fork')
  , gaze = require('gaze')
  , server

module.exports = function (args) {

  var mount = st(args.server.st || { path: process.cwd(), cache: false })
    , port = args.server.port || 1337
    , launch = args.server.open
    , path = args.server.path || '/'
    , lr = args.server.l || args.server['live-reload']

  if (lr) {
    // by some arcane standard, this is default port for livereload
    lr.port = lr.port || 35729
    startLiveReloadServer(lr)
  }

  if (path.charAt(0) !== '/') path = '/' + path
  if (!args.js) args.js = {}
  if (!args.js.alias) args.js.alias = '/' + args.js.entry
  if (!args.css) args.css = {}
  if (!args.css.alias) args.css.alias = '/' + args.css.entry

  http.createServer(function (req, res) {

    switch (req.url) {
      case args.js.alias || args.js.entry:
        js(args.js, responder('javascript', res))
        break

      case args.css.alias || args.css.entry:
        css(args.css, responder('css', res))
        break

      default:
        if (req.url.substr(-5) === '.html') res.filter = injectLiveReloadScript(lr)
        mount(req, res)
        break
    }

  }).listen(port)

  if (launch) open(args.server.url || 'http://localhost:' + port + path)
}

function responder (type, res) {
  return function (err, src) {
    if (err) console.log(err);

    if (!res.headersSent) res.setHeader('Content-Type', 'text/' + type)
    res.end(src)
  }
}

function startLiveReloadServer (lr) {
  server = tinylr()
  server.listen(lr.port)

  var pattern = typeof lr === 'object' ? lr._ : ['*.html', '*.js', '*.css']

  gaze(pattern, function() {
    this.on('changed', function (filepath) {
      if (!lr.quiet) console.log(path.relative(process.cwd(), filepath), 'changed');
      server.changed({ body: { files: filepath } })
    })
  })
}

function injectLiveReloadScript (lr) {
  var buffer = ''
    , tag = '<script src="http://localhost:' + lr.port + '/livereload.js?snipver=1"></script>\n'

  return through(function (chunk) {
    buffer += chunk.toString()
  }, function () {
    this.queue(buffer.replace('</body>', tag + '</body>'))
    this.queue(null)
  })
}

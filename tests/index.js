var atomify = require('../')
  , http = require('http')

var cssVariables = {
  background: '#f00'
}

var atom = atomify({
  js: {
    entry: './entry.js'
  }
, css: {
    entry: './entry.css'
  , variables: cssVariables
  }
});

http.createServer(function (req, res) {

  console.log('requesting', req.url)

  if (req.url == '/style.css') atom.css(req, res)
  else if (req.url == '/index.js') atom.js(req, res)
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found\n');
  }

}).listen(8080);
console.log('Test server running at http://localhost:8080/');

Atomify
===============

An atomic web development tool - keep all your templates, css, and js for each node module together.

### Examples

```js
var atomify = require('atomify')
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
console.log('Server running at http://localhost:8080/');
```

### Install

Installing via npm is easy:

```bash
npm install atomify
```

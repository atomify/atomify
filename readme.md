Atomify
===============

An atomic web development tool - keep all your templates, css, and js for each node module together.

### Description

Atomify provides two http handler functions to bundle js and css from node modules.

For the js bundle it uses [atomify-js](http://github.com/techwraith/atomify-js) and for the css bundle it uses [atomify-css](http://github.com/techwraith/atomify-css).

### Examples

To see a real example app, check out [atomify-example](http://github.com/techwraith/atomify-example).

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

If you'd like a CLI so that you can build atomify bundles, use [atomify-cli](http://github.com/techwraith/atomify-cli).

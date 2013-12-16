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
  , path = require('path')

var cssVariables = {
  background: '#f00'
}

var atom = atomify({
  js: {
    entry: path.join(__dirname, 'entry.js')
  }
, css: {
    entry: path.join(__dirname, 'entry.css')
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

if you don't want to use the http helpers, just use the `atomify-css` and `atomify-js` packages:

index.js
```js
var js = require('atomify-js')
  , css = require('atomify-css')
  , opts = {}

opts.js = {
  entry: './entry.js'
, shim: {
    jquery: { path: './jquery.js', exports: '$' }
  }
, debug: true // default: `false`
}

js(opts.css, function (err, src) {
  
  // do something with the src
  
})

opts.css = {
  entry: './entry.css'
, variables: {
    bg: 'black'
  }
}

css(opts.css, function (err, src) {

  // do something with the src

})
```

entry.js
```js
var module = require('module')
  , template = require('template.html.hbs')
  
template({param: 'param'})
```

entry.css
```css
@import "./global.css";
@import "combobox";
@import "./inputs.css";

body {
  background: var(bg);
}
```

### Install

Installing via npm is easy:

```bash
npm install atomify
```

If you'd like a CLI so that you can build atomify bundles, use [atomify-cli](http://github.com/techwraith/atomify-cli).

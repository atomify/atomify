Atomify
===============

Atomic web development - Combining the power of npm, Browserify, Rework and more to build small, fully encapsulated client side modules

## Description

Atomify provides a centralized point of access to [atomify-js](http://github.com/techwraith/atomify-js) and [atomify-css](http://github.com/techwraith/atomify-css) both in code and on the command line. It also offers a live-bundling http server to make development a breeze.

## API

Just like its constituent pieces, atomify is a function that takes an `opts` object and a `callback` function.

### opts

**opts.js** - Options to be passed to [atomify-js](https://github.com/techwraith/atomify-js#opts)

**opts.css** - Options to be passed to [atomify-css](https://github.com/techwraith/atomify-css#opts)

### callback

Just like the callbacks used by `atomify-js` and `atomify-css`, but with a third parameter to denote the type of bundle being provided. `cb(err, src, type)` where type is either `'js'` or `'css'`. Not called for bundle types where `opts.{type}.output` is specifed.

### API Example

```js
// build.js
var atomify = require('atomify')

var jsConfig = './entry.js' // shorthand for {entry: './entry.js'}

var cssConfig = {
  entry: './entry.css'
  , variables: {
    background: '#f00'
  }
}

function cb (err, src, type) {
  if (type === 'js') {
    // do something with JS bundle
  } else {
    // do something with CSS bundle
  }
}

atomify({js: jsConfig, css: cssConfig}, cb);
```

### atomify.js and atomify.css

As a convenience, you can access `atomify-js` and `atomify-css` via properties on the `atomify` function.

```js
var atomify = require('atomify')

atomify.js == require('atomify-js')
atomify.css == require('atomify-css')
```

## Development server

Atomify includes a simple development server to enable on-the-fly bundling. `atomify.server(opts)` provides basically the same API as `atomify` itself, with a few extra options (documented below) added in. The biggest difference, of course, is that instead of writing to a file or calling a callback function, `atomify.server` responds to http requests.

Just like with `atomify`, the options passed to `atomify.server` are expected to have a `js` and/or `css` field. When the `entry` option of either of these is requested, the server will return the results of bundling your code. If you don't want to include the actual path to your entry file in your HTML you can also provide an `alias` option field. When the alias path is requested the server will bundle using your `entry` path.

### opts.server

You can provide server-specific options in this field.

**opts.server.port** - Port to listen on. Default: 1337

**opts.server.open** - If provided, open the URL in your default browser

**opts.server.path** - The path to open. Appended to http://localhost:port

**opts.server.url** - Full URL to open instead of http://localhost:port/path

**opts.server.st** - Options to pass to [st](https://www.npmjs.org/package/st) static file server, which is what serves all non-entry/alias requests.

## CLI

Thanks to [subarg](https://github.com/substack/subarg), nearly everything you can do in code, you can do on the command line. JS options can be specified in a `--js, -j` subarg context and CSS options can be specified in a `--css, -c` subarg context. Server options can be specified in a `--server, -s` subarg context.

If you supply the `--debug, -d` or `--output, -o` args outside the `--js` and `--css` contexts they will apply to both JS and CSS bundles. When providing an `--output` argument that applies to both, omit the file extension and it will be applied correctly for you.

You can also configure aliases by appending them after a `:` in your entry field.

Get a complete listing of options by running `atomify --help`

### CLI Examples

```bash
atomify -j [ entry.js bundle.js ]
atomify -j [ -e entry.js -e other.js -o bundle.js -d -w ]
atomify -j [ entry.js -t funkify ] -c [ entry.css ] -o bundle
atomify -j [ src/entry.js:bundle.js ] -c [ styles/entry.css:bundle.css ] --server [ --open ]
```

## Install

```bash
npm install atomify
```
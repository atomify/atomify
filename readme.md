Atomify
===============

Atomic web development - Combining the power of npm, Browserify, Rework and more to build small, fully encapsulated client side modules

## Description

Atomify provides a centralized point of access to [atomify-js](http://github.com/techwraith/atomify-js) and [atomify-css](http://github.com/techwraith/atomify-css) both in code and on the command line. It also offers a live-bundling http server to make development a breeze.

## API

Just like its constituent pieces, atomify takes an `opts` object and a `callback` function.

### opts

**opts.js** - Options to be passed to [atomify-js](https://github.com/techwraith/atomify-js#opts)

**opts.css** - Options to be passed to [atomify-css](https://github.com/techwraith/atomify-css#opts)

### callback

Just like the callbacks used by `atomify-js` and `atomify-css`, but with a third parameter to denote the type of bundle being provided. `cb(err, src, type)` where type is either `js` or `css`. Not called for bundle types where `opts.{type}.output` is specifed.

### API Example

To see a real example app, check out [atomify-example](http://github.com/techwraith/atomify-example).

```js
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

## CLI

Thanks to [subarg](https://github.com/substack/subarg), nearly everything you can do in code, you can do on the command line. JS options can be specified in a `--js, -j` subarg context and CSS options can be specified in a `--css, -c` subarg context.

If you supply the `--debug, -d` or `--output, -o` args outside the `--js` and `--css` contexts they will apply to both JS and CSS bundles. When providing an `--output` argument that applies to both, omit the file extension and it will be applied correctly for you.

Get a complete listing of options by running `atomify --help`

### CLI Examples

`atomify -j [ entry.js bundle.js ]`
`atomify -j [ -e entry.js -e other.js -o bundle.js -d -w ]`
`atomify -j [ entry.js -t funkify ] -c [ entry.css ] -o bundle`

## Install

```bash
npm install atomify
```
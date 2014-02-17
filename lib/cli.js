var js = require('atomify-js')
  , css = require('atomify-css')
  , fs = require('fs')
  , writer = require('write-to-path')

module.exports = function (args) {
  if (args.css) {
    args.css = parseArgs('css', args.css, args)

    args.css.variables = args.css.v || args.css.variables
    args.css.plugins = args.css.p || args.css.plugins

    css(args.css, writer(args.css.output, args.css))
  }

  if (args.js) {
    args.js = parseArgs('js', args.js, args)

    args.js.debug = args.js.d || args.js.debug
    args.js.watch = args.js.w || args.js.watch
    args.js.transforms = args.js.t || args.js.transform

    js(args.js, writer(args.js.output, args.js))
  }
}

function parseArgs (ext, child, parent) {
  if (typeof child === 'string') child = {entry: child} // -j entry.js
  if (child._) child.entry = child._[0] // -j [ entry.js ]
  if (typeof child.e === 'string') child.entry = child.e // -j [ -e entry.js ]
  if (Array.isArray(child.e)) child.entries = child.e // -j [ -e entry.js -e other.js ]

  child.output = child.o || child.output
  if (child._ && child._.length === 2) child.output = child._[1] // -j [ entry.js bundle.js ]
  if (!child.output && parent.output) child.output = parent.output.indexOf(ext) ? output : output + '.' + ext

  if (!child.output) {
    console.error('No output path provided for ' + ext.toUpperCase() + ' bundle!')
    process.exit(1)
  }

  return child;
}

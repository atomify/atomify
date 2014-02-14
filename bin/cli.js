#!/usr/bin/env node

var js = require('atomify-js')
  , css = require('atomify-css')
  , fs = require('fs')
  , writer = require('write-to-path')
  , argv = require('subarg')(process.argv.slice(2))


var co = argv.c || argv.css
if (co) {
  if (typeof co === 'string') co = {entry: co} // -c entry.css
  if (co._) co.entry = co._[0] // -c [ entry.css ]
  if (co.e) co.entry = co.e // -c [ -e entry.css ]

  co.variables = co.v || co.variables
  // TODO: I think we could support plugins if -css checked for strings and require()-ed them
  //co.plugins = co.p || co.plugins
  co.output = co.o || co.output

  if (!co.output) {
    console.error('No output path provided for CSS bundle!')
    process.exit(1)
  }

  css(co, writer(co.output, co))
}

var jo = argv.j || argv.js
if (jo) {
  if (typeof jo === 'string') jo = {entry: jo} // -j entry.js
  if (jo._) jo.entry = jo._[0] // -j [ entry.js ]
  if (jo.e) jo.entry = jo.e // -j [ -e entry.js ]

  jo.debug = jo.d || jo.debug
  jo.watch = jo.w || jo.watch
  jo.transforms = jo.t || jo.transforms
  jo.output = jo.o || jo.output

  if (!co.output) {
    console.error('No output path provided for JS bundle!')
    process.exit(1)
  }

  js(jo, writer(jo.output, jo))
}

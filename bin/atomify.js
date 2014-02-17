#!/usr/bin/env node

var cli = require('../lib/cli')
  , argv = require('subarg')(process.argv.slice(2), {
    alias: {
      j: 'js'
      , c: 'css'
      , o: 'output'
      , d: 'debug'
    }
  })

cli(argv)

var test = require('tape')
  , atomify = require('../')
  , jsf = __dirname + '/fixtures/js/'
  , cssf = __dirname + '/fixtures/css/'
  , fs = require('fs')
  , read = function (file) {
    return fs.readFileSync(file, 'utf8')
  }

var jsCfg = {
  entry: jsf + 'entry.js'
}

var cssCfg = {
  entry: cssf + 'entry.css'
}

test('js only', function (t) {
  t.plan(2)

  atomify({js: jsCfg}, function (err, src, type) {
    t.equal(src, read(jsf + 'bundle.js'))
    t.equal(type, 'js')
  })
})

test('css only', function (t) {
  t.plan(2)

  atomify({css: cssCfg}, function (err, src, type) {
    t.equal(src, read(cssf + 'bundle.css'))
    t.equal(type, 'css')
  })
})

test('js and css', function (t) {
  t.plan(2)

  atomify({js: jsCfg, css: cssCfg}, function (err, src, type) {
    if (src === read(jsf + 'bundle.js')) {
      t.equal(type, 'js')
    }
    if (src === read(cssf + 'bundle.css')) {
      t.equal(type, 'css')
    }
  })
})

test('js and css, auto import', function (t) {
  t.plan(2)

  atomify({js: jsf + 'entry-auto.js', css: 'auto'}, function (err, src, type) {
    if (src === read(jsf + 'bundle-auto.js')) {
      t.equal(type, 'js')
    }    
    if (src === read(cssf + 'bundle.css')) {
      t.equal(type, 'css')
    }
  })
})

test('js output does not prevent callback', function (t) {
  t.plan(2)

  atomify({js: {
    entry: jsCfg.entry
    , output: jsf + 'bundle-output.js'
  }, css: cssCfg}, function (err, src, type) {
    if (type === 'css') t.equal(type, 'css')
    if (type === 'js') t.equal(type, 'js')
  })
})

test('css output does prevent callback', function (t) {
  t.plan(1)

  atomify({js: jsCfg, css: {
    entry: cssCfg.entry
    , output: cssf + 'bundle-output.css'
  }}, function (err, src, type) {
    t.equal(type, 'js')
  })
})

test('js property', function (t) {
  t.plan(2)

  atomify.js(jsCfg.entry, function (err, src, type) {
    t.equal(src, read(jsf + 'bundle.js'))
    t.equal(typeof type, 'undefined')
  })
})

test('css property', function (t) {
  t.plan(2)

  atomify.css(cssCfg.entry, function (err, src, type) {
    t.equal(src, read(cssf + 'bundle.css'))
    t.equal(typeof type, 'undefined')
  })
})

test('port conflict detection', function (t) {
  t.plan(1)

  t.throws(function () {
    atomify({
      server: {port: 3000, lr: true}
    })
  })
})

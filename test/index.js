var test = require('tape')
  , atomify = require('../')
  , path = require('path')
  , jsf = path.join(__dirname, 'fixtures', 'js/')
  , cssf = path.join(__dirname, 'fixtures', 'css/')
  , fs = require('fs')
  , dep = require('./fixtures/js/dep.js')
  , read = function (file) {
    return fs.readFileSync(file, 'utf8')
  }

var jsCfg = {
  entry: path.join(jsf, '/entry.js')
}

var cssCfg = {
  entry: path.join(cssf, '/entry.css')
}

test('js only', function (t) {
  t.plan(3)

  atomify({js: jsCfg}, function (err, src, type) {
    t.error(err, 'does not error')
    t.ok(src.toString().indexOf(dep) > -1, 'output contains the dep')
    t.equal(type, 'js')
  })
})

test('css only', function (t) {
  t.plan(3)

  atomify({css: cssCfg}, function (err, src, type) {
    t.error(err, 'does not error')
    t.equal(src, read(path.join(cssf, 'bundle.css')))
    t.equal(type, 'css')
  })
})

test('js and css', function (t) {
  t.plan(4)

  atomify({js: jsCfg, css: cssCfg}, function (err, src, type) {
    if (src.toString().indexOf(dep) > -1) {
      t.error(err, 'js does not error')
      t.equal(type, 'js')
    }
    if (src === read(path.join(cssf, 'bundle.css'))) {
      t.error(err, 'css does not error')
      t.equal(type, 'css')
    }
  })
})

test('js output does not prevent callback', function (t) {
  t.plan(4)

  atomify({js: {
    entry: jsCfg.entry
    , output: path.join(jsf, 'bundle-output.js')
  }, css: cssCfg}, function (err, src, type) {
    if (type === 'css'){
      t.error(err, 'does not error')
      t.equal(type, 'css')
    }
    if (type === 'js'){
      t.error(err, 'does not error')
      t.equal(type, 'js')
    }
  })
})

test('css output does prevent callback', function (t) {
  t.plan(2)

  atomify({js: jsCfg, css: {
    entry: cssCfg.entry
    , output: path.join(cssf, 'bundle-output.css')
  }}, function (err, src, type) {
    if (type === 'js'){
      t.error(err, 'does not error')
      t.equal(type, 'js')
    }
  })
})

test('js property', function (t) {
  t.plan(3)

  atomify.js(jsCfg.entry, function (err, src, type) {
    t.error(err, 'does not error')
    t.ok(src.toString().indexOf(dep) > -1, 'output contains the depedency')
    t.equal(typeof type, 'undefined')
  })
})

test('css property', function (t) {
  t.plan(3)

  atomify.css(cssCfg.entry, function (err, src, type) {
    t.error(err, 'does not error')
    t.equal(src, read(path.join(cssf, 'bundle.css')))
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

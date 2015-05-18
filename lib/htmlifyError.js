'use strict'

var internals = {}
  , AnsiToHTML = require('ansi-to-html')
  , prettyError = require('prettify-error')

internals.htmlifyBabelError = function htmlifyBabelError (err, options) {
  var stack = (new AnsiToHTML({
    escapeXML: true
    , fg: '#000'
    , bg: '#fff'
  })).toHtml(err.codeFrame)
    , html = options.head
      ? '<!doctype html><html><head>'
        + '<meta charset="utf-8">'
        + '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
        + '<meta name="viewport" content="initial-scale=1,width=device-width,user-scalable=0">'
        + '<title>' + err.toString() + '</title>'
        + '</head><body>'
      : ''

  html +=
    +'<div style="font-family: \'helvetica-neue\', helvetica">'
    + '<h1>' + err.toString() + '</h1>'
    + '</div>'
    + '<pre><code>' + stack + '</code></pre>'

  if (options.head) html += '</body></html>'

  return html
}

module.exports = function htmlifyError (err, options) {
  var lines
    , html
    , prettyifiedErr

  options || (options = {})

  if (err._babel) return internals.htmlifyBabelError(err, options)

  prettyifiedErr = prettyError(err) || err

  lines = (new AnsiToHTML({escapeXML: true})).toHtml(prettyifiedErr).split('\n')
  html = options.head
    ? '<!doctype html><html><head>'
      + '<meta charset="utf-8">'
      + '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
      + '<meta name="viewport" content="initial-scale=1,width=device-width,user-scalable=0">'
      + '<title>' + err.toString() + '</title>'
      + '</head><body>'
    : ''

  // first line is the error
  html += '<div style="font-family: \'helvetica-neue\', helvetica">'
    + '<h1>' + lines.shift() + '</h1>'
    + '<pre><code>'
    // second line is a location marker
    + lines.shift() + '\n'
    // third through fifth lines are code
    + lines.shift() + '\n'
    + lines.shift() + '\n'
    + lines.shift() + '\n'
    // sixth line is a location marker
    + lines.shift() + '\n'
    + '</code></pre>'

    + '<ul style="list-style: none; padding: 0; margin: 0">'
      + lines.map(function eachLine (line) {
        return '<li style="margin-bottom: .5em">'
          + line.trim()
            .replace(/^at\s/, '')
            .replace(/\((.*)\)$/, '<span style="color: grey">$1</span>')
          + '</li>'
      }).join('')
    + '</ul>'
    + '</div>'

  if (options.head) html += '</body></html>'

  return html
}

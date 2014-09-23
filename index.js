var js = require('atomify-js')
  , css = require('atomify-css')
  , server = require('./lib/server')
  , fs = require('fs')
  , path = require('path')

module.exports = atomify

function atomify (opts, cb) {

  if (opts.assets && opts.css) opts.css.assets = opts.assets
  if (opts.assets && opts.js) opts.js.assets = opts.assets

  if (opts.server) return server(opts)

  if (opts.js) var bundle = js(opts.js, callback(cb, 'js'))

  if( opts.js && opts.css && (opts.css === "auto" || (typeof opts.css === "object" && opts.css.entry === "auto" )) ){
    var tempcss = path.join( process.cwd(), '_tempCss.css' )
    var total = ""
    var _cb = cb

    cb = function(err, src, type){
      fs.unlinkSync( tempcss )
      if(typeof _cb === 'function'){
        _cb(err, src, type);
      }
    }

    atomify.js.emitter.on('package', function(pkg){
      var pkg_dir = path.dirname(pkg),
          pkg_path = path.join(pkg_dir, 'package.json');

      if(fs.existsSync(pkg_path) ){
        var pkg_obj = JSON.parse(fs.readFileSync(pkg_path)),
            pkg_entry;
        if(pkg_obj && pkg_obj.style ){
          if( typeof pkg_obj.style !== "string" 
            || !fs.existsSync( pkg_entry = path.resolve( pkg_dir, pkg_obj.style )) ) return
          total += "@import " + JSON.stringify( pkg_entry ) + ";";
        }else if ( fs.existsSync( pkg_entry = path.join( pkg_dir, "index.css" ) ) ) {
          total += "@import " + JSON.stringify( pkg_entry ) + ";";
        }
      }
    })

    bundle.on('end', function(){
      fs.writeFileSync( tempcss, total )
      if(typeof opts.css === "string")
        opts.css = tempcss;
      else
        opts.css.entry = tempcss;
      css(opts.css, callback(cb, 'css'))
    })

  } else if (opts.css){
    css(opts.css, callback(cb, 'css'))
  }

}

function callback (cb, type) {
  if (!cb) return null
  
  return function (err, src) {
    cb(err, src, type)
  }
}

atomify.js = js
atomify.css = css
atomify.server = server

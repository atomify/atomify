# Changelog

## 7.3.0
* add: now notifies both in the browser and the shell when CSS files are changed. We were already doing this for JS, so now for CSS too.

## 7.2.3
* fix: remove undocumented `resourcePaths` feature from CLI so that LESS will work. #82

## 7.2.2
* internal: fixup eslint
* internal: abstract out htmlifyError. This is nice because it means external libs can print out errors in the same way atomify does. This might be useful if you want to handle an error making custom HTML on your own.

## 7.2.1
* fix: server custom html now correctly replaces JS and CSS

## 7.2.0
* add: Server can now deal with the special snowflake babel errors.
* add: Server now just logs compilation errors, instead of exiting

## 7.1.3
* fix: server: fallback if fancy error reporting fails

## 7.1.2
* fix: server: if js or css fails to compile, the error no longer throws and causes the process to exit. Instad, we're printing the error to the shell

## 7.1.1
* add: server: cache prettified error for minor speed increase
* fix: server: when showing error output in html, browser-sync now works
* internal: dependcy versions were bumped. Only minor and patch changes.

## 7.1.0
* add: server: add a "single page app mode" so all routes trigger the default HTML
* add: server: custom html function is now passed the requested url (this is handy in single page app mode)
* add: server: custom HTML gets much prettier errors, both to the shell and the browser

## 7.0.2
* fix: server: better custom default html if no option passed. #oops

## 7.0.1
* fix: server: only try to render custom default html if passed the `html` option.

## 7.0.0
* breaking: server: we no longer watch all css files under the cwd. Only the entry file and it's dependencies
* add: server: enables setting the HTML that will be served at `/default` by either file or function. Super useful if you want to server-render.
* change: sever: dramatic speed up of watching by using chokidar (built into browser-sync) instead of gaze which gets us native OS FS events were possible
* change: server: unifed logging. It's all pretty now.
* change: removed undocumented APIs around `resourcepaths`
* change: dev: now using eslint instead of jshint and jscs
* fix: server: dramatic reduction of resources by not watching node_modules
* fix: server: no longer running three file watchers, sometimes with overlapping files. We should have a much smaller memory and CPU footprint.

## 6.1.0
* Added css & assets watch mode (@serapath)

## 6.0.4
* fix race condition in server, should prevent random server crashes
* revert gaze to 0.5, because 0.6 is the suck

## 6.0.3
Fix missing color module

## 6.0.2
Update all dependencies except gaze because the latest gaze breaks on linux.

## 6.0.1
Bug fix: `hbsfy` is no longer a peer dependency because of the `atomify-js` upgrade.

## 6.0.0
Upgrade to [atomify-js 4.0.0](https://github.com/atomify/atomify-js/blob/master/CHANGELOG.md#400)


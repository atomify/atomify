# Changelog

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


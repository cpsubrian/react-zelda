Legend of Link
==============

A fun react experiment.

![Screenshot](https://raw.githubusercontent.com/cpsubrian/react-zelda/master/resources/screenshot.png)

Uses:

- react
- react-router
- alt flux

Build-Chain:

- Webpack
- Gulp
- BrowserSync

Install & 'Play'
----------------

```
$ npm install
$ npm start
$ open localhost:3000
```

Notes on 'Play':

- Right now you just move around, but terrain collision-detection 'works' :)
- Use the arrow keys
- You must click the game area to 'focus' it (trying to figure out a workaround).

Notes for development:

- Components are hot-loaded.
- CSS is auto-injected by browser-sync.
- Edits to Stores/Actions require a hard refresh (because actions get double-bound)

License
-------

MIT

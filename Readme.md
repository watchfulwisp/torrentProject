torrentProject
==============

A node.js library for accessing the Torrent Project REST API.

## Instalation

```js
$ npm install torrent_project
```

## API
var tp = require('./lib/torrentProject.js');

```js
tp.search('debian 7 dvd', 'matches', 'json', function(err, data){
	console.log(err, data);
});
```

## Tests
```js
$ npm test
```
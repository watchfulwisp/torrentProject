var tp = require('./lib/torrentProject.js');

tp.search('debian 7 dvd', 'matches', 'json', function(err, data){
	console.log(err, data);
});

tp.trackers('8ac3731ad4b039c05393b5404afa6e7397810b41', 'json', function(err, data){
	console.log(err, data);
});

tp.peers('8ac3731ad4b039c05393b5404afa6e7397810b41', function(err, data){
	console.log(err, data);
});

tp.getHourlyDump('hourlydump', function(err, data){
	console.log(err, data);
});

tp.getDailyDump('dailydump', function(err, data){
	console.log(err, data);
});
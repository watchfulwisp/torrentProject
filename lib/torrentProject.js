var http = require('http'),
	fs = require('fs'),
	base_url = 'torrentproject.com';

exports.search = function(query, order_by, format, callback){
	if(query == ''){ callback(new Error('empty query!'), null); return; }
	if(order_by != 'matches' && order_by != 'latest'){ callback(new Error('invalid order_by!'), null); return; }
	if(format != 'json' && format != 'rss'){ callback(new Error('invalid format!'), null); return; }
	query = encodeURIComponent(query);
	request('/?s='+query+'&out='+format+(order_by == 'latest' ? '&orderby=latest' : ''), callback);
}

exports.peers = function(hash, callback){
	if(!/^[a-f0-9]{40}$/.test(hash)){ callback(new Error('invalid hash!'), null); return; }
	request('/'+hash+'/peers', function(err, data){
		if(err){ callback(err, null); return; }
		arr = data.split(':');
		callback(null, { seeders: parseInt(arr[0]), leechers: parseInt(arr[1]) });
	});
}

exports.trackers = function(hash, format, callback){
	if(!/^[a-f0-9]{40}$/.test(hash)){ callback(new Error('invalid hash!'), null); return; }
	if(format != 'json' && format != 'xml'){ callback(new Error('invalid format!'), null); return; }
	request('/'+hash+'/trackers_'+format, callback);
}

exports.getDailyDump = function(output, callback){
	downloadFile('http://'+base_url+'/dailydump.txt.gz', output+'.txt.gz', callback);
}

exports.getHourlyDump = function(output, callback){
	downloadFile('http://'+base_url+'/hourlydump.txt.gz', output+'.txt.gz', callback);
}

function request(endpoint, callback){
	var req = http.request({
		host: base_url,
		port: 80,
		path: endpoint,
		method: 'GET'
	}, function(res) {
		res.setEncoding('utf8');
	});
	req.on('response', function(response){
		var data = '';
		response.on('data', function(chunk){
			data += chunk;
		});
		response.on('end', function(){
			try { data = JSON.parse(data); }
			catch(e) { callback(new Error(e), null); }
			if(typeof data.error == 'undefined') callback(null, data);
			else callback(new Error(data.error), null);
		});
	});
	req.on('error', function(e){
		callback(new Error(e.message), null);
	});
	req.end();
}

function downloadFile(input, output, callback){
	var file = fs.createWriteStream(output);
	
	http.get(input, function(response){
		response.pipe(file);
		response.on('error', function(e){
			callback(new Error(e.message), null);
		});
		response.on('end', function(){
			callback(null, 'done');
		});
	});
}
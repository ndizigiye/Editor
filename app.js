/*Imports*/
var express = require("express");
var fs = require('fs');
var User = require("./lib/user.js").User;
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
/* End imports */

// io.configure(function() {
// io.set("transports", [ "xhr-polling" ]);
// io.set("polling duration", 100000);
// });
server.listen(8080 || process.env.PORT);

app.use(express.static(__dirname + '/'));

io.sockets.on('connection', function(socket) {

	socket.on('user', function(name, time) {
		var user = new User(name, socket.id, time);
		console
				.log("Name:---" + user.getName() + "Time: ----"
						+ user.getTime());

		var html = "<html>" + "<body>" + "The user said: " + user.getName()
				+ "</body>" + "</html>";
		var appjs = 'var express = require("express");'
				+ 'var fs = require("fs");'
				+ 'var module = require("./lib/user.js");'
				+ 'var app = express();' + 'var http = require("http");'
				+ 'var server = http.createServer(app);'
				+ 'var io = require("socket.io").listen(server);';
		fs.writeFile('Games/index.html', html, function(err) {
			if (err)
				throw err;
			console.log('It\'s saved!');
		});

		fs.writeFile('Games/app.js', appjs, function(err) {
			if (err)
				throw err;
			console.log('It\'s saved!');
		});
	});

	socket.on('disconnect', function() {
		console.log("Connection " + socket.id + " terminated.");
	});
});

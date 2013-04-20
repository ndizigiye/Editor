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
		
		var html_mobile = "<html>"+'\n'
				+"<script src='/socket.io/socket.io.js'></script>"+'\n'
				+"<script>"
				+"function "+name+"(){"+'\n'
				+"var socket = io.connect('http://' + window.location.host + '/');"+'\n'
				+"socket.emit('"+name+"','Hello world');"+'\n'
				+"}"+'\n'
				+"</script>"+'\n'
				+ "<body>"+'\n'
				+"<button onclick='"+name+"()'>"+name+"</button>"+'\n'
				+ "</body>"+'\n'
				+ "</html>";
		
		var html_monitor = '<html>'+'\n'
			+'<script src="/socket.io/socket.io.js"></script>'+'\n'
			+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>'+'\n'
			+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>'+'\n'
			+'<script src="http://infosupport.jit.su/lib/prettyPhoto/prettyphoto.js"></script>'+'\n'
			+'<script>'+'\n'
			+'var socket = io.connect("http://" + window.location.host + "/");'+'\n'
			+'socket.on("'+name+'", function(msg){'+'\n'
			+'$("#inline").text(msg);'+'\n'
			+'$.prettyPhoto.open("#inline","'+name+'","'+name+'");'+'\n'
			+'});'+'\n'
			+'</script>'+'\n'
			+'<body>'+'\n'
			+'<div id="inline">'+'\n'
			+'</div>'+'\n'
			+'</body>'+'\n'
			+'</html>';
		
		var appjs = 'var express = require("express");'+'\n'
				+ 'var fs = require("fs");'+'\n'
				+ 'var app = express();' + 'var http = require("http");'+'\n'
				+ 'var server = http.createServer(app);'+'\n'
				+ 'var io = require("socket.io").listen(server);'+'\n'
				+'server.listen(8080 || process.env.PORT);'+'\n'
				+'app.use(express.static(__dirname + "/"));'+'\n'
				+'io.sockets.on("connection", function(socket) {'+'\n'
				+'socket.on("'+name+'", function(msg) {'+'\n'
				+'socket.broadcast.emit("'+name+'",msg);'+'\n'
				+'});'+'\n'
				+'});';
		
		fs.writeFile('Games/index.html', html_mobile, function(err) {
			if (err)
				throw err;
			console.log('mobile saved!');
		});
		
		fs.writeFile('Games/monitor.html', html_monitor, function(err) {
			if (err)
				throw err;
			console.log('monitor saved!');
		});
		
		fs.writeFile('Games/app.js', appjs, function(err) {
			if (err)
				throw err;
			console.log('app.js saved!');
		});
	});

	socket.on('disconnect', function() {
		console.log("Connection " + socket.id + " terminated.");
	});
});

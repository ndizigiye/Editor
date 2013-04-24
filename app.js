/*Imports*/
var express = require("express");
var fs = require('fs');
var User = require("./lib/user.js").User;
var Html = require("./lib/Html.js").Html;
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

function writeFile(location,html){
	fs.writeFile(location, html, function(err) {
		if (err)
			console.log(err);
		console.log('file saved!');
	});
}

function makeDir(path){
	fs.mkdir(path, '7777', function() {
		console.log('directory '+path+' created');
	});
}

io.sockets.on('connection', function(socket) {

    socket.on('open', function(type,data){
        socket.broadcast.emit('open',type,data);
    });
    
    socket.on('game', function(id){
    	
    	makeDir('./Games/'+id);
    	
    	var mobile_html = new Html();
    	var monitor_html = new Html();
    	
    	var mobilehtml = mobile_html.addHeader() + mobile_html.addJs()+mobile_html.addEmitter()+ mobile_html.addFooter();
    	var monitorhtml = monitor_html.addHeader() + monitor_html.addJs() +monitor_html.addListener()+ monitor_html.addFooter();
    	
    	var mobile_location = './Games/'+id+'/index.html';
    	var monitor_location = './Games/'+id+'/monitor.html';
    	
    	writeFile(mobile_location  , mobilehtml);
    	writeFile(monitor_location  , monitorhtml);
    	
    });
    
    socket.on('save',function(path,html){
    	writeFile(path, html);
    	console.log(path+ " ..."+html);
    });

	socket.on('disconnect', function() {
		console.log("Connection " + socket.id + " terminated.");
	});
});

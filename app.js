/*Imports*/
var express = require("express");
var fs = require('fs');
var User = require("./client_lib/user.js").User;
var Login = require("./lib/login.js").Login;
var Html = require("./client_lib/Html.js").Html;
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
/* End imports */

// io.configure(function() {
// io.set("transports", [ "xhr-polling" ]);
// io.set("polling duration", 100000);
// });

server.listen(process.env.PORT || 8080);
app.use(express.static(__dirname+'/html/'));
app.use(express.static(__dirname+'/client_lib/'));
app.use(express.static(__dirname+'/Games/'));

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

function removeDir(path){
	var files = fs.readdirSync(path);
	for (var i in files ){
		fs.unlinkSync(path+"/"+files[i]);
	}
	fs.rmdirSync(path);
	console.log('directory '+path+' deleted');
}


io.sockets.on('connection', function(socket) {
	//fake a new login to initiate the database
	//
	//
	var l = new Login();
	l.login("test","test");
	//
	//
	//
    socket.on('open', function(type,data){
        socket.broadcast.emit('open',type,data);
    });
    
    socket.on('game', function(id){
    	
    	makeDir('./Games/Games/'+id);
    	
    	var mobile_html = new Html();
    	var monitor_html = new Html();
    	
    	var mobilehtml = mobile_html.addHeader() + mobile_html.addJs()+mobile_html.addEmitter()+ mobile_html.addFooter();
    	var monitorhtml = monitor_html.addHeader() + monitor_html.addJs()+monitor_html.addListener()+ monitor_html.addFooter();
    	
    	var mobile_location = './Games/Games/'+id+'/index.html';
    	var monitor_location = './Games/Games/'+id+'/monitor.html';
    	
    	writeFile(mobile_location  , mobilehtml);
    	writeFile(monitor_location  , monitorhtml);
    	
    });
    
    socket.on('save',function(path,html){
    	writeFile(path, html);
    	console.log(path+ " ..."+html);
    });
    
    socket.on('delete game',function(path){
    	console.log(path);
    	removeDir(path);
    });
    
    socket.on('addUser',function(username,password){
    	var l = new Login();
    	l.Register(username,password);
    });
    
    socket.on('findUser',function(provided_password,username,find){
    	var l = new Login();
    	var exists = l.login(provided_password,username);
    	find(exists);
    });
    
    socket.on('search', function(games){
    	var dir = fs.readdirSync('./Games/Games');
    	console.log("Found"+ dir);
    	games(dir);
    });

	socket.on('disconnect', function() {
		console.log("Connection " + socket.id + " terminated.");
	});
});

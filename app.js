/*Imports*/
var express = require("express");
var fs = require('fs');
var User = require("./client_lib/user.js").User;
var Login = require("./lib/login.js").Login;
var Html = require("./client_lib/Html.js").Html;
var Html_monitor = require("./client_lib/Html_monitor.js").Html;
var Html_mobile = require("./client_lib/Html_mobile.js").Html;
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
console.log(process.env.PORT);
app.use(express.static(__dirname+'/html/'));
app.use(express.static(__dirname+'/ppt/'));
app.use(express.static(__dirname+'/client_lib/'));
app.use(express.static(__dirname+'/Games/'));
app.use(express.bodyParser());


function writeFile(location,content){
	
		fs.writeFile(location, content, function(err) {
			if (err) console.log(err);
			console.log('file saved!');
		});
	}

function makeDir(path){
	
		fs.mkdir(path, '7777', function(err) {
			if (err) console.log(err);
			console.log('directory '+path+' created');
		});

}

function removeDir(path){
	
		var files = fs.readdirSync(path);
		for (var i in files ){
		fs.unlinkSync(path+"/"+files[i]);
		}
		var rmdir = fs.rmdirSync(path);
		console.log('directory '+path+' deleted');


}

function duplicate(source, target,to) {
	  makeDir('./Games/Games/'+to);
	  var rd = fs.createReadStream(source);
	  rd.on("error", function(err) {
		  console.log('readstream error');
	  });
	  var wr = fs.createWriteStream(target);
	  wr.on("error", function(err) {
	    console.log('writeStream error');
	  });
	  wr.on("close", function(ex) {
	   console.log('=============closing===========');
	  });
	  rd.pipe(wr);
	}

io.sockets.on('connection', function(socket) {
	
	// fake a new login to initiate the database
	//
	//
	var l = new Login();
	l.login("test","test");
	//
	//
	//
	app.post('/file-upload', function(req, res, next) {
		
		var images = req.files.images;
		var pptDir = req.body.dir+"/";
		var imgSrc = [];
		
		for (var i in images){
			var content = fs.readFileSync(images[i].path);
			var name = images[i].name;
			var newPath = "./ppt/"+pptDir+name;
			imgSrc[i] = "/ppt/"+pptDir+name;
			
			console.log(name+" "+newPath);
			writeFile(newPath,content);
		}
		res.send("<script src='http://code.jquery.com/jquery-latest.min.js'></script><script>$(document).ready(function(){history.back();});</script>");
	});
	
    socket.on('open', function(type,data,gameid){
        socket.broadcast.emit('open',type,data,gameid);
    });
    
    socket.on('game', function(id){
    	
    	makeDir('./Games/Games/'+id);
    	
    	var mobile_html = new Html_mobile();
    	var monitor_html = new Html_monitor();
    	var html = new Html();
    	
    	var mobilehtml = mobile_html.addHeader() + mobile_html.addJs()+mobile_html.addEmitter()+ mobile_html.addFooter();
    	var monitorhtml = monitor_html.addHeader() + monitor_html.addJs()+monitor_html.addListener()+html.addDiv("configs","","display:none")+ monitor_html.addFooter();
    	
    	var mobile_location = './Games/Games/'+id+'/index.html';
    	var monitor_location = './Games/Games/'+id+'/monitor.html';
    	
    	writeFile(mobile_location  , mobilehtml);
    	writeFile(monitor_location  , monitorhtml);
    	
    });
    
    socket.on('duplicate', function(from,to){
    	console.log('----------duplicate-------------');
    	var mobile_from =  __dirname+'/Games/Games/'+from+'/index.html';
    	var monitor_from = __dirname+'/Games/Games/'+from+'/monitor.html';
    	
    	var mobile_to =  __dirname+'/Games/Games/'+to+'/index.html';
    	var monitor_to = __dirname+'/Games/Games/'+to+'/monitor.html';
    	
    	duplicate(mobile_from,mobile_to,to);
    	duplicate(monitor_from,monitor_to,to);
    });
    
    socket.on('ppt', function(id){
    	makeDir('./ppt/'+id);
    });
    
    socket.on('save',function(path,html){
    	writeFile(path, html);
    	console.log(path+ " ..."+html);
    });
    
    socket.on('delete',function(path){
    	console.log(path);
    	removeDir(path);
    });
    
    socket.on('addUser',function(username,password,email,exists){
    	var l = new Login();
    	var user_exists = l.Register(username,password,email);
    	exists(user_exists.toString());
    });
    
    socket.on('findUser',function(provided_username,provided_password,find){
    	var l = new Login();
    	var exists = l.simple_login(provided_username,provided_password);
    	find(exists.toString());
    });
    
    socket.on('search', function(folder,content){
    	var dir = fs.readdirSync(folder);

    	console.log("Found"+ dir);
    	content(dir);

    });

	socket.on('disconnect', function() {
		console.log("Connection " + socket.id + " terminated.");
	});
});

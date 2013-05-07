/* Html class*/

var Html = function () {

};

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Html.prototype.addHeader = function() {
	var html = '<html>'+'\n'
	+'<head>'+'\n'
	+'<script src="/socket.io/socket.io.js"></script>'+'\n'
	+'<script src="http://code.jquery.com/jquery-latest.min.js"></script>'+'\n'
	+'<script src="http://infosupport.jit.su/lib/prettyPhoto/prettyphoto.js"></script>'+'\n'
	//+'<script src="http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.js"></script>'+'\n'
	//+'<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.css" />'+'\n'
	+'<link rel="stylesheet" type="text/css" href="http://infosupport.jit.su/lib/prettyPhoto/prettyphoto.css">'+'\n'
	+'</head>'+'\n'
	+'<body>';

	return html;
};

Html.prototype.addFooter = function() {
	var html = '</body>'+'\n'
			   +'</html>'+'\n';
	return html;
};

Html.prototype.addJs = function() {
	var html = '<script>'+'\n'
				+'var socket = io.connect("http://" + window.location.host + "/");'+'\n'
				+' $(document).ready(function(){'+'\n'
				+'$("a[rel^=\'prettyPhoto\']\").prettyPhoto({'+'\n'
				+'default_width: 1000,'+'\n'
				+'default_height: 900,'
				+' });  });'+'\n'
				+'function save() {'+'\n'
				+'var html = "<html>"+$("html").html()+"</html>";'+'\n'
				+'var path = "."+window.location.pathname;'+'\n'
				+'socket.emit("save", path, html);'+'\n'
				+'console.log("saved");'+'\n'
				+'}'+'\n'
				+'</script>';
	return html;
};

Html.prototype.addListener = function() {
	var html = '<script>'+'\n'
				+'socket.on("open",function(type,data){'+'\n'
				+'if (type == "youtube"){'+'\n'
				+'$.prettyPhoto.open(data,"test","test");'+'\n'
				+'}'+'\n'
				+'else if(type == "close"){'+'\n'
				+'$.prettyPhoto.close();'+'\n'
				+'}'+'\n'
				+'});'+'\n'
				+'</script>'+'\n';
	return html;
};

Html.prototype.addEmitter = function() {
	var html = '<script>'+'\n'
				+'function emitter(type,data){'+'\n'
				+'socket.emit("open",type,data);'+'\n'
				+'}'+'\n'
				+'</script>'+'\n';
	return html;
};

Html.prototype.addButton = function(name,type,data) {
	var html = '<button id="'+name+'" class="buttons" onclick="emitter(\''+type+'\',\''+data+'\')">'+name+'</button>';
	var delButton = '<button class="delete">Delete</button>';
	console.log('created');
	return html+delButton;
	
};

Html.prototype.addDiv = function(id,content) {
	var start = '<div id="'+id+'">';
	var close = '</div>';
	var html = start+'\n'+content+'\n'+close+'\n';
	return html;
};


module.exports.Html = Html;
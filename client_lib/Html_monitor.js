/* Html class*/

var Html = function () {

};

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Html.prototype.addHeader = function() {
	var style = '<style>'+'\n'
	+'.buttongroup {'+'\n'
	+'position: relative;'+'\n'
	+'}'+'\n'
	+'.buttondel {'+'\n'
	+'position: absolute;'+'\n'
	+'top: -15px;'+'\n'
	+'left: z-index:1;'+'\n'
	+'}'+'\n'
	+'body {'+'\n'
	+'-webkit-background-size: cover;'+'\n'
	+'-moz-background-size: cover;'+'\n'
	+'-o-background-size: cover;'+'\n'
	+'background-size: cover;'+'\n'
	+'}'
	+'</style>';
	
	var html = '<html>'+'\n'
	+'<head>'+'\n'
	+'<script src="/socket.io/socket.io.js"></script>'+'\n'
	+'<script src="http://code.jquery.com/jquery-latest.min.js"></script>'+'\n'
	+'<script src="/prettyphoto/prettyphoto.js"></script>'+'\n'
	+'<link rel="stylesheet" type="text/css" href="/prettyphoto/prettyphoto.css">'+'\n'
	+style
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
	var html = '\n'+'<script>'+'\n'
				+'var socket = io.connect("http://" + window.location.host + "/");'+'\n'
				+' $(document).ready(function(){'+'\n'
				+'$("a[rel^=\'prettyPhoto\']\").prettyPhoto({'+'\n'
				+'default_width: 1000,'+'\n'
				+'default_height: 900,'+'\n'
				+' });'
				+'$("body").css("background-image","url(/Test/img0.jpg)");'
				+'});'+'\n'
				+'</script>';
	return html;
};

Html.prototype.addListener = function() {
	var html = '<script>'+'\n'
				+'socket.on("open",function(type,data){'+'\n'
				+'if (type == "youtube" || type == "text" || type == "dia"){'+'\n'
				+'$.prettyPhoto.open(data,"test","test");'+'\n'
				+'}'+'\n'
				+'else if(type == "close"){'+'\n'
				+'$.prettyPhoto.close();'+'\n'
				+'}'+'\n'
				+'else if(type == "presentation"){'+'\n'
				+'var img = "http://" + window.location.host+"/"+ data+"/img0.jpg";'+'\n'
				+'$.prettyPhoto.open(img,"test","test");'+'\n'
				+'}'+'\n'
				+'else if(type == "change_image"){'+'\n'
				+'var split_data = data.split("_");'+'\n'
				+'var presentation_id = split_data[0];'+'\n'
				+'var dia_id = split_data[1];'+'\n'
				+'var img = "http://" + window.location.host+"/"+ presentation_id+"/"+"img"+dia_id+".jpg";'+'\n'
				+'console.log(img);'+'\n'
				+'$.prettyPhoto.close();'+'\n'
				+'$.prettyPhoto.open(img,"test","test");'+'\n'
				+'}'+'\n'
				+'});'+'\n'
				+'</script>'+'\n';
	return html;
};

module.exports.Html = Html;
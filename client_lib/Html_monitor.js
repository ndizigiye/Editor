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
				+'social_tools:false,'+'\n'
				+'default_width: 1000,'+'\n'
				+'default_height: 900,'+'\n'
				+' });'
				+'if(available_presentations().length > 0){'+'\n'
				+'setBackground();'+'\n'
				+'}'+'\n'
				+'else{'+'\n'
				+'window.setTimeout(setBackground, 2000);'+'\n'
				+'}'+'\n'
				+'$("body").css("background-image","url(/Test/img0.jpg)");'
				+'});'+'\n'
				+'</script>';
	return html;
};

Html.prototype.addListener = function() {
	var html = '<script>'+'\n'
				+'socket.on("open",function(type,data){'+'\n'
				+'if (type == "youtube" || type == "text" || type == "dia"){'+'\n'
				+'$.prettyPhoto.open(data);'+'\n'
				+'}'+'\n'
				+'else if(type == "close"){'+'\n'
				+'$.prettyPhoto.close();'+'\n'
				+'}'+'\n'
				+'else if(type == "presentation"){'+'\n'
				+'var img = "http://" + window.location.host+"/"+ data+"/img0.jpg";'+'\n'
				+'$.prettyPhoto.open(img);'+'\n'
				+'}'+'\n'
				+'else if(type == "change_image"){'+'\n'
				+'var split_data = data.split("_");'+'\n'
				+'var presentation_id = split_data[0];'+'\n'
				+'var dia_id = split_data[1];'+'\n'
				+'var img = "http://" + window.location.host+"/"+ presentation_id+"/"+"img"+dia_id+".jpg";'+'\n'
				+'console.log(img);'+'\n'
				+'$.prettyPhoto.close();'+'\n'
				+'$.prettyPhoto.open(img);'+'\n'
				+'}'+'\n'
				+'});'+'\n'
				+'var array = []; // initializing array for @available_presentations'+'\n'
				+'function available_presentations(){'+'\n'
				+'var json = JSON.parse($("#configs").html());'+'\n'
				+'var ppt_name = json.ppt;'+'\n'
				+'var ppt_dir = \'./ppt/\' + ppt_name;'+'\n'
				+'socket.emit(\'search\', ppt_dir,'+'\n'
				+'function(dir) {'+'\n'
				+'array = dir.sort(function(a,b){'+'\n'
				+'a = a.split(/(\\\d+)/g);'+'\n'
				+'a = parseInt(a[1]);'+'\n'
				+'b = b.split(/(\\\d+)/g);'+'\n'
				+'b = parseInt(b[1]);'+'\n'
				+'return a-b});'+'\n'
				+'});'+'\n'
				+'console.log(array);'+'\n'
				+'return array;'+'\n'
				+'}'+'\n'
				+'//this set the background according to the given interval'+'\n'
				+'var i = 0; // i for retrieving the array @available_presentations'+'\n'
				+'function setBackground() {'+'\n'
				+'var presentation = available_presentations();'+'\n'
				+'var json = JSON.parse($("#configs").html());'+'\n'
				+'var ppt_name = json.ppt;'+'\n'
				+'var timer = json.timer * 1000; // multiply 1000 for milliseconds'+'\n'
				+'var ppt_dir = \'./ppt/\' + ppt_name;'+'\n'
				+'var image_src = \'/\' + ppt_name + \'/\' + presentation[i];'+'\n'
				+'console.log(image_src);'+'\n'
				+'$("body").css("background-image","url(" + image_src + ")");'+'\n'
				+'if(++i == (presentation.length+1))'+'\n'
				+'{'+'\n'
				+'i = 0;'+'\n'
				+'setBackground();'+'\n'
				+'return;'+'\n'
				+'} '+'\n'
				+'window.setTimeout(setBackground, timer);'+'\n'
				+'}'+'\n'
				+'</script>'+'\n';
	return html;
};

module.exports.Html = Html;
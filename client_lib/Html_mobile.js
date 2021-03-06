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
	+'</style>';
	
	var html = '<html>'+'\n'
	+'<head>'+'\n'
	+'<meta  name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />'+'\n'
	+'<script src="/socket.io/socket.io.js"></script>'+'\n'
	+'<script src="http://code.jquery.com/jquery-latest.min.js"></script>'+'\n'
	+'<script src="/prettyphoto/prettyphoto.js"></script>'+'\n'
	+'<script src="http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.js"></script>'+'\n'
	+'<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.css" />'+'\n'
	+'<link rel="stylesheet" type="text/css" href="/prettyphoto/prettyphoto.css">'+'\n'
	+style
	+'</head>'+'\n'
	+'<body>'+'\n'
	+' <div class="buttongroup">'+'\n'
 +'<a href="#" id="close" data-role="button" onclick="emitter(\'close\',\'\',game_id)" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c closebutton">'+'\n'
+'<span class="ui-btn-inner">'+'\n'
+'<span class="ui-btn-text">Sluiten</span>'+'\n'
+'</span></a>'+'\n'
+'</div>';

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
				+'var dia_id = 0;'+'\n'
				+'</script>';
	return html;
};


Html.prototype.addEmitter = function() {
	var html = '<script>'+'\n'
	+'$(document).ready(function(){'+'\n'
	+'if(navigator.userAgent.match(/iPad|iPhone|iPod|Android|webOS|BlackBerry|Windows Phone|Opera Mini|IEMobile/i) != null || screen.width <= 480){'+'\n'
	+'$(".buttondel").hide();'+'\n'
	+'}'+'\n'
	+'});'+'\n'
				+'var game_id = document.URL.split("/",5),game_id = game_id[4];'+'\n'
				+'function emitter(type,data,gameid){'+'\n'
				+'socket.emit("open",type,data,game_id);'+'\n'
				+'}'+'\n'
				+'function change_dia(type,element){'+'\n'

				+'if(type=="previous"){'+'\n'
				+'	dia_id--;'+'\n'
				+'	var button_onclick = $(element).next().attr("onclick");'+'\n'
				+'	var split_onclick = button_onclick.split("\'");'+'\n'
				+'	var data = split_onclick[3]+"_"+dia_id;'+'\n'
				+'	console.log(data);'+'\n'
				+'	emitter("change_image",data,game_id);'+'\n'
				+'}'+'\n'
				+'else{'+'\n'
				+'	dia_id++;'+'\n'
				+'	var button_onclick = $(element).prev().attr("onclick");'+'\n'
				+'	var split_onclick = button_onclick.split("\'");'+'\n'
				+'	var data = split_onclick[3]+"_"+dia_id;'+'\n'
				+'	console.log(data);'+'\n'
				+'	emitter("change_image",data,game_id);'+'\n'
				+'}'+'\n'
				+'}'+'\n'
				+'</script>'+'\n';
	return html;
};


module.exports.Html = Html;
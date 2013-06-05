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
	+'<script src="/socket.io/socket.io.js"></script>'+'\n'
	+'<script src="http://code.jquery.com/jquery-latest.min.js"></script>'+'\n'
	+'<script src="/prettyphoto/prettyphoto.js"></script>'+'\n'
	+'<script src="http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.js"></script>'+'\n'
	+'<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.css" />'+'\n'
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
				//+'$("body").append(<table><table>);'
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
				+'var img = "http://" + window.location.host+"/"+ data+"img0.jpg";'+'\n'
				+'$.prettyPhoto.open(img,"test","test");'+'\n'
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
	var parentDiv  = ["<div class='buttongroup'>","</div>"];
	var html = ' <a href="#" id="'+name+'" data-role="button" onclick="emitter(\''+type+'\',\''+data+'\')" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c buttons">'+'\n'
	+'<span class="ui-btn-inner">'+'\n'
	+'<span class="ui-btn-text">'+name+'</span>'+'\n'
	+'</span></a>'+'\n'
	var delButton = '<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" title="Delete" class="ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-btn-icon-notext buttondel"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>'+'\n';
	console.log('created');
	return parentDiv[0]+'\n'+html+delButton+parentDiv[1]+'\n';	
};

Html.prototype.addPresentationButton = function(name,data) {
	var parentDiv  = ["<div class='buttongroup'>","</div>"];
	var delButton = '<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" title="Delete" class="ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-btn-icon-notext buttondel"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>'+'\n';
	var html =  '<div data-role="controlgroup" data-type="horizontal" class="ui-corner-all ui-controlgroup ui-controlgroup-horizontal" aria-disabled="false" data-disabled="false" data-shadow="false" data-corners="true" data-exclude-invisible="true" data-mini="false" data-init-selector=":jqmData(role=\'controlgroup\')">'+'\n'
				+'<div class="ui-controlgroup-controls">'+'\n'
				+'<a href="#" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-first-child ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text">P</span></span></a>'+'\n'
				+'<a href="#" id="'+name+'" data-role="button" onclick="emitter(\'presentation\',\''+data+'\')" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-first-child ui-btn-up-c buttons"><span class="ui-btn-inner"><span class="ui-btn-text">'+name+'</span></span></a>'+'\n'
				+'<a href="#" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-first-child ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text">N</span></span></a>'+'\n'
				+'</div>'+'\n'
				+'</div>'+'\n'
	var delButton = '<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" title="Delete" class="ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-btn-icon-notext buttondel"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>'+'\n';
	console.log('created');
	return parentDiv[0]+'\n'+html+delButton+parentDiv[1]+'\n';	

};

Html.prototype.addDiv = function(id,content) {
	var start = '<div id="'+id+'">';
	var close = '</div>';
	var html = start+'\n'+content+'\n'+close+'\n';
	return html;
};


module.exports.Html = Html;
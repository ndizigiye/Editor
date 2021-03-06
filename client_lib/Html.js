/* Html class*/

var Html = function () {

};

Html.prototype.addButton = function(name,type,data,gameid) {
	var parentDiv  = ["<div class='buttongroup'>","</div>"];
	var html = ' <a href="#" id="'+name+'" data-role="button" onclick="emitter(\''+type+'\',\''+data+'\',\''+gameid+'\')" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c buttons">'+'\n'
	+'<span class="ui-btn-inner">'+'\n'
	+'<span class="ui-btn-text">'+name+'</span>'+'\n'
	+'</span></a>'+'\n'
	var delButton = '<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" title="Delete" class="ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-btn-icon-notext buttondel"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>'+'\n';
	console.log('created');
	return parentDiv[0]+'\n'+html+delButton+parentDiv[1]+'\n';	
};

Html.prototype.addCloseButton = function(gameid) {
	var parentDiv  = ["<div class='buttongroup'>","</div>"];
	var html = ' <a href="#" id="close" data-role="button" onclick="emitter(\'close\',\'\',\''+gameid+'\')" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c closebutton">'+'\n'
	+'<span class="ui-btn-inner">'+'\n'
	+'<span class="ui-btn-text">Sluiten</span>'+'\n'
	+'</span></a>'+'\n'
	console.log('created');
	return parentDiv[0]+'\n'+html+parentDiv[1]+'\n';	
};

Html.prototype.addPresentationButton = function(name,data,gameid) {
	var parentDiv  = ["<div class='buttongroup'>","</div>"];
	var delButton = '<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" title="Delete" class="ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-btn-icon-notext buttondel"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>'+'\n';
	var html =  '<div data-role="controlgroup" data-type="horizontal" class="ui-corner-all ui-controlgroup ui-controlgroup-horizontal" aria-disabled="false" data-disabled="false" data-shadow="false" data-corners="true" data-exclude-invisible="true" data-mini="false" data-init-selector=":jqmData(role=\'controlgroup\')">'+'\n'
				+'<div class="ui-controlgroup-controls">'+'\n'
				+'<a href="#" data-role="button" onclick="change_dia(\'previous\',this)" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-first-child ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"><=</span></span></a>'+'\n'
				+'<a href="#" id="'+name+'" data-role="button" onclick="emitter(\'presentation\',\''+data+'\',\''+gameid+'\')" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-first-child ui-btn-up-c buttons"><span class="ui-btn-inner"><span class="ui-btn-text">'+name+'</span></span></a>'+'\n'
				+'<a href="#" data-role="button" onclick="change_dia(\'next\',this)" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-first-child ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text">=></span></span></a>'+'\n'
				+'</div>'+'\n'
				+'</div>'+'\n'
	var delButton = '<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" title="Delete" class="ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-btn-icon-notext buttondel"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>'+'\n';
	console.log('created');
	return parentDiv[0]+'\n'+html+delButton+parentDiv[1]+'\n';	

};

Html.prototype.addDiv = function(id,content,style) {
	
	if(style){
		var start = '<div id="'+id+'" style="'+style+'">';
	}
	else{
		var start = '<div id="'+id+'">';
	}
	
	var close = '</div>';
	var html = start+'\n'+content+'\n'+close+'\n';
	return html;
};

module.exports.Html = Html;
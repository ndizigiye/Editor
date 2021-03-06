
	var socket = io.connect("http://" + window.location.host + "/");
	var gameid = "";
	var mobile_url = "";
	var monitor_url = "";
	var editor_content = "";
	


	function initiate() {
		var param = window.location.search.replace("?", "");
		param = param.split("=");
		gameid = param[1];
		mobile_url = "http://" + window.location.host + "/Games/" + gameid
				+ "/index.html";
		monitor_url = "http://" + window.location.host + "/Games/" + gameid
				+ "/monitor.html";

		if (gameid != null) {
			$('#mobile').attr("src", mobile_url);
			$('#monitor').attr("src", monitor_url);
		}
		
		$("#mobile_link").html("Mobile link <br><a href='"+mobile_url+"'>"+mobile_url+"</a><br><br>");
		$("#monitor_link").html("Monitor link <br><a href='"+monitor_url+"'>"+monitor_url+"</a><br><br>");
	}

	function save() {
		var html_start = "<html>";
		var html_close = "</html>";
		var html_mobile = $("#mobile").contents().find("html").html();
		var html_monitor = $("#monitor").contents().find("html").html();
		var path_mobile = './Games/Games/' + gameid + '/index.html';
		var path_monitor = './Games/Games/' + gameid + '/monitor.html';
		
		socket.emit("save", path_mobile, html_start+html_mobile+html_close);
		socket.emit("save", path_monitor, html_start+html_monitor+html_close);
	}

	function add(element) {
		var html = new Html();
		var latestbuttonID = $("#mobile").contents().find(".buttons").last().attr('id');
		if (latestbuttonID !== undefined){
		var latestbuttonNumber = latestbuttonID.split("_");
		var buttonid  = parseInt(latestbuttonNumber[1]) + 1;
		}
		else{
         var buttonid = 1;
		}
		var name = "button_" + buttonid;
		var button = html.addButton(name, 'youtube',
				'https://www.youtube.com/watch?v=f_SnZubaArM',gameid);
		$('#mobile').contents().find('div').first().append(button);
		save();
		setTimeout('reload("mobile")', 100);
	}
	
	function addCloseButton(){
		if(!$('#mobile').contents().find('#close').length){
		var html = new Html();
		$('#mobile').contents().find('body').prepend(html.addCloseButton(gameid));
		console.log('close added');
		}
	}
	
	function addButtonPresentation() {
		var html = new Html();
		var latestbuttonID = $("#mobile").contents().find(".buttons").last().attr('id');
		if (latestbuttonID !== undefined){
		var latestbuttonNumber = latestbuttonID.split("_");
		var buttonid  = parseInt(latestbuttonNumber[1]) + 1;
		}
		else{
         var buttonid = 1;
		}
		var name = "button_" + buttonid;
		var button = html.addPresentationButton(name,'Test',gameid);
		$('#mobile').contents().find('div').first().append(button);
		save();
		setTimeout('reload("mobile")', 100);
	}

	function reload(iframeid) {
		var iframe = document.getElementById(iframeid);
		iframe.src = iframe.src;
	}
	
	/**
	 * @param id the button id
	 * @param editorContent the content to insert into monitor.html
	 */
	function addMonitorText(id,editorContent){
		var html = new Html();
		var content = html.addDiv(id,editorContent,"display:none");
		$('#monitor').contents().find("#"+id).remove();
		$('#monitor').contents().find('body').append(content);
		save();
	}
	
	/**
	 * Retrieve name,type and content
	 * @param id
	 * @returns {Array}
	 */
	function getButtonProperties(id){
		var name = $("#mobile").contents().find("#"+id).text();
		name = $.trim(name);
		var onclick = $("#mobile").contents().find("#"+id).attr('onclick');
		var split_onclick = onclick.split("\'");
		var type = split_onclick[1];
		var content = split_onclick[3];
		var properties = [name,type,content];
		
		var url_content = $("#url").html();
		var text_content = $("#textarea").html();

		return properties;
	}
	
	/**
	 * Insert existing text to edit
	 * @param id
	 */
	function insertIntoEditor(id){
		var html = $('#monitor').contents().find("#" + id).html();
		html = $.trim(html);
		$('#msgpost').html(html);
	}
	
	/**
	 * Edit button properties
	 */
	function edit() {
		var selected = $("#type option:selected").val();
		var id = $("#id").val();
		var title = $("#name").val();
		var mobile_title = '<span class="ui-btn-inner">'+'\n'
						  +'<span class="ui-btn-text">'+title+'</span>'+'\n'
						  +'</span>';		
		
		

		if (selected == "youtube") {
			var content = $("#url_value").val();
			$('#mobile').contents().find("#" + id).attr("onclick",
					"emitter('youtube','" + content + "','"+gameid+"')");
		} else if(selected == "text") {
			var editor1 = CKEDITOR.instances['msgpost'];
			var editorContent = editor1.getData();
			var content = "#" + id;

			addMonitorText(id, editorContent);
			$('#mobile').contents().find("#" + id).attr("onclick",
					"emitter('text','" + content + "','"+gameid+"')");
		}
		else if(selected == "dia"){
			var content = $("#dia_value").val();
			$('#mobile').contents().find("#" + id).attr("onclick",
			"emitter('dia','" +content + "','"+gameid+"')");
		}
		else{
			var presentationid = $("#presentations").val();
			var content = "http://" + window.location.host +presentationid;
			$('#mobile').contents().find("#" + id).attr("onclick",
			"emitter('presentation','" +presentationid + "','"+gameid+"')");
		}
		$('#mobile').contents().find("#" + id).html(mobile_title);
		save();
		$( "#dialog" ).dialog( "close" );
	}
	
	/**
	 * Search available presentations and add it to options to choose from
	 * @returns {Array} available presentations
	 */
	function searchPpt() {
		var ppt_array = [];
		socket.emit('search','./ppt/', function(ppt) {
			ppt_array= ppt;
			
			for(var i in ppt_array){
				var option = "<option value=\""+ppt_array[i]+"\">"+ppt_array[i]+"</option>";
				$("#ppts").append(option);
				$("#presentations").append(option);
				$("#presentations1").append(option);
			}
			
		});
	
		return ppt_array;
	}
	
	function openPpt(){
		$("#images").empty();
		var pptid = $("#ppts").val();
		socket.emit('search','./ppt/'+pptid,function(images)
				{
					for (var i in images){
						$("#images").append("<img onclick=\"chooseImg(this.src)\" style=\"width:300px;padding:10px;margin:10px;border-style:solid;border-width:2px;\" src='"+pptid+"/"+images[i]+"'/>");
					}
				});
		$( "#images" ).dialog({ width: 1000});
	}
	
	function chooseImg(image_id){
		
		$("#dia_value").val(image_id);
		$( "#images" ).dialog("destroy");
	}
	
	/**
	 * Open the dialog to set the monitor configurations
	 */
	function setPresentation(){
		$( "#setppt" ).dialog();
	}
	/**
	 * Set the monitor configurations
	 * @returns void
	 */
	function saveMonitorConfig(){
		var presentation = $("#presentations1").val();
		var dia_timer = $("#dia_timer").val();
		$("#monitor").contents().find("#configs").html("{ \"ppt\":\""+presentation+"\", \"timer\" :"+dia_timer+"}");
		save();
		document.location.reload(true);
		$( "#setppt" ).dialog("close");
	}

	$(document).ready(
			function() {
				// when loading the mobile iframe
				$("#mobile").load(
						function() {
							$("#mobile").contents().find(".buttons").bind(
									"contextmenu", function(e) {
										e.preventDefault();
										var name = $("#mobile").contents().find("#"+this.id).text();
										var properties = getButtonProperties(this.id);
										$("#id").val(this.id);
										$("#name").val(properties[0]);
										var editor = CKEDITOR.instances['msgpost'];
									    if (editor) { editor.destroy(true); }
									    CKEDITOR.replace( 'msgpost', {
										    toolbar: 'Basic',
										    uiColor: '#9AB8F3'
										});
										if(properties[1] == "youtube"){
											var editor = CKEDITOR.instances['msgpost'];
											if (editor) { editor.destroy(true); }
											$("#msgpost").hide();
											$("#dia").hide();
											$( "#setppt" ).hide();
											$("#url").show();
											$("#url_value").val(properties[2]);
										}
										
										else if(properties[1] == "dia"){
											var editor = CKEDITOR.instances['msgpost'];
											if (editor) { editor.destroy(true); }
											$("#msgpost").hide();
											$("#url").hide();
											$( "#setppt" ).hide();
											$("#dia").show();
											$("#dia_value").val(properties[2]);
										}
										else if(properties[1] == "presentation"){
											var editor = CKEDITOR.instances['msgpost'];
											if (editor) { editor.destroy(true); }
											$("#msgpost").hide();
											$("#url").hide();
											$("#presentations").val(properties[2]);
											$("#dia").hide();
											$( "#setppt" ).hide();
											$("#ppt").show();
										}
										else{
											insertIntoEditor(this.id);
											$("#url").hide();
											$("#dia").hide();
											$( "#setppt" ).hide();
										}
										$("#type").val(properties[1]);
										$( "#dialog" ).dialog({ width: 750});
									});
							$("#mobile").contents().find(".buttondel").bind(
									"click", function(e) {
										//$(this).parent().prev().remove();
										$("#mobile").contents().find(".ui-loader").remove();
										$(this).parent().remove();
										save();
									});
						});
				
				//when loading the monitor frame
				$("#monitor").load(
						function() {
							var configs = $("#monitor").contents().find("#configs").html(), json = JSON.parse(configs);
							var ppt = json.ppt,timer = json.timer;
							$("#presentations1").val(ppt);
							$("#dia_timer").val(timer);
						});
						
				
				$("#type").change(function() {
					
					var text_content = $("#textarea").html();
					var value = $("select option:selected").val();
					if (value == "youtube") {
						$("#url").show();
						$("#dia").hide();
						$("#ppt").hide();
						$( "#setppt" ).hide();
						var editor = CKEDITOR.instances['msgpost'];
					    if (editor) { $("#cke_msgpost").hide(); }
					} else if(value == "text"){
						var editor = CKEDITOR.instances['msgpost'];
					    if (editor) { $("#cke_msgpost").show(); }
					    else{
					    CKEDITOR.replace( 'msgpost', {
						    toolbar: 'Basic',
						    uiColor: '#9AB8F3'
						});
					    }
						$("#url").hide();
						$("#dia").hide();
						$("#ppt").hide();
						$( "#setppt" ).hide();
						
					}
					
					else if(value == "dia"){
						$("#dia").show();
						$("#ppt").hide();
						$("#url").hide();
						$( "#setppt" ).hide();
						var editor = CKEDITOR.instances['msgpost'];
					    if (editor) { $("#cke_msgpost").hide(); }
					}
					else{
						$("#ppt").show();
						$("#dia").hide();
						$("#url").hide();
						$( "#setppt" ).hide();
						var editor = CKEDITOR.instances['msgpost'];
					    if (editor) { $("#cke_msgpost").hide(); }
					}
				}).trigger('change');
				
				$("#showing").bind(
						"click", function(e) {
							var editor1 = CKEDITOR.instances['msgpost'];
							console.log(editor1.getData());
						});
			});
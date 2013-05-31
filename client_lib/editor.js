
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
				'https://www.youtube.com/watch?v=f_SnZubaArM');
		$('#mobile').contents().find('body').append(button);
		save();
		setTimeout('reload("mobile")', 100);
	}

	function reload(iframeid) {
		var iframe = document.getElementById(iframeid);
		iframe.src = iframe.src;
	}
	
	function addMonitorText(id,editorContent){
		var html = new Html();
		var content = html.addDiv(id,editorContent);
		$('#monitor').contents().find("#"+id).remove();
		$('#monitor').contents().find('body').append(content);
		save();
	}
	
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
	
	function insertIntoEditor(id){
		var html = $('#monitor').contents().find("#" + id).html();
		html = $.trim(html);
		$('#msgpost').html(html);
	}

	function edit() {
		var selected = $("select option:selected").val();
		var id = $("#id").val();
		var title = $("#name").val();
		var mobile_title = '<span class="ui-btn-inner">'+'\n'
						  +'<span class="ui-btn-text">'+title+'</span>'+'\n'
						  +'</span>';		
		
		

		if (selected == "youtube") {
			var content = $("#url_value").val();
			$('#mobile').contents().find("#" + id).attr("onclick",
					"emitter('youtube','" + content + "')");
		} else {
			var editor1 = CKEDITOR.instances['msgpost'];
			var editorContent = editor1.getData();
			var content = "#" + id;

			addMonitorText(id, editorContent);
			$('#mobile').contents().find("#" + id).attr("onclick",
					"emitter('text','" + content + "')");
		}
		$('#mobile').contents().find("#" + id).html(mobile_title);
		save();
		$( "#dialog" ).dialog( "close" );
	}

	$(document).ready(
			function() {
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
											$("#url").show();
											$("#url_value").val(properties[2]);
										}
										else{
											insertIntoEditor(this.id);
											$("#url").hide();
										}
										$("select").val(properties[1]);
										$( "#dialog" ).dialog({ width: 750});
									});
							$("#mobile").contents().find(".buttondel").bind(
									"click", function(e) {
										$(this).parent().prev().remove();
										$(this).parent().remove();
										save();
									});
						});
				$("select").change(function() {
					
					var url_content = $("#url").html();
					var text_content = $("#textarea").html();
					var value = $("select option:selected").val();
					if (value == "youtube") {
						$("#url").show();
						$("#dia").hide();
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
						
					}
					
					else{
						$("#dia").show();
						$("#url").hide();
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
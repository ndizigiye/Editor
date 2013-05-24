		
		function splitmonitor(rows,cols) {
						// draw the table
						// track mouse press
						var isDown = false;

						$(document).mousedown(function() {
							isDown = true; // When mouse goes down, set isDown
											// to true
						}).mouseup(function() {
							isDown = false; // When mouse goes up, set isDown to
											// false
						});

						for ( var i = 0; i < rows; i++) {
							var tr = [ "<tr>", "</tr>" ];
							$("table").append(tr[0]);
							for ( var j = 0; j < cols; j++) {
								$("tr")
										.last()
										.append(
												"<td class='cell' id="+i+"_"+j+"></td>");
							}
							$("table").append(tr[1]);
						}

						// hover on a cell
						$('td').hover(function() {
							$(this).css("border", "1px solid #1A87B9");
						}, function() {
							$(this).css("border", "1px solid #FFFFFF");
						});

						// mark a cell
						$('.cell')
								.mousedown(
										function(e) {

											if ($(this).css("background-color") == "rgb(26, 135, 185)"
													&& e.which == 1) {
												$(this).css("background-color",
														"#FFFFFF");
											} else if (e.which == 1
													&& $(this).css(
															"background-color") != "rgb(26, 135, 185)") {
												$(this).css("background-color",
														"#1A87B9");
											}
										});

						// combine two or more cells
						$('.cell').bind(
								"contextmenu",
								function(e) {
									e.preventDefault();
									var td = $('tr').find('td');
									for ( var i in td) {
										var id = td[i].id;
										var background = $("#" + id).css(
												"background-color");
										if (background == "rgb(26, 135, 185)") {
											console.log(id);
											$("#setcell").dialog({
												width : 750
											});
										}
									}
								});
					}
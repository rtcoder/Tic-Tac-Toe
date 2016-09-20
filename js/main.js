var ox = {
		isGameEnd : false,
		emptyFields      : new Array()
	}

var a1, a2, a3, b1, b2, b3, c1, c2, c3;

function updateValues() {
	a1 = $("#a1").attr("data-val"),
	a2 = $("#a2").attr("data-val"),
	a3 = $("#a3").attr("data-val"),
	b1 = $("#b1").attr("data-val"),
	b2 = $("#b2").attr("data-val"),
	b3 = $("#b3").attr("data-val"),
	c1 = $("#c1").attr("data-val"),
	c2 = $("#c2").attr("data-val"),
	c3 = $("#c3").attr("data-val");
}

function computerMove() {
	updateValues();

	if (a1 == "" && ((a3 == "o" && a2 == "o") || (c3 == "o" && b2 == "o") || (c1 == "o" && b1 == "o"))) {
		set("a1", "o");
	}else{
		if (a2 == "" && ((a1 == "o" && a3 == "o") || (c2 == "o" && b2 == "o"))) {
			set("a2", "o");
		}else{
			if (a3 == "" && ((a1 == "o" && a2 == "o") || (c1 == "o" && b2 == "o") || (c3 == "o" && b3 == "o"))) {
				set("a3", "o");
			}else{
				if (c3 == "" && ((c1 == "o" && c2 == "o") || (a1 == "o" && b2 == "o") || (a3 == "o" && b3 == "o"))) {
					set("c3", "o");
				}else{
					if (c1 == "" && ((c3 == "o" && c2 == "o") || (a3 == "o" && b2 == "o") || (a1 == "o" && b1 == "o"))) {
						set("c1", "o");
					}else{
						if (c2 == "" && ((c3 == "o" && c1 == "o") || (a2 == "o" && b2 == "o"))) {
							set("c2", "o");
						}else{
							if (b1 == "" && ((b3 == "o" && b2 == "o") || (a1 == "o" && c1 == "o"))) {
								set("b1", "o");
							}else{
								if (b3 == "" && ((a3 == "o" && c3 == "o") || (b2 == "o" && b1 == "o"))) {
									set("b3", "o");
								}else{
									if (a1 == "" && ((a3 == "x" && a2 == "x") || (c3 == "x" && b2 == "x") || (c1 == "x" && b1 == "x"))) {
										set("a1", "o");
									}else{
										if (a2 == "" && ((a1 == "x" && a3 == "x") || (c2 == "x" && b2 == "x"))) {
											set("a2", "o");
										}else{
											if (a3 == "" && ((a1 == "x" && a2 == "x") || (c1 == "x" && b2 == "x") || (c3 == "x" && b3 == "x"))) {
												set("a3", "o");
											}else{
												if (c3 == "" && ((c1 == "x" && c2 == "x") || (a1 == "x" && b2 == "x") || (a3 == "x" && b3 == "x"))) {
													set("c3", "o");
												}else{
													if (c1 == "" && ((c3 == "x" && c2 == "x") || (a3 == "x" && b2 == "x") || (a1 == "x" && b1 == "x"))) {
														set("c1", "o");
													}else{
														if (c2 == "" && ((c3 == "x" && c1 == "x") || (a2 == "x" && b2 == "x"))) {
															set("c2", "o");
														}else{
															if (b1 == "" && ((b3 == "x" && b2 == "x") || (a1 == "x" && c1 == "x"))) {
																set("b1", "o");
															}else{
																if (b3 == "" && ((a3 == "x" && c3 == "x") || (b2 == "x" && b1 == "x"))) {
																	set("b3", "o");
																}else{
																	if (b2 == "" && ((a3 == "x" && c1 == "x") || (c3 == "x" && a1 == "x") || (b3 == "x" && b1 == "x") || (c2 == "x" && a2 == "x"))) {
																		set("b2", "o");
																	}else{
																		if (b2 == "") {
																			set("b2", "o");
																		}else{
																			if (a1 == "") {
																				set("a1", "o");
																			}else{
																				if (c3 == "") {
																					set("c3", "o");
																				}else {
																					if (c2 == "") {
																						set("c2", "o");
																					}else{
																						if (b1 == "") {
																							set("b1", "o");
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

function set(id, val) {
	$("#"+id)
		.attr("data-val", val)
		.text(val)
		.removeAttr("data-clicked");
}

function spr(){
	updateValues();

	if(a1 === a2 && a1 === a3 && !ox.isGameEnd){
		finish(a1,"a1","a2","a3");
	}

	if(b1 === b2 && b1 === b3 && !ox.isGameEnd){
		finish(b1,"b1","b2","b3");
	}

	if(c1 === c2 && c1 === c3 && !ox.isGameEnd){
		finish(c1,"c1","c2","c3");
	}

	if(a1 === b1 && a1 === c1 && !ox.isGameEnd){
		finish(a1,"a1","b1","c1");
	}

	if(a2 === b2 && a2 === c2 && !ox.isGameEnd){
		finish(a2,"a2","b2","c2");
	}

	if(a3 === b3 && a3 === c3 && !ox.isGameEnd){
		finish(a3,"a3","b3","c3");
	}

	if(a1 === b2 && a1 === c3 && !ox.isGameEnd){
		finish(a1,"a1","b2","c3");
	}

	if(a3 === b2 && c1 === b2 && !ox.isGameEnd){
		finish(a3,"a3","b2","c1");
	}
}

function finish(result, n1, n2, n3){
	if(result != ""){
		switch(result){
			case "x":
				$("#"+n1+", #"+n2+", #"+n3).css("color","#4E9A06");
			break;
			case "o":
				$("#"+n1+", #"+n2+", #"+n3).css("color","#CC0000");
			break;
			case "none":
				$("[data-val=x]").css("color","#4E9A06");
				$("[data-val=o]").css("color","#CC0000");
			break;
		}

		ox.isGameEnd = true;
	}
}

function start() {
	$(".box")
		.attr("data-clicked","noclicked")
		.attr("data-val","")
		.text("")
		.css("color","#737373");

	ox.isGameEnd   = false;
	ox.emptyFields = new Array();
}


function elementClick(element){
	var status = $(element).attr("data-clicked"),
		id     = $(element).attr("id");

	if(status === "noclicked" && !ox.isGameEnd){
		set($(element).attr("id"), "x");

		ox.emptyFields = new Array();

		$(".box[data-val=]").each(function(){
			ox.emptyFields.push($(element).attr("id"));
		});

		spr();

		if(!ox.isGameEnd){
			computerMove();
			spr();
		}

		if(ox.emptyFields.length == 0 && !ox.isGameEnd){
			finish("none");
		}
	}else{
		return false;
	}
}


$(document).ready(function(){
	start();

	$("#new").click(function(){
		start();
	});

	$(".box").click(function(){
		elementClick($(this));
	}).on('touchstart', function(){
		elementClick($(this));
	});
});

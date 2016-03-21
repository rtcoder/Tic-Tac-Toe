var ox = {
		sprawdzone : false,
		klikniecia : 0,
		nacisniete : new Array(),
		wolne      : new Array()
	}

function spr(){
	var b1 = $("#1").attr("dane"),
		b2 = $("#2").attr("dane"),
		b3 = $("#3").attr("dane"),
		b4 = $("#4").attr("dane"),
		b5 = $("#5").attr("dane"),
		b6 = $("#6").attr("dane"),
		b7 = $("#7").attr("dane"),
		b8 = $("#8").attr("dane"),
		b9 = $("#9").attr("dane");

	if(b1 === b2 && b1 === b3 && !ox.sprawdzone){
		finish(b1,"1","2","3");
	}

	if(b4 === b5 && b4 === b6 && !ox.sprawdzone){
		finish(b4,"4","5","6");
	}

	if(b7 === b8 && b7 === b9 && !ox.sprawdzone){
		finish(b7,"7","8","9");
	}

	if(b1 === b4 && b1 === b7 && !ox.sprawdzone){
		finish(b1,"1","4","7");
	}

	if(b2 === b5 && b2 === b8 && !ox.sprawdzone){
		finish(b2,"2","5","8");
	}

	if(b3 === b6 && b3 === b9 && !ox.sprawdzone){
		finish(b3,"3","6","9");
	}

	if(b1 === b5 && b1 === b9 && !ox.sprawdzone){
		finish(b1,"1","5","9");
	}

	if(b3 === b5 && b7 === b5 && !ox.sprawdzone){
		finish(b3,"3","5","7");
	}
}

function finish(result, n1, n2, n3){
	switch(result){
		case "x":
			$("#"+n1+", #"+n2+", #"+n3).css("color","#4E9A06");
			$(".box").removeAttr("status");

			ox.sprawdzone = true;
		break;
		case "o":
			$("#"+n1+", #"+n2+", #"+n3).css("color","#CC0000");
			$(".box").removeAttr("status");

			ox.sprawdzone = true;
		break;
		case "none":
			$("[dane=x]").css("color","#4E9A06");
			$("[dane=o]").css("color","#CC0000");
			$(".box").removeAttr("status");

			ox.sprawdzone = true;
		break;
	}
}

$(document).ready(function(){
	$("#new, #napis").click(function(){
		$("#close").click().show();
		$("#napis").hide();
		$(".box")
			.hide()
			.fadeIn()
			.attr("status","noclicked")
			.attr("dane","")
			.removeClass("fa fa-circle-o")
			.removeClass("fa fa-times")
			.css("color","#000");
		$("#new").text("Again");

		ox.nacisniete = [ ];
		ox.klikniecia = 0;
		ox.wolne      = [ ];

		$(".box[dane=]").each(function(){
			ox.wolne.push($(this).attr("id"));
		});

		var ilewtablicy = ox.wolne.length - 1,
			losowyindex = Math.floor(Math.random()*ilewtablicy),
			losowy      = ox.wolne[losowyindex];

		$("#"+losowy).addClass("fa fa-circle-o").attr("dane","o").removeAttr("status");

		ox.nacisniete.push(losowy);
	});

	$("#close").click(function(){
		$(".box")
			.attr("status","noclicked")
			.attr("dane","")
			.removeClass("fa fa-circle-o")
			.removeClass("fa fa-times")
			.css("color","#000");
		$("#napis").show();
		$("#close, .box").hide();
		$("#new").text("New Game");

		ox.klikniecia = 0;
	});

	$(".box").click(function(){
		var status = $(this).attr("status"),
			id     = $(this).attr("id");

		ox.sprawdzone = false;

		if(status === "noclicked"){
			ox.klikniecia++;

			ox.nacisniete.push(id);

			$(this).addClass("fa fa-times").attr("dane","x").removeAttr("status");

			ox.wolne = [ ];

			$(".box[dane=]").each(function(){
				ox.wolne.push($(this).attr("id"));
			});

			spr();

			if(!ox.sprawdzone){
				var ilewtablicy = ox.wolne.length,
					losowyindex = Math.floor(Math.random() * (ilewtablicy - 1)),
					losowy      = ox.wolne[losowyindex];

				$("#"+losowy).addClass("fa fa-circle-o").attr("dane","o").removeAttr("status");

				ox.nacisniete.push(losowy);

				spr();
			}

			if(ox.klikniecia >= 4 && !ox.sprawdzone){
				finish("none");
			}
		}else{
			return false;
		}
	});
});

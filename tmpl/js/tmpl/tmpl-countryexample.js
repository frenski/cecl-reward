/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	const flagEl = document.getElementById('lt-flag');
	const flagElJQ = $("#lt-flag");
	const flagEl2 = document.getElementById('lt-flag2');
	const flagElJQ2 = $("#lt-flag2");
	const flagEl3 = document.getElementById('lt-flag3');
	const flagElJQ3 = $("#lt-flag3");

	$.getJSON("img/lottie/flag/data.json", function(dat) {
    // console.log(dat.assets);
		dat.assets.forEach(function(item, i) {
			if (item.file=="layer_1.png" || item.file=="layer_4.png") {
				item.src = "img/lottie/flag/images/" + tParams.country + "/";
				item.u = "img/lottie/flag/images/" + tParams.country + "/";
			} else {
				item.src = "img/lottie/flag/images/";
				item.u = "img/lottie/flag/images/";
			}
		});

		const flagAnim = lottie.loadAnimation({
			container: flagEl,
			renderer: 'svg',
			loop: true,
			autoplay: false,
			animationData: dat,
			initialSegment:[0,540]
		});
		flagAnim.playSegments([[0,540],[135,540]],true);
	});

	if (tParams.hasOwnProperty("countrytwo")) {
		$.getJSON("img/lottie/flag/data.json", function(dat2) {
			// console.log(dat.assets);
			dat2.assets.forEach((item, i) => {
				if (item.file=="layer_1.png" || item.file=="layer_4.png") {
					item.src = "img/lottie/flag/images/" + tParams.countrytwo + "/";
					item.u = "img/lottie/flag/images/" + tParams.countrytwo + "/";
				} else {
					item.src = "img/lottie/flag/images/";
					item.u = "img/lottie/flag/images/";
				}
			});

			const flagAnim2 = lottie.loadAnimation({
				container: flagEl2,
				renderer: 'svg',
				loop: true,
				autoplay: false,
				animationData: dat2,
				initialSegment:[0,540]
			});

			setTimeout(function(){
				flagAnim2.playSegments([[0,540],[135,540]],true);
			}, 1000);

		});
	}

	if (tParams.hasOwnProperty("countrythree")) {
		$.getJSON("img/lottie/flag/data.json", function(dat3) {
			// console.log(dat.assets);
			dat3.assets.forEach((item, i) => {
				if (item.file=="layer_1.png" || item.file=="layer_4.png") {
					item.src = "img/lottie/flag/images/" + tParams.countrythree + "/";
					item.u = "img/lottie/flag/images/" + tParams.countrythree + "/";
				} else {
					item.src = "img/lottie/flag/images/";
					item.u = "img/lottie/flag/images/";
				}
			});

			const flagAnim3 = lottie.loadAnimation({
				container: flagEl3,
				renderer: 'svg',
				loop: true,
				autoplay: false,
				animationData: dat3,
				initialSegment:[0,540]
			});

			setTimeout(function(){
				flagAnim3.playSegments([[0,540],[135,540]],true);
			}, 2000);

		});
	}


	// flagAnim.play();


	yLearnTmpl.setBackground( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	$('#theimage').load(function(){
		yLearnTmpl.pageResized();
	});

	yLearnTmpl.loadPage();

});

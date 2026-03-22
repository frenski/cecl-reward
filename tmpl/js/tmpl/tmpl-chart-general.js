/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	for (var i=0; i<tParams.series.length; i++) {
		$("#admin-hidden").append('<div><span id="content_text_data_'+i+'" class="edit-text"></span></div>');
	}

	if (tParams.hasOwnProperty('xaxis') ) {
		for (var i=0; i<tParams.xaxis.categories.length; i++) {
			$("#admin-hidden").append('<div><span id="content_text_x_'+i+'" class="edit-text"></span></div>');
		}
	}

	yLearnTmpl.loadPage(function(){
		for (var i=0; i<tParams.series.length; i++) {
			tParams.series[i].name = $("#content_text_data_"+i).text();
		}

		if (tParams.hasOwnProperty('xaxis') ) {
			for (var i=0; i<tParams.xaxis.categories.length; i++) {
				tParams.xaxis.categories[i] = $("#content_text_x_"+i).text();
			}
		}

		// var options_ = {
		//   chart: {
		//     type: tParams.chartType,
		// 		toolbar: {show: false},
		// 		foreColor: '#fff',
		// 		events: {
		// 			mounted: function(chartContext, config) {
		// 				yLearnTmpl.pageResized();
		// 			}
		// 		},
		// 		animations: {
		// 			enabled: true,
		// 			easing: 'easeout',
		// 			speed: 2500,
		// 			animateGradually: {
		// 					enabled: true,
		// 					delay: 1000
		// 			},
		// 			dynamicAnimation: {
		// 					enabled: true,
		// 					speed: 750
		// 			}
		// 		}
		//   },
		//   series: tParams.series,
		//   xaxis: tParams.xaxis,
		// 	yaxis: tParams.yaxis,
		// 	colors: tParams.colors,
		// 	grid: {
		// 		borderColor: tParams.borderColor
		// 	}
		// }

		let series =  JSON.parse(JSON.stringify(tParams)).series;

		var options = {
			chart: {
		    type: tParams.chartType,
				toolbar: {show: false},
				foreColor: '#fff',
				events: {
					mounted: function(chartContext, config) {
						yLearnTmpl.pageResized();
					}
				},
				animations: {
					enabled: true,
					easing: 'easeout',
					speed: 2500,
					animateGradually: {
							enabled: true,
							delay: 1000
					},
					dynamicAnimation: {
							enabled: true,
							speed: 750
					}
				}
		  },
				series: series,
        xaxis: tParams.xaxis,
        yaxis: tParams.yaxis,
				colors: tParams.colors,
				grid: {
					borderColor: tParams.borderColor
				}
    };



		var chart = new ApexCharts(document.querySelector("#thechart"), options);

		chart.render();

	});

});

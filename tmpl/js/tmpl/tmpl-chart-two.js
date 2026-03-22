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

	let chParams1 = JSON.parse(JSON.stringify(tParams)).chart1;
	let chParams2 = JSON.parse(JSON.stringify(tParams)).chart2;

	for (var i=0; i<chParams1.series.length; i++) {
		$("#admin-hidden").append('<div><span id="content_text_data_1_'+i+'" class="edit-text"></span></div>');
	}
	for (var i=0; i<chParams1.xaxis.categories.length; i++) {
		$("#admin-hidden").append('<div><span id="content_text_x_1_'+i+'" class="edit-text"></span></div>');
	}

	for (var i=0; i<chParams2.series.length; i++) {
		$("#admin-hidden").append('<div><span id="content_text_data_2_'+i+'" class="edit-text"></span></div>');
	}
	for (var i=0; i<chParams2.xaxis.categories.length; i++) {
		$("#admin-hidden").append('<div><span id="content_text_x_2_'+i+'" class="edit-text"></span></div>');
	}


	yLearnTmpl.loadPage(function(){
		for (var i=0; i<chParams1.series.length; i++) {
			chParams1.series[i].name = $("#content_text_data_1_"+i).text();
		}
		for (var i=0; i<chParams1.xaxis.categories.length; i++) {
			chParams1.xaxis.categories[i] = $("#content_text_x_1_"+i).text();
		}

		for (var i=0; i<chParams2.series.length; i++) {
			chParams2.series[i].name = $("#content_text_data_2_"+i).text();
		}
		for (var i=0; i<chParams2.xaxis.categories.length; i++) {
			chParams2.xaxis.categories[i] = $("#content_text_x_2_"+i).text();
		}

		let options1 = {
		  chart: {
		    type: chParams1.chartType,
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
		  series: chParams1.series,
		  xaxis: chParams1.xaxis,
			yaxis: chParams1.yaxis,
			colors: chParams1.colors,
			grid: {
				borderColor: chParams1.borderColor
			}
		}


		let options2 = {
		  chart: {
		    type: chParams2.chartType,
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
		  series: chParams2.series,
		  xaxis: chParams2.xaxis,
			yaxis: chParams2.yaxis,
			colors: chParams2.colors,
			grid: {
				borderColor: chParams2.borderColor
			}
		}

		var chart1 = new ApexCharts(document.querySelector("#thechart1"), options1);
		chart1.render();

		var chart2 = new ApexCharts(document.querySelector("#thechart2"), options2);
		chart2.render();

	});

});

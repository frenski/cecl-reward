/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	var conf = {
		'zoom': 2,
		'center': [25, 10]
	}

	console.log(tParams);

	if (tParams.hasOwnProperty('zoom')) {
		conf.zoom = tParams.zoom;
	}

	if (tParams.hasOwnProperty('center')) {
		conf.center = tParams.center;
	}

	const arrEl = document.getElementById('lt-player-arrow');
	const arrElJQ = $("#lt-player-arrow");

	const arrowAnim = lottie.loadAnimation({
		container: arrEl,
		renderer: 'svg',
		loop: true,
		autoplay: false,
		path: 'img/lottie/dot-arrow-click-'+tParams.theme+'.json',
		initialSegment:[0,40]
	});


	// Presets

	// ("#section-footnote").hide();

	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	for (var i=0; i<tParams.pins.length; i++) {
		var pin = tParams.pins[i];
		$("#admin-hidden").append('<div><span id="content_text_'+countriesList[pin.country].short+'" class="edit-text"></span></div>')
	}

	yLearnTmpl.loadPage(function(){
		initializeMap(tParams.pins, tParams.theme, conf);
		arrowAnim.play();
		arrElJQ.click(function(){
			arrowAnim.loop = false;
			arrowAnim.playSegments([41,114], true);
			setTimeout(function () {
				$("#section-footnote").fadeIn();
			}, 1100);
		});
	});


});


var markers = [];
var map;
var infoWindow = [];
var mapData = {};
var mapDomEl = "section-map-map";


function addMarkers(theme){

  // Clearing the old markers
  for( var i=0; i<markers.length; i++ ){
    markers[i].setMap(null);
  }

  markers.length = 0;

  var dat = mapData;

	// generating the new markers and the corresponding info windows
  for( var i=0; i<dat.length; i++ ){

    var cLatlng = new google.maps.LatLng(
                        countriesList[dat[i].country].lat,
                        countriesList[dat[i].country].lng);
	dat[i].mainText = $("#content_text_"+countriesList[dat[i].country].short).html();

	var markerImage = {
	  url: "img/icons/map-pin-"+theme+".png",
	  size: new google.maps.Size(32, 32),
	  origin: new google.maps.Point(0, 0),
	  anchor: new google.maps.Point(16, 32),
	  scaledSize: new google.maps.Size(32, 32)
	};

    // Adding each marker
    markers.push(
      new google.maps.Marker({
        position: cLatlng,
        map: map,
        title: dat[i].country,
				icon: markerImage,
				label:countriesList[dat[i].country].short,
				labelClass: "map-pin-label",
        animation: google.maps.Animation.DROP
      })
    );

		// Adding the info windows
	  infoWindow[i] = new google.maps.InfoWindow({
	      content: '<div class="map-countryinfo"><div class="map-countryinfo-title">'+
								  dat[i].country+'</div><div class="map-countryinfo-desc">'+
									dat[i].mainText+'</div></div>'
            ,boxStyle: {
                background: "#ff6146"
                    ,opacity: 0.75
                     ,width: "280px"
	    }
	  });


    google.maps.event.addListener(markers[i], 'click', function( cId ){
      return function(){
        infoWindow[cId].open(map,markers[cId]);
				$('#section-footnote').hide();
      }
    }(i));

  }

}


function initializeMap(pins, theme, conf) {

	console.log(conf);

  var mapOptions = {
    center: new google.maps.LatLng( conf.center[0], conf.center[1]),
    zoom: conf.zoom,
    maxZoom: 10,
    scrollwheel : false,
    panControl: false,
    streetViewControl: false,
    mapTypeControl: false,
		backgroundColor: '#363636'
  };

  map = new google.maps.Map(document.getElementById(mapDomEl), mapOptions);

  var styles = [
      { "featureType": "water", "stylers": [ { "visibility": "on" }, { "color": "#363636" } ] },
      { "featureType": "water", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] },
      { "featureType": "landscape.natural", "stylers": [ { "color": "#61525e" }, { "visibility": "on" } ] },
      { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "visibility": "on" }, { "color": "#000000" }, { "weight": 0.8 } ] },
 			{ "elementType": "labels", "stylers": [ { "visibility": "off" } ] },
      { "featureType": "administrative.province", "stylers": [ { "visibility": "off" } ] },
      { "featureType": "administrative.locality", "stylers": [ { "visibility": "off" } ] },
      { "featureType": "poi", "stylers": [ { "visibility": "off" } ] },
      { "featureType": "road", "stylers": [ { "visibility": "off" } ] },
      { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }
  ];

	// setting the styles
	map.setOptions({styles: styles});

	// updating the markers
	mapData = pins;
	addMarkers(theme);

}

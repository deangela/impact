var map;
function initialize() {
	var mapOptions = {
		center: { lat: 20, lng: 0},
		zoom: 2,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeControl: false,
  		zoomControl: true,
    	zoomControlOptions: {
     	 	style: google.maps.ZoomControlStyle.SMALL,
     	 	position: google.maps.ControlPosition.BOTTOM_CENTER
    	},
    	panControl: true,
    	panControlOptions: {
    		position: google.maps.ControlPosition.BOTTOM_CENTER,
    	}

	};

	var map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);


	var styles = [

	{
		stylers: [
      //{ hue: "#ffffff" },
      { saturation: -100 }
      ]
  },{
  	featureType: "road",
  	elementType: "all",
  	stylers: [
  	{ visibility: "off" }
  	]
  },{
     featureType: "administrative",
     elementType: "geometry.fill",
     stylers: [
        { visibility: "off" }
     ]
   },{
  	featureType: "administrative",
  	elementType: "labels",
  	stylers: [
  	{visibility: "off"}
  	]
  },{
  	featureType: "administrative",
  	elementType: "geometry.stroke",
  	stylers: [
  	{color: "#dedede"}
  	]
  },{
  	featureType: "administrative.province",
  	elementType: "all",
  	stylers: [
  	{ visibility: "off" }
  	]
  },{
  	featureType: "transit",
  	elementType: "all",
  	stylers: [
  	{ visibility: "off" }
  	]
  },{
  	featureType: "water",
  	elementType: "geometry.fill",
  	stylers: [
  	{color: "#000000"}
  	]
  },{
  	featureType: "water",
  	elementType: "labels",
  	stylers: [
  	{visibility: "off"}
  	]
  },{
  	featureType: "poi",
  	elementType: "all",
  	stylers: [
  	{visibility: "off"}
  	]
  },{
  	featureType: "landscape",
  	elementType: "labels",
  	stylers: [
  	{visibility: "off"}
  	]
  },{
  	featureType: "landscape",
  	elementType: "geometry",
  	stylers: [
  	{lightness: 60}
  	]
  }
  ];

  map.setOptions({styles: styles});
}



google.maps.event.addDomListener(window, 'load', initialize);
		// google.maps.event.addDomListener(window, "resize", function() {
		// 	var center = map.getCenter();
		// 	google.maps.event.trigger(map, "resize");
		// 	map.setCenter(center); 
		// });


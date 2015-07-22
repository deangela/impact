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

  var infowindow = new google.maps.InfoWindow({
    content: '',
    // position: { lat: 20, lng: 0},
  });
  infowindow.close(map);




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




   // map.data.loadGeoJson('https://storage.googleapis.com/maps-devrel/google.json');
   var data = {
    "type": "FeatureCollection",
    "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Aachen",
        "year": "1880",
        "location": "Nordrhein-Westfalen, Germany",
        "mass": "21 g",
        "metType": "L5",
        "lat": 50.775000,
        "long": 6.083330
      },
      "geometry": {
        "type": "Point", "coordinates": [6.083330, 50.775000]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Aarhus",
        "year": "1951",
        "location": "Region Midtjylland, Denmark",
        "mass": "720 g",
        "metType": "H6",
        "lat": 56.183330,
        "long": 10.233330
      },
      "geometry": {
        "type": "Point", "coordinates": [10.233330, 56.183330]
      }
    }
    ]
  };

  map.data.addGeoJson(data);

   // Set mouseover event for each feature.
   map.data.addListener('mouseover', function(event) {
    infowindow.open(map);
    var infoName = String(event.feature.getProperty('name'));
    var infoLocation = String(event.feature.getProperty('location'));
    var infoYear = String(event.feature.getProperty('year'));
    var infoMass = String(event.feature.getProperty('mass'));
    var infoType = String(event.feature.getProperty('metType'));
    var information = infoName.concat("<br>" + infoLocation + "<br>" + infoYear + "<br>" + infoMass + "<br>" + infoType);
    infowindow.setContent(information);
    var infoLat = event.feature.getProperty('lat') + 10;
    var infoLong = event.feature.getProperty('long');
    infowindow.setPosition({ lat: infoLat, lng: infoLong });
  });

   map.data.addListener('mouseout', function(event) {
    infowindow.close(map);
  });



 }


 google.maps.event.addDomListener(window, 'load', initialize);
		// google.maps.event.addDomListener(window, "resize", function() {
		// 	var center = map.getCenter();
		// 	google.maps.event.trigger(map, "resize");
		// 	map.setCenter(center); 
		// });



//INFO BOX HOVER
$(function() {
  $('.hover').hover(function(){
    var popup_div = $('#info-box');
    var obj = $(this);
    var offset = obj.offset();

    var new_top = offset.top + 30;

    var new_left = offset.left;

    new_left = new_left - ( popup_div.width() / 2);
    new_left = new_left + ( obj.width() / 2);

    popup_div.css('left', new_left + 'px');
    popup_div.css('top', new_top + 'px');

    popup_div.show();
  }
  , function (){
        //hovered away so hide popup
        $('#info-box').hide();
      }
      );
});


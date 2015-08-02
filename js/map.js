var first_layer = 'd3_world_borders';

var sql = new cartodb.SQL({ user: 'viz2', format: 'geojson', dp: 5});

var circleMass = 1;
var circleYear = 1;
var circleName = 1;
var circleLocation = 1;
var circleType = 1;
var circleLat = 1;
var circleLong = 1;


// Define our SVG element outside our SQL functions
var svg = d3.select("#map-container")
.append("svg")
.append("g");

// Our projection.
var xy = d3.geo.mercator();
xy.scale(225);
xy.center([0,0]);

var mapMarginTop = 175;
var mapMarginLeft = 155;

svg.append("g").attr("id", "first_layer");

var path = d3.geo.path();

sql.execute("SELECT ST_Simplify(the_geom,0.01) as the_geom FROM {{table_name}} WHERE the_geom IS NOT NULL", {table_name: first_layer})
.done(function(collection) {
  svg.select("#first_layer")
  .selectAll("path")
  .data(collection.features)
  .enter().append("path")
  .attr("d", path.projection(xy))
  .attr("transform", "translate("  + mapMarginLeft + "," + mapMarginTop + ")");
})
.error(function(errors) {
    // console.log('Errors! Oh no!')
  });

sql = new cartodb.SQL({ user: 'annekagoss', format: 'geojson', dp: 5});

var meteors;
sql.execute("SELECT the_geom, year, mass, name, please, type, lat, long FROM {{table_name}} WHERE the_geom IS NOT NULL ORDER BY year ASC", {table_name: 'meteor_data_clean_2'})
.done(function(collection) {
  meteors = collection.features;
  meteorShower();
});




var i = 0;
function meteorShower() {
  var c = meteors[i];


  //* CIRCLES *//
  svg.append("circle")
    //* fly in animation setup  *//
    .attr("transform", "translate("  + mapMarginLeft + "," + mapMarginTop + ")")
    .attr("cy", function(){ return xy([0,Math.random()*180.0-90])[1]})
    .attr("cx", function(){ return xy([Math.random()*360.0-180,0])[0]})
    .attr("d", path.projection(xy))
    .attr("r", 1)
    .style("fill", "red")
    .style("fill-opacity", 0.05)
    .style("stroke", "red")
    .style("stroke-opacity", 0.5)

    



    //* fly in animation *//
    .transition()
    .ease("exp")
    .attr("cy", function(d){ return xy(c.geometry.coordinates)[1] })
    .attr("cx", function(d){ return xy(c.geometry.coordinates)[0] })


    //* explode animation *//
    .duration(800)
    .ease("exp")
    
    .attr("r", circleMass * 0.00025+1)

    .attr("id", circleMass)
    .attr("alt", circleYear)
    .attr("class", circleName)
    .attr("font-family", circleLocation)
    .attr("font-size", circleType)
    .attr("line-height", circleLat)
    .attr("font-weight", circleLong)




  // //* LABELS *//
  // svg.append("text")

  //   .text( function (d) { return "text shit"; })
  //   .attr("transform", "translate("  + mapMarginLeft + "," + mapMarginTop + ")")
  //   .attr("y", function(d){ return xy(c.geometry.coordinates)[1] })
  //   .attr("x", function(d){ return xy(c.geometry.coordinates)[0] })


  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", ".5em")
  //   .attr("fill", "white")

  // var w = -50;



    $('svg circle').tipsy({ 
      gravity: 's', 
      html: true, 
      fade: true,
      // title: function() {
      //   return circleMass;
      // }
      title: function() { 
          return "Name:" + " " + this.getAttribute('class') + "<br/>"
          + "Year:" + " " + this.getAttribute('alt') + "<br/>" 
          + "Mass:" + " " + this.getAttribute('id') + " g" + "<br/>"
          + "Location:" + " " + this.getAttribute('font-family') + "<br/>"
          + "Type:" + " " + this.getAttribute('font-size') + "<br/>"
          + "Latitude:" + " " + this.getAttribute('line-height') + "<br/>"
          + "Longitude:" + " " + this.getAttribute('font-weight')
          ;

        }
    });


  






  
  setTimeout(meteorShower, 200);

  i++;
  // console.log(i);

  circleYear = c.properties.year
  circleMass = c.properties.mass
  circleName = c.properties.name
  circleLocation = c.properties.please
  circleType = c.properties.type
  circleLat = c.properties.lat
  circleLong = c.properties.long


  if (circleMass.indexOf(" kg") > -1){
    circleMass = Number(circleMass.replace(" kg", ""))*1000;
  } else if (circleMass.indexOf(" g") > -1){
    circleMass = Number(circleMass.replace(" g", ""));
  } else if (circleMass.indexOf(" t") > -1){
    circleMass = Number(circleMass.replace(" t", ""))*907185;
    circleMass = circleMass*0.1;
  } else {
    circleMass = 1;
  }


    
// if (meteors.length==i) i = 0;  //LOOPS ANIMATIONS
}







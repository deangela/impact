var first_layer = 'd3_world_borders';
 
    var sql = new cartodb.SQL({ user: 'viz2', format: 'geojson', dp: 5});
 
    // Define our SVG element outside our SQL functions
    var svg = d3.select("#map-container")
            .append("svg")
            // .call(d3.behavior.zoom()
            //     .on("zoom", redraw))
            .append("g");
 
    // Our projection.
    var xy = d3.geo.mercator();
        xy.scale(200);
        xy.center([0,0]);
 
    svg.append("g").attr("id", "first_layer");
 
    var path = d3.geo.path();
    
    sql.execute("SELECT ST_Simplify(the_geom,0.01) as the_geom FROM {{table_name}} WHERE the_geom IS NOT NULL", {table_name: first_layer})
      .done(function(collection) {
          svg.select("#first_layer")
            .selectAll("path")
              .data(collection.features)
            .enter().append("path")
            .attr("d", path.projection(xy));
      })
      .error(function(errors) {
        // console.log('Errors! Oh no!')
      });

    sql = new cartodb.SQL({ user: 'annekagoss', format: 'geojson', dp: 5});
 
    var earthquakes;
    sql.execute("SELECT the_geom, year, mass FROM {{table_name}} WHERE the_geom IS NOT NULL ORDER BY year ASC", {table_name: 'meteor_data_test'})
      .done(function(collection) {
        earthquakes = collection.features;
        quake();
      });
 
    var i = 0;
    function quake() {
      var c = earthquakes[i];
      svg.append("circle")
          // .attr("cx", xy(c.geometry.coordinates)[0])
          // .attr("cy", xy(c.geometry.coordinates)[1])

          //* fly in animation setup  *//
          .attr("cy", function(){ return xy([0,Math.random()*180.0-90])[1]})
          .attr("cx", function(){ return xy([Math.random()*360.0-180,0])[0]})
          .attr("d", path.projection(xy))


          .attr("r", 1)
          .style("fill", "red")
          .style("fill-opacity", 0.5)
          .style("stroke", "red")
          .style("stroke-opacity", 0.5)


        //* fly in animation *//
        .transition()
        .ease("exp")
        .duration(200)
        .attr("cy", function(d){ return xy(c.geometry.coordinates)[1] })
        .attr("cx", function(d){ return xy(c.geometry.coordinates)[0] })
        .duration(function(d){ return 800*c.properties.pop })

        .delay(200) 

        
        //* explode animation *//
          .duration(6000)
          .delay(200)
          .ease("Math.sqrt")
          .attr("r", c.properties.mass * 0.01)
          // .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6)
          // .remove()
          
        setTimeout(quake, 200);
      i++;
      if (earthquakes.length==i) i = 0;
    }
 
  
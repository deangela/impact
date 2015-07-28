var first_layer = 'd3_world_borders';
    var second_layer = 'd3_populated_places';

    var sql = new cartodb.SQL({ user: 'viz2', format: 'geojson', dp: 5});

    // Define our SVG element outside our SQL functions
    var svg = d3.select("#map")
            .append("svg")
                .style("width", "100%")
                .style("height", "100%")
                .style("background", "white")
            // .call(d3.behavior.zoom()
            //     .on("zoom", redraw))
            .append("g");

    var mapMarginTop = 175;
        mapMarginLeft = 155;

    // Our projection.
    var xy = d3.geo.mercator().scale(5);
        xy.scale(225);
        xy.center([0,0]);

    svg.append("g").attr("id", "first_layer");
    svg.append("g").attr("id", "second_layer");

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


      sql.execute("SELECT the_geom, 4/sqrt(scalerank) as pop, adm1name as name FROM {{table_name}} WHERE the_geom IS NOT NULL AND pop_max > 10^5", {table_name: second_layer})
        .done(function(collection) {

        var label = svg.append("sgv:g")

        svg.select("#second_layer")
            .selectAll("path")
            .data(collection.features)
            .enter()
            .append("circle")
            .attr("r", function(d){ return d.properties.pop })
          .attr("cy", function(){ return xy([0,Math.random()*180.0-90])[1]})
          .attr("cx", function(){ return xy([Math.random()*360.0-180,0])[0]})
          .attr("d", path.projection(xy))
            .on("mousedown", function(t){
                d3.selectAll("text").remove(); 
              label.append("svg:text")
                .attr("x", xy(t.geometry.coordinates)[0])
                .attr("y", xy(t.geometry.coordinates)[1])
                .attr("class", "text")
                .text(t.properties.name)
                .attr("transform", "translate("  + mapMarginLeft + "," + mapMarginTop + ")");
              })
            .on("mouseout", function(){
              })
          .transition()
          .attr("cy", function(d){ return xy(d.geometry.coordinates)[1] })
          .attr("cx", function(d){ return xy(d.geometry.coordinates)[0] })
          .duration(function(d){ return 800*d.properties.pop })
          .delay(100) 
          .attr("transform", "translate("  + mapMarginLeft + "," + mapMarginTop + ")");
        })

        .error(function(errors) {
          // console.log('Errors! Oh no!')
        });

    function redraw() {
      svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      // svg.attr("transform", "translate(" + 200 + ")scale(" + d3.event.scale + ")");
    }

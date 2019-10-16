document.addEventListener("DOMContentLoaded", () => {
  const width = 600;
  const height = 600;
  
  const svg = d3
  .select("#globe")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
  
  const markerGroup = svg.append('g');

  const projection = d3
    .geoOrthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(94);
    
  const path = d3.geoPath().projection(projection);

  const y = d3
    .scaleLinear()
    .domain([0, width])
    .range([0, 360]);

// test

  function drawMarkers() {
    const markers = markerGroup.selectAll("circle").data(locations);
    markers
      .enter()
      .append("circle")
      .merge(markers)
      .attr("cx", d => projection([d.longitude, d.latitude])[0])
      .attr("cy", d => projection([d.longitude, d.latitude])[1])
      .attr("fill", d => {
        const coordinate = [d.longitude, d.latitude];
        let gdistance = d3.geoDistance(coordinate, projection.invert([ width / 2, height / 2 ]));
        return gdistance > 1.57 ? "none" : "red";
      })
      .attr("r", 7);

    markerGroup.each(function() {
      this.parentNode.appendChild(this);
    });
  }

  //testend

  svg
    .append("path")
    .datum(topojson.feature(WORLD, WORLD.objects.land))
    .attr("d", path);


  let scrollSpeed = 50;
  let current = 0;

  function rotateGlobe() {
    current += 1;
    projection.rotate([y(current), 0]);
    svg
      .selectAll("path")
      .attr("d", path)
      .style("opacity", ".5");
      drawMarkers();
  }
  
  function drawGraticule() {
    const graticule = d3.geoGraticule().step([12, 12]);
    svg
      .append("path")
      .datum(graticule)
      .attr("d", path)
      // .style("fill", "#fff")
      .style("stroke", "#ccc");
  }

  drawGraticule();
  setInterval(rotateGlobe, scrollSpeed);
})
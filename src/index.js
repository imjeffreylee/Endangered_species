document.addEventListener("DOMContentLoaded", () => {
  const width = 610;
  const height = 610;

  const svg = d3
  .select("#globe")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
  
  const markerGroup = svg.append('g');

  const projection = d3
    .geoOrthographic()
    .scale(300)
    .translate([width / 2, height / 2])
    .clipAngle(94);
    
  const path = d3.geoPath().projection(projection);

  const y = d3
    .scaleLinear()
    .domain([0, width])
    .range([0, 360]);

  function drawDots() {
    const markers = markerGroup.selectAll("circle").data(rhinoLocations);
    markers
      .enter()
      .append("circle")
      .merge(markers)
      .attr("cx", d => projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0])
      .attr("cy", d => projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1])
      .attr("fill", d => {
        const coordinate = [d.geometry.coordinates[0], d.geometry.coordinates[1]];
        let gdistance = d3.geoDistance(coordinate, projection.invert([ width / 2, height / 2 ]));
        return gdistance > 1.5 ? "none" : "red";
      })
      // .attr("fill", "transparent")
      .attr("r", 3);

    markerGroup.each(function() {
      this.parentNode.appendChild(this);
    });
  }

  svg
    .append("path")
    .datum(topojson.feature(world, world.objects.land))
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
      drawDots();
  }
  
  function drawLines() {
    const graticule = d3.geoGraticule().step([12, 12]);
    svg
      .append("path")
      .datum(graticule)
      .attr("d", path)
      // .style("fill", "#fff")
      .style("stroke", "#ccc");
  }

  drawLines();
  setInterval(rotateGlobe, scrollSpeed);
})
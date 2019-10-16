document.addEventListener("DOMContentLoaded", () => {
  var width = 600,
      height = 600;

  var projection = d3
    .geoOrthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(94);

  var path = d3.geoPath().projection(projection);

  var y = d3
    .scaleLinear()
    .domain([0, width])
    .range([0, 360]);

  var svg = d3
    .select("#globe")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("path")
    .datum(topojson.feature(WORLD, WORLD.objects.land))
    .attr("class", "land")
    .attr("d", path);

  var scrollSpeed = 50;
  var current = 0;

  function rotateGlobe() {
    current += 1;
    projection.rotate([y(current), 0]);
    svg.selectAll("path").attr("d", path).style("opacity", ".5");
  }
  
  function drawGraticule() {
    const graticule = d3.geoGraticule().step([12, 12]);
    
    svg
      .append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path)
      .style("fill", "#fff")
      .style("stroke", "#ccc");
  }

  drawGraticule();
  setInterval(rotateGlobe, scrollSpeed);
})
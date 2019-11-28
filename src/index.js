document.addEventListener("DOMContentLoaded", () => {
  const width = 610;
  const height = 610;
  const svg = d3
    .select("#globe")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const markerGroup = svg.append("g");

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

  let locations = [];
  const elephant = document.getElementById("elephant");
  const polarBear = document.getElementById("polar-bear");
  const panda = document.getElementById("giant-panda");
  const turtle = document.getElementById("sea-turtle");
  const rhino = document.getElementById("rhino");
  const dolphin = document.getElementById("dolphin");

  elephant.addEventListener("change", concatElephant);
  polarBear.addEventListener("change", concatPolarBear);
  panda.addEventListener("change", concatPanda);
  turtle.addEventListener("change", concatTurtle);
  rhino.addEventListener("change", concatRhino);
  dolphin.addEventListener("change", concatDolphin);

  function concatElephant() {
    if (elephant.checked) {
      locations = locations.concat(elephantLocations);
    } else {
      locations = locations.filter(loc => !elephantLocations.includes(loc));
      drawDots();
    }
  }

  function concatPolarBear() {
    if (polarBear.checked) {
      locations = locations.concat(polarBearLocations);
    } else {
      locations = locations.filter(loc => !polarBearLocations.includes(loc));
      drawDots();
    }
  }

  function concatPanda() {
    if (panda.checked) {
      locations = locations.concat(giantPandaLocations);
    } else {
      locations = locations.filter(loc => !giantPandaLocations.includes(loc));
      drawDots();
    }
  }

  function concatTurtle() {
    if (turtle.checked) {
      locations = locations.concat(seaTurtleLocations);
    } else {
      locations = locations.filter(loc => !seaTurtleLocations.includes(loc));
      drawDots();
    }
  }

  function concatRhino() {
    if (rhino.checked) {
      locations = locations.concat(rhinoLocations);
    } else {
      locations = locations.filter(loc => !rhinoLocations.includes(loc));
      drawDots();
    }
  }

  function concatDolphin() {
    if (dolphin.checked) {
      locations = locations.concat(dolphinLocations);
    } else {
      locations = locations.filter(loc => !dolphinLocations.includes(loc));
      drawDots();
    }
  }

  function drawDots() {
    if (markerGroup._groups[0][0]) {
      if (markerGroup._groups[0][0].hasChildNodes()) {
        markerGroup._groups[0][0].innerHTML = "";
      }
    }
    const markers = markerGroup.selectAll("circle").data(locations);
    markers
      .enter()
      .append("circle")
      .merge(markers)
      .attr(
        "cx",
        d =>
          projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0]
      )
      .attr(
        "cy",
        d =>
          projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1]
      )
      .attr("fill", d => {
        const coordinate = [
          d.geometry.coordinates[0],
          d.geometry.coordinates[1]
        ];
        let distance = d3.geoDistance(
          coordinate,
          projection.invert([width / 2, height / 2])
        );
        return distance > 1.5 ? "none" : "red";
      })
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
      .style("fill", "#fff")
      .style("stroke", "#ccc");
  }

  drawLines();
  setInterval(rotateGlobe, scrollSpeed);
});

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("top-3");
  const species = document.getElementsByClassName("species");

  for (let i = 0; i < species.length; i++) {
    species[i].addEventListener("click", handleList);
  }

  function handleList(e) {
    e.preventDefault();
    if (e.target.className.includes("active")) {
      list.innerHTML = "";
      for (let i = 0; i < species.length; i++) {
        species[i].classList.remove("active");
      }
    } else {
      switch (e.target.dataset.species) {
        case "elephant":
          list.innerHTML = `
            <ul class="top-3-list">
              <li>
                Escalating poaching, or illegal killing, for the commercial trade in ivory and meat.
              </li>
              <br>
              <li>
                Growing demands of exploding human populations and poverty.
              </li>
              <br>
              <li>
                Increasing loss and fragmentation of natural habitats and lack of land-use planning.
              </li>
            </ul>
          `;
          e.target.classList.toggle("active");
          for (let i = 0; i < species.length; i++) {
            if (species[i].dataset.species !== e.target.dataset.species) {
              species[i].classList.remove("active");
            }
          }
          break;

        case "polarBear":
          list.innerHTML = `
            <ul class="top-3-list">
              <li>
                Habitat loss caused by climate change.
              </li>
              <li>
                Toxic pollution caused by human activities.
              </li>
            </ul>
          `;
          e.target.classList.toggle("active");
          for (let i = 0; i < species.length; i++) {
            if (species[i].dataset.species !== e.target.dataset.species) {
              species[i].classList.remove("active");
            }
          }
          break;

        case "giantPanda":
          list.innerHTML = `
            <ul class="top-3-list">
              <li>
                Habitat loss caused by growing human population.
              </li>
            </ul>
          `;
          e.target.classList.toggle("active");
          for (let i = 0; i < species.length; i++) {
            if (species[i].dataset.species !== e.target.dataset.species) {
              species[i].classList.remove("active");
            }
          }
          break;

        case "seaTurtle":
          list.innerHTML = `
            <ul class="top-3-list">
              <li>
                Entanglement in fishing gear.
              </li>
              <li>
                Consumption and illegal trade of eggs, meat, and shells.
              </li>
              <li>
                Coastal development.
              </li>
            </ul>
          `;
          e.target.classList.toggle("active");
          for (let i = 0; i < species.length; i++) {
            if (species[i].dataset.species !== e.target.dataset.species) {
              species[i].classList.remove("active");
            }
          }
          break;

        case "rhino":
          list.innerHTML = `
            <ul class="top-3-list">
              <li>
                Poaching, driven by consumer demand for rhino horn primarily in Asia.
              </li>
              <li>
                Habitat loss caused by growing human population.
              </li>
            </ul>
          `;
          e.target.classList.toggle("active");
          for (let i = 0; i < species.length; i++) {
            if (species[i].dataset.species !== e.target.dataset.species) {
              species[i].classList.remove("active");
            }
          }
          break;

        case "dolphin":
          list.innerHTML = `
            <ul class="top-3-list">
              <li>
                Entanglement in fishing gear (by-catch).
              </li>
              <br>
              <li>
                Climate change, depletion in the ozone layer and the related rise in UV radiation.
              </li>
              <br>
              <li>
                Death or injury from ship strikes.
              </li>
            </ul>
          `;
          e.target.classList.toggle("active");
          for (let i = 0; i < species.length; i++) {
            if (species[i].dataset.species !== e.target.dataset.species) {
              species[i].classList.remove("active");
            }
          }
          break;

        default:
          list.innerHTML = "";
          break;
      }
    }
  }
});

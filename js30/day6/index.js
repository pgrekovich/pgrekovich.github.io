async function getData() {
  const endpoint =
    "https://gist.githubusercontent.com" +
    "/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

  const res = await fetch(endpoint);

  if (!res.ok) {
    alert("Fetching failed");
    return;
  }

  return await res.json();
}

function findCity(input, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(input, "gi");

    return place.city.match(regex) || place.state.match(regex);
  });
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function render(cities, e) {
  const val = e.target.value;

  const match = findCity(val, cities);
  const suggestions = document.querySelector(".suggestions");

  const regex = new RegExp(val, "gi");

  const html = match
    .map((place) => {
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${val}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${val}</span>`
      );

      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${formatNumber(place.population)}</span>
      </li>
    `;
    })
    .join("");

  suggestions.innerHTML = html;
}

//---INIT---
(async function () {
  const cities = await getData();

  const searchInput = document.querySelector(".search");

  searchInput.addEventListener("keyup", render.bind(this, cities));

  console.log(cities);
})();

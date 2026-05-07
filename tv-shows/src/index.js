import { getShowData, getEpisodeList, searchShows } from "./services/tvmaze.js";
import { createHeaderHTML } from "./components/header.js";
import { createSeasonHTML } from "./components/season.js";

// Lógica principal de renderizado
async function renderShow(id) {
  try {
    const show = await getShowData(id);
    const seasons = await getEpisodeList(id);

    const $header = document.querySelector("header");
    const $episodes = document.querySelector(".episodes");

    // Renderizar Header
    $header.innerHTML = createHeaderHTML(show);

    // Renderizar Temporadas y Episodios
    const listHTML = Object.entries(seasons).map(([number, data]) => {
      return createSeasonHTML(data, number);
    }).join("");

    $episodes.innerHTML = listHTML;
  } catch (error) {
    console.error("Error al cargar la serie:", error);
    alert("No se pudo cargar la serie o no tiene episodios.");
  }
}

// Inicialización con una serie por defecto
renderShow("2993");

// Lógica de búsqueda
const $searchInput = document.querySelector("#search-input");

$searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const query = event.target.value.trim();
    if (!query) return;

    // Indicador de carga
    const $header = document.querySelector("header");
    $header.innerHTML = "<h2>Buscando...</h2>";
    document.querySelector(".episodes").innerHTML = "";

    try {
      const results = await searchShows(query);
      if (results.length > 0) {
        // Tomar el primer resultado de la búsqueda
        const showId = results[0].show.id;
        await renderShow(showId);
      } else {
        $header.innerHTML = "<h2>No se encontraron resultados</h2>";
      }
    } catch (error) {
      console.error(error);
      $header.innerHTML = "<h2>Error al buscar</h2>";
    }
  }
});
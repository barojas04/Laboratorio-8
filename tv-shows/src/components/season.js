import { createEpisodeHTML } from "./episode.js";

export const createSeasonHTML = (episodes, seasonNumber) => {
  const episodesHTML = episodes.map(ep => createEpisodeHTML(ep)).join("");
  
  return `
    <article class="season">
      <header class="season-header">T${seasonNumber}</header>
      ${episodesHTML}
    </article>
  `;
};

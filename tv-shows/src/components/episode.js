export const createEpisodeHTML = (episode) => {
  const ratingClass = `rating-${Math.floor(episode.rating)}`;
  return `<div class="episode ${ratingClass}" title="Rating: ${episode.rating}">${episode.number}</div>`;
};

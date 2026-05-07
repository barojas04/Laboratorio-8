const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";

// Obtener datos básicos de la serie
export const getShowData = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}`;
  const data = await fetch(URL).then(res => res.json());

  return {
    name: data.name,
    rating: data.rating,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE
  }
}

// Obtener episodios y agruparlos por temporada
export const getEpisodeList = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}/episodes`;
  const episodes = await fetch(URL).then(res => res.json());

  const episodeList = episodes.map(episode => ({
    number: episode.number,
    season: episode.season,
    rating: episode.rating.average ?? 0 // Si no tiene rating, ponemos 0
  }));

  // Agrupamos usando la nueva función Object.groupBy
  const episodesBySeason = Object.groupBy(episodeList, (episode) => episode.season);
  return episodesBySeason;
}

// Buscar serie por nombre
export const searchShows = async (query) => {
  const URL = `https://api.tvmaze.com/search/shows?q=${query}`;
  const data = await fetch(URL).then(res => res.json());
  return data;
}
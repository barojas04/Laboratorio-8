export const createHeaderHTML = (show) => {
  return `
    <img class="poster" src="${show.image}" alt="${show.name}">
    <h1>${show.name}</h1>
    <div class="rating-badge rating-${Math.floor(show.rating.average)}">
        ${show.rating.average ?? 'N/A'}
    </div>
  `;
};

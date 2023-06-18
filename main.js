import { data } from "./response.js";

function populateCardMovies(movies) {
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const cardBox = document.createElement("card-box");
    cardBox.setAttribute("title", movie.title);
    cardBox.setAttribute("image", movie.image);
    cardBox.setAttribute("rate", movie.rate);
    cardBox.setAttribute("price", movie.price);
    cardBox.setAttribute("discountPercentage", movie.discount/100);
    movieContainer.appendChild(cardBox);
  });
}

async function getMovies() {
  try {
    // const response = await fetch("https://web-components-api-movies.free.beeceptor.com/movies");
    // const json = await response.json();
    // populateCardMovies(json.body);
    populateCardMovies(data.body);
  } catch (error) {
    console.log(error);
  }
}

console.log("main.js");
getMovies();

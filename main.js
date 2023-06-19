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
    cardBox.setAttribute("address", movie.address);
    cardBox.setAttribute("category", movie.category);
    cardBox.setAttribute("experience", movie.experience);

    addAditionalInfo(cardBox, movie);
    movieContainer.appendChild(cardBox);
  });
}

function addAditionalInfo(cardBox, movie) {
  const tagAddress = document.createElement('span');
  const tagCategory = document.createElement('span');
  const tagExperience = document.createElement('span');

  tagAddress.classList.add('movie-tag');
  tagCategory.classList.add('movie-tag');
  tagExperience.classList.add('movie-tag');

  tagAddress.innerHTML = movie.address;
  tagCategory.innerHTML = movie.category;
  tagExperience.innerHTML = movie.experience;

  cardBox.appendChild(tagAddress);
  cardBox.appendChild(tagCategory);
  cardBox.appendChild(tagExperience);
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

getMovies();

document.addEventListener('click-child', (e) => {
  const filterBy = e.target.liElement.innerText;
  const allBoxes = document.querySelectorAll('card-box');

  allBoxes.forEach((box) => {
    box.style.display = 'none';
    const tags = box.querySelectorAll('.movie-tag');
    tags.forEach((tag) => {
      if (tag.innerText === filterBy || filterBy === 'Todas') {
        box.style.display = 'block';
      }
    })
  })
})
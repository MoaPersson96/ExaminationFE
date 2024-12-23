import { showErrorModal } from './errorHandling.js';
import { loadFavorites, removeFromFavorites } from './favorites.js';

const movieList = document.getElementById("movieList");
const API_URL = `http://www.omdbapi.com/?apikey=bbe8d74e&`;

async function showFavoriteMovie(movieID) {
    try {
        const response = await fetch(`${API_URL}&i=${movieID}`);
        if (!response.ok) {
            throw new Error(`Kunde inte hämta detaljer för ${movieID}`);
        }
        const movie = await response.json();
        const movieCard = `
            <div class="movie-card">
                <img src="${movie.Poster}" alt="${movie.Title}" />
                <h2>${movie.Title}</h2>
                <div class="button-container">
                    <button class="info-btn" onclick="showDetails('${movie.imdbID}')">Mer info</button>
                    <button class="favorite-btn" onclick="removeFromFavorites('${movie.imdbID}')">Ta bort</button>
                </div>
            </div>
            `;
            movieList.insertAdjacentHTML("beforeend", movieCard);
    } catch (error) {
        console.error("Kunde inte hämta favorit filmer", error);
        showErrorModal("Kunde inte hämta favoritfilmer");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadFavorites(movieList, API_URL, showFavoriteMovie);
});
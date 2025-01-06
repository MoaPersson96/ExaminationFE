import { showErrorModal } from './errorHandling.js';
import { loadFavorites, removeFromFavorites, saveToFavorites } from './favorites.js';
import { API_URL, closeDetailsModal } from './script.js';
import { showDetails } from './details.js';

const movieList = document.getElementById("movieList");

export async function showFavoriteMovie(movieID, movieList, API_URL) {
    try {
        const response = await fetch(`${API_URL}&i=${movieID}`);
        if (!response.ok) {
            throw new Error(`Kunde inte hämta detaljer för ${movieID}`);
        }
        const movie = await response.json();
        
        const movieCard = `
            <div class="movie-card" data-movie-id="${movieID}">
                <img src="${movie.Poster}" alt="${movie.Title}" />
                <h2>${movie.Title}</h2>
                <div class="button-container">
                    <button class="info-btn" data-movie-id="${movieID}">Mer info</button>
                    <button class="favorite-btn remove-btn" data-movie-id="${movieID}">Ta bort</button>
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
    const movieList = document.getElementById("movieList");
    loadFavorites(movieList, API_URL, showFavoriteMovie);
});

movieList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('info-btn')) {
        const movieID = target.getAttribute('data-movie-id');
        showDetails(movieID);
    }

    if (target.classList.contains('remove-btn')) {
        const movieID = target.getAttribute('data-movie-id');
        console.log(`${movieID} har tagits bort från din favoritlista.`)
        showErrorModal(`${movieID} har tagits bort från din favoritlista`)
        removeFromFavorites(movieID);

        const movieCard = target.closest('.movie-card');
        if (movieCard) {
            movieCard.remove();
        }
    }
});
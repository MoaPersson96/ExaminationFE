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

            movieList.addEventListener('click', (event) => {
                if (event.target && event.target.classList.contains('info-btn')) {
                    const movieID = event.target.getAttribute('data-movie-id');
                    showDetails(movieID);
                }
            });


            const removeButton = movieList.querySelector(`.remove-btn[data-movie-id='${movieID}']`);

            console.log("Hittade inte knappen: ", removeButton);

            if (removeButton) {
                removeButton.addEventListener('click', () => {
                    console.log(`Ta bort film med ID: ${movieID}`);
                    removeFromFavorites(movieID);
                    document.querySelector(`.movie-card[data-movie-id='${movieID}']`);
                    if (movieCard) {
                        movieCard.remove();
                    }
                });
            } else {
                console.error("Ta bort-knappen hittades inte för film: ", movieID);
            }
    } catch (error) {
        console.error("Kunde inte hämta favorit filmer", error);
        showErrorModal("Kunde inte hämta favoritfilmer");
    }
}

document.getElementById("movieList").addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('remove-btn')) {
        const movieID = event.target.getAttribute('data-movie-id');
        console.log(`Ta bort film med ID: ${movieID}`);
        removeFromFavorites(movieID);  // Ta bort filmen från favoriter
        const movieCard = document.querySelector(`.movie-card[data-movie-id='${movieID}']`);
        if (movieCard) {
            movieCard.remove(); // Ta bort kortet från UI
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movieList");
    loadFavorites(movieList, API_URL, showFavoriteMovie);
});

// document.addEventListener("DOMContentLoaded", () => {
//     const movieList = document.getElementById("movieList");

//     if (movieList) {
//         loadFavorites(movieList, API_URL, showFavoriteMovie);
//     } else {
//         console.error("movieList-elementet hittades inte.");
//     }
// });
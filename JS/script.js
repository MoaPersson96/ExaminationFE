import { showDetails } from './details.js';
import { showErrorModal, closeErrorModal } from './errorHandling.js';
import { saveToFavorites, loadFavorites, removeFromFavorites } from './favorites.js';
import { showFavoriteMovie } from './favoritePage.js';

const API_KEY = "bbe8d74e";
export const API_URL = `http://www.omdbapi.com/?apikey=bbe8d74e&`

const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

async function fetchMovies(query = 'Star Wars', page = 1) {
    try {
        const response = await fetch(`${API_URL}&s=${query}&page=${page}`);
        if (!response.ok) {
            throw new Error(`Nätverksfel: ${response.status}`);
        }
        const data = await response.json();

        if (data.Response === 'True') {
            const movieCount = data.Search.length;
            console.log("Grunddata från API: ", data.Search);
            
            const detailedMovies = await Promise.all(
                data.Search.map(async (movie) => {
                    const detailsResponse = await fetch(`${API_URL}&i=${movie.imdbID}`);
                    if (!detailsResponse.ok) {
                        throw new Error(`Kunde inte hämta detaljer för ${movie.imdbID}`);
                    }
                    const details = await detailsResponse.json();
                    return details;
                })
            );
            
            console.log("Detaljerade filmer: ", detailedMovies);
            
            renderMovies(detailedMovies.slice(0, 10));
        } else {
            showErrorModal(`Inga filmer hittades för sökningen "${query}".`);
        }
    } catch (error) {
        console.error("Fel vid hämtningen av filmdata: ", error);
        showErrorModal(">Något gick fel vi hämtningen av data. Försök igen senare.");
    }
}

function renderMovies(movies) {
    const movieCount = document.getElementById("movieCount");

    if (movies.length === 0) {
        movieList.innerHTML = `<p style='color: white;'>Inga filmer att visa.</p>`;
        movieCount.classList.add("hidden");
        return;
    }

    movieCount.textContent = `Antal matchande filmer: ${movies.length}`;
    movieCount.classList.remove("hidden");

    movieList.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h2>${movie.Title}</h2>
            <div class="button-container">
                <button class="info-btn" onclick="showDetails('${movie.imdbID}')">Mer info</button>
                <button class="favorite-btn" data-movie-id="${movie.imdbID}">Favoriter</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const imdbID = event.target.dataset.imdbId;
            showDetails(imdbID);
        });
    });

    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const movieID = event.target.dataset.movieId;
            saveToFavorites(movieID);
        });
    });
}

export function closeDetailsModal() {
    const modal = document.getElementById("modal");
    const modalOverlay = document.getElementById("modal-overlay");

    modal.classList.add("hidden");
    modalOverlay.classList.remove("active");
}

document.getElementById("closeErrorButton").addEventListener("click", closeErrorModal);

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    fetchMovies(query);
});



document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
    loadFavorites(movieList, API_URL, showFavoriteMovie);
});
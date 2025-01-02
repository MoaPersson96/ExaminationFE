import { showErrorModal } from './errorHandling.js';
import { showFavoriteMovie } from './favoritePage.js';
import { API_URL, closeDetailsModal } from './script.js';

export function saveToFavorites (movieID) {
    try {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(movieID)) {
            favorites.push(movieID);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            console.log("Film tillagd i favoriter: ", movieID);
            showErrorModal("Filmen har blivit tillagd i dina favoriter!")
        } else {
            console.log("Filmen finns redan i dina favoriter.");
            showErrorModal("Filmen finns redan i dina favoriter");
        }
    } catch (error) {
        console.error("Fel vid hantering av favoriter: ", error);
        showErrorModal("Kunde inte spara till favoriter.");
    }
}


export function loadFavorites(movieList, API_URL, showFavoriteMovie) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    movieList.innerHTML = '';
    if (favorites.length > 0) {
        favorites.forEach(movieID => {
            showFavoriteMovie(movieID, movieList, API_URL);
        });
    } else {
        movieList.innerHTML = "<p style='color: white;'>Inga favoriter sparade än.</p>";
    }
}


export function removeFromFavorites(movieID) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(id => id !== movieID);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("Filmen har tagits bort från dina favoriter.");
    showErrorModal("Filmen har tagits bort från dina favoriter.");
    
    const movieList = document.getElementById("movieList");
    loadFavorites(movieList, API_URL, showFavoriteMovie);
}
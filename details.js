import { API_URL } from './script.js';
import { showErrorModal } from './errorHandling.js';

export async function showDetails(movieID) {
    console.log("Movie ID: ", movieID);
    try {
        const response = await fetch(`${API_URL}&i=${movieID}`);
        if (!response.ok) {
            throw new Error(`Kunde inte hämta detaljer för ${movieID}`);
        }
        const movie = await response.json();

        if (movie.Response == "True") {
            const modal = document.getElementById("modal");
            modal.innerHTML = `
            <h2>${movie.Title}</h2>
                <img src="${movie.Poster}" alt="${movie.Title}" width=100px />
                <p><strong>År:</strong> ${movie.Year}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Regissör:</strong> ${movie.Director}</p>
                <p><strong>Skådespelare:</strong> ${movie.Actors}</p>
                <p><strong>Handling:</strong> ${movie.Plot}</p>
                <button onclick="closeModal()">Stäng</button>
            `;
            const modalOverlay = document.getElementById("modal-overlay");
            modal.classList.remove("hidden");
            modalOverlay.classList.add("active");
        } else {
            console.log("Filminformationen kunde inte hämtas.");
            showErrorModal("Filminformationen kunde inte hämtas.");
        }
    } catch (error) {
        console.error("Fel vid hämtningen av filmdata: ", error);
        showErrorModal("Fel vid hämtningen av filmdata. Försök igen senare.")
    }
}
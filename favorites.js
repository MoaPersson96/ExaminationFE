export function saveToFavorites (movieID) {
    try {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(movieID)) {
            favorites.push(movieID);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            console.log("Film tillagd i favoriter: ", movieID);
            showErrorModal("Filmen har lagts till i favoriter!");
        } else {
            console.log("Filmen finns redan i dina favoriter.");
            showErrorModal("Filmen finns redan i dina favoriter");
        }
    } catch (error) {
        console.error("Fel vid hantering av favoriter: ", error);
        showErrorModal("Kunde inte spara till favoriter.");
    }
}

export function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.length > 0) {
        favorites.forEach(movieID => {
            showFavoriteMovie(movieID);
        });
    } else {
        movieList.innerHTML = "<p>Inga favoriter sparade ännu.</p>";
    }
}

export function removeFromFavorites(movieID) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(id => id !== movieID);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("Filmen har tagits bort från dina favoriter.");
    showErrorModal("Filmen har tagits bort från dina favoriter.");
    movieList.innerHTML = "";
    loadFavorites();
}
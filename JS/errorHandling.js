export function showErrorModal(message) {
    const errorModal = document.getElementById("error-modal");
    const errorModalOverlay = document.getElementById("errorModal-overlay");
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = message;
    errorModal.classList.remove("hidden");
    errorModalOverlay.classList.add("active");
}

export function closeErrorModal() {
    const errorModal = document.getElementById("error-modal");
    const errorModalOverlay = document.getElementById("errorModal-overlay");

    errorModal.classList.add("hidden");
    errorModalOverlay.classList.remove("active");
}
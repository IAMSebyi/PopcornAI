// Profile Button Action
function goToProfile() {
    alert("Navigating to Profile..."); // Replace with actual navigation code later
}

// Card Flip
function flipCard(card) {
    card.classList.toggle("flipped");
}

// Load New Movie (Simulates fetching a new movie title and resetting the card)
function loadNewMovie() {
    const card = document.querySelector(".movie-card");
    const title = document.querySelector(".movie-title");

    // Reset the card's position and fade it back in
    card.className = "movie-card animate-reset";
    title.innerText = "New Movie Title"; // Placeholder - Replace with actual data
}

// Swiping Actions
function swipe(action) {
    const card = document.querySelector(".movie-card");

    // Apply specific animation based on action
    switch (action) {
        case 'like':
            card.classList.add("animate-up");
            break;
        case 'dislike':
            card.classList.add("animate-down");
            break;
        case 'interested':
            card.classList.add("animate-right");
            break;
        case 'not-interested':
            card.classList.add("animate-left");
            break;
        case 'super-like':
            card.classList.add("animate-heart");
            break;
        case 'neutral':
            card.classList.add("animate-reset");
            return; // Skip loading a new card
    }

    // Load a new card after animation ends
    card.addEventListener("animationend", loadNewMovie, { once: true });
}

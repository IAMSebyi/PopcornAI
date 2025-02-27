// document.addEventListener('DOMContentLoaded', () => {
//     // Check session status
//     fetch('/session', {
//         method: 'GET',
//         credentials: 'include' // Include cookies for session handling
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.loggedIn) {
//             // Display the username on the page
//             document.getElementById('username-display').textContent = data.username;
//         } else {
//             // Redirect to login page if not logged in
//             window.location.href = 'login.html';
//         }
//     })
//     .catch(error => {
//         console.error('Error checking session:', error);
//         window.location.href = 'login.html';
//     });
// });


// Example Movie Data
const movies = [
    {
        title: "Peaky Blinders",
        description: "A crime drama centred on a family of mixed Irish Traveller and Romani origins based in Birmingham, England, starting in 1919, several months after the end of the First World War.",
        rating: "9.5/10",
        popularity: "High",
        poster: "poster-placeholder.jpg"
    },
    {
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        rating: "8.8/10",
        popularity: "Very High",
        poster: "inception-poster.jpg"
    },
    {
        title: "The Dark Knight",
        description: "When the menace known as The Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        rating: "9.0/10",
        popularity: "Very High",
        poster: "dark-knight-poster.jpg"
    }
];

let currentMovieIndex = 0;

// Profile Button Action
function goToProfile() {
    // Redirect to profile page
    window.location.href = 'profile.html';
}

// Card Flip
function flipCard(card) {
    card.classList.toggle("flipped");
}

// Load New Movie
function loadNewMovie() {
    const card = document.querySelector(".movie-card");
    const title = document.querySelector(".movie-title");
    const frontImg = document.querySelector(".card-front img");
    const backDescription = document.querySelector(".card-back .description p");
    const backRating = document.querySelector(".card-back .details p:nth-child(1)");
    const backPopularity = document.querySelector(".card-back .details p:nth-child(2)");

    // Increment the index and loop back if at the end
    currentMovieIndex = (currentMovieIndex + 1) % movies.length;

    // Fetch the new movie
    const newMovie = movies[currentMovieIndex];

    // Update card content
    title.innerText = newMovie.title;
    frontImg.src = newMovie.poster;
    frontImg.alt = newMovie.title;
    backDescription.innerText = `Description: ${newMovie.description}`;
    backRating.innerText = `Rating: ${newMovie.rating}`;
    backPopularity.innerText = `Popularity: ${newMovie.popularity}`;

    // Reset the card's position and remove animations
    card.className = "movie-card";

    // Add random rating (using Math)
    const randomRating = (Math.random() * 5 + 5).toFixed(1); // Between 5.0 and 10.0
    backRating.innerText = `Rating: ${randomRating}/10`;
    
    // Update card background color (random color change)
    card.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    
    // Add a release date (using Date)
    const currentDate = new Date();
    const releaseYear = currentDate.getFullYear();
    backDescription.innerText += `\nReleased: ${releaseYear}`;
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

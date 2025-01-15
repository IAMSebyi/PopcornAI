document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        };

        // Send data using AJAX
        fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message); // Notify the user of successful login
                    window.location.href = "home.html"; // Redirect to home page
                } else {
                    alert(data.message); // Notify the user of failure
                }
            })
            .catch((error) => console.error("Error during login:", error));
    });
});

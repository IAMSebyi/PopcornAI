document.addEventListener("DOMContentLoaded", () => {
    const joinButton = document.getElementById("joinButton");
    const formPopup = document.getElementById("formPopup");
    const mainContent = document.getElementById("mainContent");
    const signupForm = formPopup.querySelector("form");

    joinButton.addEventListener("click", () => {
        formPopup.classList.toggle("active");
        mainContent.classList.toggle("shift-left");
    });

    window.addEventListener("click", (event) => {
        if (event.target === formPopup) {
            formPopup.classList.remove("active");
            mainContent.classList.remove("shift-left");
        }
    });

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirm-password").value,
        };

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        fetch("http://127.0.0.1:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message); // Notify the user of successful signup
                    window.location.href = "login.html"; // Redirect to login page
                } else {
                    alert(data.message); // Notify the user of failure
                }
            })
            .catch((error) => console.error("Error during signup:", error));
    });
});

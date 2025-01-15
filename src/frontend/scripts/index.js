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

    // Restore form data from LocalStorage
    const restoreFormData = () => {
        usernameInput.value = localStorage.getItem("signupUsername") || "";
        emailInput.value = localStorage.getItem("signupEmail") || "";
        passwordInput.value = localStorage.getItem("signupPassword") || "";
        confirmPasswordInput.value = localStorage.getItem("signupConfirmPassword") || "";
    };

    // Save form data to LocalStorage
    const saveFormData = () => {
        localStorage.setItem("signupUsername", usernameInput.value);
        localStorage.setItem("signupEmail", emailInput.value);
        localStorage.setItem("signupPassword", passwordInput.value);
        localStorage.setItem("signupConfirmPassword", confirmPasswordInput.value);
    };

    // Call restore on page load
    restoreFormData();

    // Add event listener for form input changes
    signupForm.addEventListener("input", saveFormData);

    // Validate email using regular expression
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Validate password with conditions
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirm-password").value,
        };

        // Validate email
        if (!validateEmail(email)) {
            emailError.textContent = "Please enter a valid email address!";
            return;
        } else {
            emailError.textContent = "";
        }

        // Validate password
        if (!validatePassword(password)) {
            passwordError.textContent = "Password must be at least 8 characters long, contain a number, a letter, and a special character!";
            return;
        } else {
            passwordError.textContent = "";
        }

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

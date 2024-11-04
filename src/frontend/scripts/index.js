document.addEventListener("DOMContentLoaded", () => {
    const joinButton = document.getElementById("joinButton");
    const formPopup = document.getElementById("formPopup");
    const mainContent = document.getElementById("mainContent");

    // Toggle form popup visibility and shift main content
    joinButton.addEventListener("click", () => {
        formPopup.classList.toggle("active");
        mainContent.classList.toggle("shift-left");
    });

    // Optional: Hide form when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === formPopup) {
            formPopup.classList.remove("active");
            mainContent.classList.remove("shift-left");
        }
    });
});

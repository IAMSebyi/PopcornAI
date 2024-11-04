// JavaScript for handling button clicks and animations

// Select all action buttons
const actionButtons = document.querySelectorAll('.action-button');

// Loop through each action button
actionButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the corresponding slider section based on button id
        const contentId = `${this.id}-content`;
        const selectedSlider = document.getElementById(contentId);

        // Check if the selected slider is currently visible
        const isVisible = !selectedSlider.classList.contains('hidden');

        // Hide all card sliders and remove active class from all buttons
        document.querySelectorAll('.card-slider').forEach(slider => {
            slider.classList.add('hidden');
        });
        actionButtons.forEach(btn => btn.classList.remove('active'));

        // If the clicked section was not visible, show it and add active class
        if (!isVisible) {
            selectedSlider.classList.remove('hidden');
            this.classList.add('active');
        }
    });
});

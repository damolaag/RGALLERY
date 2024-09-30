document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading
    const observer = lozad();
    observer.observe();

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.querySelector('.close-btn');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active'); // Toggle the active class
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active'); // Close the menu
    });

    // Close mobile menu when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === mobileMenu) {
            mobileMenu.classList.remove('active'); // Close the menu
        }
    });
});

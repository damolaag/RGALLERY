document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading
    const observer = lozad();
    observer.observe();

    // Hamburger menu toggle (ensure these elements exist in your HTML)
    const hamburger = document.getElementById('hamburger'); // Ensure this element exists
    const mobileMenu = document.getElementById('mobile-menu'); // Ensure this element exists
    const closeBtn = document.querySelector('.close-btn'); // Ensure this element exists

    if (hamburger && mobileMenu && closeBtn) {
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
    }

    // Declare cards only once
    const cards = document.querySelectorAll('.gallery .card');

    // Search functionality
    const searchInput = document.getElementById('search');
    const layoutDropdown = document.getElementById('layout-dropdown');

    const filterCards = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedLayout = layoutDropdown.value;

        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesLayout = selectedLayout === '' || card.dataset.category === selectedLayout;

            if (matchesSearch && matchesLayout) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    };

    searchInput.addEventListener('input', filterCards);
    layoutDropdown.addEventListener('change', filterCards);

    function toggleNav() {
        const nav = document.getElementById('nav-menu');
        nav.classList.toggle('active');
    }
});

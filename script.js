document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading
    const observer = lozad();
    observer.observe();

    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }

    // Search and filter functionality
    const searchInput = document.getElementById('search');
    const layoutDropdown = document.getElementById('layout-dropdown');
    const gallery = document.getElementById('gallery');
    const loadMoreButton = document.getElementById('load-more');

    const ITEMS_PER_PAGE = 8;
    let currentPage = 1;
    const allItems = Array.from(gallery.querySelectorAll('.card'));

    function showItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedLayout = layoutDropdown.value;
        let visibleCount = 0;

        allItems.forEach((item) => {
            const title = item.querySelector('h2').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const category = item.getAttribute('data-category');

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = selectedLayout === '' || category === selectedLayout;

            if (matchesSearch && matchesCategory && visibleCount < currentPage * ITEMS_PER_PAGE) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        loadMoreButton.style.display = visibleCount < allItems.length ? 'block' : 'none';
    }

    showItems();

    loadMoreButton.addEventListener('click', function() {
        currentPage++;
        showItems();
        observer.observe();
    });

    searchInput.addEventListener('input', () => {
        currentPage = 1;
        showItems();
    });

    layoutDropdown.addEventListener('change', () => {
        currentPage = 1;
        showItems();
    });

    // Add touch events for iOS
    document.addEventListener('touchstart', function() {}, false);
});

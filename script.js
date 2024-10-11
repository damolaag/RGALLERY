document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading
    const observer = lozad();
    observer.observe();

    // Existing navigation toggle code
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleNav);
    }

    function toggleNav() {
        navMenu.classList.toggle('active');
    }

    // Search and filter functionality
    const searchInput = document.getElementById('search');
    const layoutDropdown = document.getElementById('layout-dropdown');
    const gallery = document.getElementById('gallery');
    const loadMoreButton = document.getElementById('load-more');

    // Constants for gallery loading
    const ITEMS_PER_PAGE = 8;
    let currentPage = 1;

    // Get all gallery items
    const allItems = Array.from(gallery.querySelectorAll('.card'));
    
    // Function to show/hide items based on current page and filters
    function showItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedLayout = layoutDropdown.value;
        let visibleCount = 0;

        allItems.forEach((item, index) => {
            const title = item.querySelector('h2').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const category = item.getAttribute('data-category');

            let matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            let matchesCategory = selectedLayout === '' || category === selectedLayout;

            if (matchesSearch && matchesCategory) {
                if (visibleCount < currentPage * ITEMS_PER_PAGE) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide load more button
        loadMoreButton.style.display = visibleCount < allItems.length ? 'block' : 'none';
    }

    // Initial load
    showItems();

    // Load more button click event
    loadMoreButton.addEventListener('click', function() {
        currentPage++;
        showItems();
        observer.observe(); // Refresh lazy loading for newly visible items
    });

    // Event listeners for search and filter
    searchInput.addEventListener('input', function() {
        currentPage = 1;
        showItems();
    });
    layoutDropdown.addEventListener('change', function() {
        currentPage = 1;
        showItems();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading
    const observer = lozad();
    observer.observe();

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Load More functionality (placeholder)
    const loadMoreButton = document.getElementById('load-more');
    
    loadMoreButton.addEventListener('click', () => {
        console.log('Load more clicked - implement pagination here');
        // Implement pagination or dynamic loading here
    });

    // Ad container inspection
    const adContainers = document.querySelectorAll('.rich-media-container');
    
    adContainers.forEach(container => {
        const ins = container.querySelector('ins.adcads');
        const iframe = ins.querySelector('iframe');
        
        if (iframe) {
            console.log('Ad iframe dimensions:', iframe.offsetWidth, 'x', iframe.offsetHeight);
            console.log('Ad iframe position:', iframe.offsetLeft, ',', iframe.offsetTop);
        } else {
            console.log('No iframe found in ad container');
        }
    });
});

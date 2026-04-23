// Portfolio JavaScript - Pixentry Creatives

// DOM Elements
const portfolioFilters = document.getElementById('portfolioFilters');
const portfolioGrid = document.getElementById('portfolioGrid');
const portfolioLinks = document.querySelectorAll('.portfolio-link');
const portfolioModals = document.querySelectorAll('.portfolio-modal');
const modalCloses = document.querySelectorAll('.modal-close');

// Portfolio Filtering
function setupPortfolioFilters() {
    if (!portfolioFilters || !portfolioGrid) return;
    
    const filterButtons = portfolioFilters.querySelectorAll('.filter-btn');
    const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category
            const filterValue = button.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    
                    // Add animation class
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 100);
                } else {
                    item.classList.remove('active');
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Portfolio Modals
function setupPortfolioModals() {
    // Open modal when clicking on portfolio item
    portfolioLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const modalId = link.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal when clicking on close button
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.portfolio-modal');
            
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    });
    
    // Close modal when clicking outside the content
    portfolioModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Setup portfolio filters
    setupPortfolioFilters();
    
    // Setup portfolio modals
    setupPortfolioModals();
});
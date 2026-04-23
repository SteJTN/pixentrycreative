// Contact Form JavaScript - Pixentry Creatives

// DOM Elements
const contactForm = document.getElementById('contactForm');
const formSuccessMessage = document.getElementById('formSuccessMessage');

// Form Validation
function validateForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const consent = formData.get('consent');
    
    // Simple validation
    if (!name || name.trim() === '') {
        alert('Please enter your name');
        return false;
    }
    
    if (!email || email.trim() === '') {
        alert('Please enter your email');
        return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!subject || subject.trim() === '') {
        alert('Please select a subject');
        return false;
    }
    
    if (!message || message.trim() === '') {
        alert('Please enter your message');
        return false;
    }
    
    if (!consent) {
        alert('Please agree to the data processing consent');
        return false;
    }
    
    return true;
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // In a real application, you would send the form data to a server here
    // For demonstration purposes, we'll just show the success message
    
    // Show success message
    if (formSuccessMessage) {
        formSuccessMessage.style.display = 'flex';
        
        // Reset form
        contactForm.reset();
    }
}

// Close Success Message
function setupSuccessMessageClose() {
    const closeButton = document.querySelector('.close-success');
    
    if (closeButton && formSuccessMessage) {
        closeButton.addEventListener('click', () => {
            formSuccessMessage.style.display = 'none';
        });
        
        // Also close when clicking outside the content
        formSuccessMessage.addEventListener('click', (e) => {
            if (e.target === formSuccessMessage) {
                formSuccessMessage.style.display = 'none';
            }
        });
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Setup form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Setup success message close
    setupSuccessMessageClose();
});
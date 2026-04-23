// Main JavaScript - Pixentry Creatives

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialDots = document.getElementById('testimonialDots');

// Header Scroll Effect
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    
    // Toggle icon between bars and X
    const icon = navToggle.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Testimonial Slider
let currentSlide = 0;
const testimonialSlides = testimonialSlider ? testimonialSlider.querySelectorAll('.testimonial-slide') : [];
const dots = testimonialDots ? testimonialDots.querySelectorAll('.dot') : [];

function showSlide(n) {
    if (!testimonialSlides.length) return;
    
    // Reset active slide
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Reset active dot
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Wrap around if at the end or beginning
    if (n >= testimonialSlides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = testimonialSlides.length - 1;
    } else {
        currentSlide = n;
    }
    
    // Show active slide and dot
    testimonialSlides[currentSlide].classList.add('active');
    if (dots.length) {
        dots[currentSlide].classList.add('active');
    }
}

// Scroll Animation
function handleScrollAnimation() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Calculate delay if specified
        let delay = 0;
        if (element.dataset.delay) {
            delay = parseInt(element.dataset.delay);
        }
        
        if (elementTop < windowHeight - 100) {
            setTimeout(() => {
                element.classList.add('active');
            }, delay);
        }
    });
}

// FAQ Accordion
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Check if currently active
            const isActive = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const faqAnswer = faq.querySelector('.faq-answer');
                faqAnswer.style.maxHeight = null;
            });
            
            // Toggle current FAQ
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Check initial scroll position
    
    // Mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Testimonial slider
    if (testimonialSlider) {
        // Initialize slider
        showSlide(currentSlide);
        
        // Add event listeners for prev/next buttons
        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
        }
        
        if (testimonialNext) {
            testimonialNext.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
        }
        
        // Add event listeners for dots
        if (dots.length) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
        }
        
        // Auto advance slides every 5 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    // Scroll animations
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Check initial elements in view
    
    // Setup FAQ accordion if on page
    setupFAQAccordion();
});
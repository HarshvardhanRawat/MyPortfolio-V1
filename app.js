// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (hamburger && navLinks) {
        function closeMenu() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        
        function openMenu() {
            hamburger.classList.add('active');
            navLinks.classList.add('active');
            document.body.classList.add('menu-open');
            hamburger.setAttribute('aria-expanded', 'true');
        }
        
        hamburger.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close menu when clicking on a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu when clicking outside navbar
        document.addEventListener('click', function(e) {
            if (!navLinks.classList.contains('active')) return;
            
            const isClickInsideNavLinks = navLinks.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            if (!isClickInsideNavLinks && !isClickOnHamburger) {
                closeMenu();
            }
        });
        
        // Close menu on window resize (if menu is open and screen becomes larger)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Scroll-triggered animations for sections from about to contact
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer for regular animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observer for stagger animations
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.skill-item, .testimonial-box, .certificate-box');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Observe elements with animation classes (excluding intro-banner)
    document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale').forEach(el => {
        // Skip if element is inside intro-banner
        if (!el.closest('#introBanner')) {
            animationObserver.observe(el);
        }
    });

    // Observe elements with stagger animation (excluding intro-banner)
    document.querySelectorAll('.stagger-animation').forEach(el => {
        // Skip if element is inside intro-banner
        if (!el.closest('#introBanner')) {
            staggerObserver.observe(el);
        }
    });
});

// Enhanced hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.skill-item, .testimonial-box, .certificate-box, .contact-partition');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Certificates Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.certificates-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const certificateBoxes = document.querySelectorAll('.certificate-box');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentPosition = 0;
    let autoSlideInterval;
    const boxWidth = 280 + 32; // certificate box width + gap
    const visibleBoxes = Math.floor(1200 / boxWidth); // max-width / box width
    const maxPosition = Math.max(0, certificateBoxes.length - visibleBoxes);
    
    function updateCarousel() {
        requestAnimationFrame(() => {
            track.style.transform = `translateX(-${currentPosition * boxWidth}px)`;
            
            // Update button states
            prevBtn.disabled = currentPosition === 0;
            nextBtn.disabled = currentPosition >= maxPosition;
        });
    }
    
    function nextSlide() {
        if (currentPosition < maxPosition) {
            currentPosition++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentPosition > 0) {
            currentPosition--;
            updateCarousel();
        }
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (currentPosition >= maxPosition) {
                currentPosition = 0; // Reset to beginning
            } else {
                currentPosition++;
            }
            updateCarousel();
        }, 6000); // Change every 6 seconds (increased from 4)
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    // Pause auto-slide on hover
    const carousel = document.querySelector('.certificates-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Initialize
    updateCarousel();
    startAutoSlide();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recalculate visible boxes and max position
        const newVisibleBoxes = Math.floor(1200 / boxWidth);
        const newMaxPosition = Math.max(0, certificateBoxes.length - newVisibleBoxes);
        
        if (currentPosition > newMaxPosition) {
            currentPosition = newMaxPosition;
        }
        
        updateCarousel();
    });
});


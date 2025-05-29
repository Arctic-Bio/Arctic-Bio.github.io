// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Typing effect variables
    const dynamicText = document.querySelector('.dynamic-text');
    const words = ["AI/ML Enthusiast", "Cybersecurity Researcher", "Philosopher", "Writer", "Athlete", "Critical Thinker", "Problem Solver", "Future College Student", "Lifelong Learner"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    // Project filtering variables
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Read more popup functionality
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const detailPopups = document.querySelectorAll('.detail-popup');
    const closePopupBtns = document.querySelectorAll('.close-popup');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Highlight active nav item on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Typing effect function
    function typeEffect() {
        // Current word being processed
        const currentWord = words[wordIndex];
        
        // If in deleting state, remove a character
        // Else add a character
        if (isDeleting) {
            dynamicText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // If word is complete, start deleting after delay
        if (!isDeleting && charIndex === currentWord.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(typeEffect, 2000); // Wait before deleting
        } 
        // If deleting is complete, move to next word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500); // Wait before typing next word
        } 
        // Normal typing or deleting speed
        else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    
    // Start the typing effect
    setTimeout(typeEffect, 1000);
    
    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            workItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.work-item, .sample-card, .timeline-item, .about-content > div');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation class to elements
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Form submission handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                // For this demo, we'll just show a success message
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message, ${name}! I'll get back to you soon.</p>
                `;
                
                // Replace form with success message
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Style success message
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '30px';
                
                // Style icon
                const icon = successMessage.querySelector('i');
                icon.style.fontSize = '3rem';
                icon.style.color = 'var(--primary-color)';
                icon.style.marginBottom = '20px';
                
                // Style message
                const paragraph = successMessage.querySelector('p');
                paragraph.style.fontSize = '1.2rem';
                paragraph.style.color = 'var(--text-color)';
            }
        });
    }
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Add animation class to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animate');
        }, 500);
    }
    
    // Dark mode functionality
    if (darkModeToggle) {
        // Check for saved theme preference or use preferred color scheme
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        // Apply saved theme or system preference
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        // Toggle dark mode on checkbox change
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Enhanced Popup functionality for Read More buttons
    if (readMoreBtns.length > 0) {
        // Open popup when Read More button is clicked
        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetPopup = document.getElementById(targetId);
                
                if (targetPopup) {
                    // Prevent body scrolling when popup is open
                    document.body.style.overflow = 'hidden';
                    
                    // Show popup with animation
                    targetPopup.classList.add('active');
                    
                    // Add a slight delay before showing content for smoother animation
                    setTimeout(() => {
                        targetPopup.querySelector('.popup-content').classList.add('show');
                    }, 100);
                    
                    // Add escape key functionality
                    document.addEventListener('keydown', function escapeClose(e) {
                        if (e.key === 'Escape') {
                            closePopup(targetPopup);
                            document.removeEventListener('keydown', escapeClose);
                        }
                    });
                    
                    // Close popup when clicking outside content
                    targetPopup.addEventListener('click', function(e) {
                        if (e.target === this) {
                            closePopup(targetPopup);
                        }
                    });
                }
            });
        });
        
        // Close popup when close button is clicked
        closePopupBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const popup = this.closest('.detail-popup');
                closePopup(popup);
            });
        });
        
        // Function to close popup with animation
        function closePopup(popup) {
            popup.querySelector('.popup-content').classList.remove('show');
            
            // Wait for animation to complete before hiding popup
            setTimeout(() => {
                popup.classList.remove('active');
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // Add CSS for animations that we'll use with JS
    const style = document.createElement('style');
    style.textContent = `
        .work-item, .sample-card, .timeline-item, .about-content > div {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .work-item.animate, .sample-card.animate, .timeline-item.animate, .about-content > div.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .hero-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .success-message {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
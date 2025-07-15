// ====================================
// MODERN MINIMALIST INTERACTIONS
// ====================================

// Powerful typing messages
const heroMessages = [
    "F*&K make america great again, lets make america greater than its ever been.",
    "Checks and balances shouldn't mean receiving checks and bank balances.",
    "Science, not politics, should guide our future.",
    "Education is the foundation of democracy.",
    "In every problem, science offers a solution.",
    "Let's build bridges with knowledge, not walls with ignorance.",
    "Progress through understanding, not division.",
    "Your voice matters - let's make it heard through evidence."
];

const subtitleMessages = [
    "A science-based approach to leadership",
    "Where evidence drives policy",
    "Building tomorrow through education",
    "Transparency in every decision",
    "Unity through understanding",
    "Making America greater than ever",
    "The future is built on facts",
    "Progress over politics"
];

// ====================================
// TYPING ANIMATION SYSTEM
// ====================================

class TypeWriter {
    constructor(titleElement, subtitleElement) {
        this.titleElement = titleElement;
        this.subtitleElement = subtitleElement;
        this.currentMessageIndex = 0;
        this.isTyping = false;
    }

    async typeText(element, text, speed = 50) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await this.wait(speed);
        }
    }

    async deleteText(element, speed = 30) {
        const text = element.textContent;
        for (let i = text.length; i > 0; i--) {
            element.textContent = text.substring(0, i - 1);
            await this.wait(speed);
        }
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async startTyping() {
        while (true) {
            const currentTitle = heroMessages[this.currentMessageIndex];
            const currentSubtitle = subtitleMessages[this.currentMessageIndex];
            
            // Type title
            await this.typeText(this.titleElement, currentTitle, 80);
            await this.wait(200);
            
            // Type subtitle
            await this.typeText(this.subtitleElement, currentSubtitle, 60);
            await this.wait(3000);
            
            // Delete subtitle first
            await this.deleteText(this.subtitleElement, 20);
            await this.wait(200);
            
            // Delete title
            await this.deleteText(this.titleElement, 40);
            await this.wait(500);
            
            this.currentMessageIndex = (this.currentMessageIndex + 1) % heroMessages.length;
        }
    }
}

// ====================================
// NAVIGATION SYSTEM
// ====================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.handleScroll();
        this.setupMobileNav();
        this.setupSmoothScroll();
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrolled = window.pageYOffset > 50;
        this.navbar.classList.toggle('scrolled', scrolled);
    }

    setupMobileNav() {
        this.navToggle.addEventListener('click', () => {
            this.navToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ====================================
// REVEAL ANIMATIONS
// ====================================

class RevealAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-reveal]');
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    this.observer.unobserve(entry.target);
                }, delay);
            }
        });
    }
}

// ====================================
// STATISTICS COUNTER
// ====================================

class StatsCounter {
    constructor() {
        this.statElements = document.querySelectorAll('.stat-number');
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.5 }
        );
        
        this.init();
    }

    init() {
        this.statElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                this.animateNumber(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(target * easeOutQuart);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// ====================================
// INTERACTIVE BUTTONS
// ====================================

class InteractiveButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.cta-button, .action-btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mouseenter', () => this.handleHover(button));
            button.addEventListener('mouseleave', () => this.handleLeave(button));
            button.addEventListener('click', (e) => this.handleClick(e, button));
        });
    }

    handleHover(button) {
        button.style.transform = 'translateY(-2px) scale(1.02)';
    }

    handleLeave(button) {
        button.style.transform = 'translateY(0) scale(1)';
    }

    handleClick(e, button) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// ====================================
// SMART INTERACTIONS
// ====================================

class SmartInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.addCardHoverEffects();
        this.addParallaxEffect();
        this.addKeyboardNavigation();
        this.addMouseTracker();
    }

    addCardHoverEffects() {
        const cards = document.querySelectorAll('.vision-card, .stat-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) rotateX(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0)';
                card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    addParallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        const orbs = document.querySelectorAll('.gradient-orb');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
            
            orbs.forEach((orb, index) => {
                const speed = 0.2 + (index * 0.1);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.scrollToNextSection();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.scrollToPrevSection();
            }
        });
    }

    addMouseTracker() {
        const hero = document.querySelector('.hero-section');
        
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth) * 100;
            const yPos = (clientY / innerHeight) * 100;
            
            hero.style.background = `
                radial-gradient(circle at ${xPos}% ${yPos}%, 
                rgba(220, 38, 38, 0.1) 0%, 
                transparent 50%),
                linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
            `;
        });
    }

    scrollToNextSection() {
        const sections = document.querySelectorAll('section');
        const currentPos = window.pageYOffset;
        
        for (let section of sections) {
            if (section.offsetTop > currentPos + 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }

    scrollToPrevSection() {
        const sections = [...document.querySelectorAll('section')].reverse();
        const currentPos = window.pageYOffset;
        
        for (let section of sections) {
            if (section.offsetTop < currentPos - 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }
}

// ====================================
// PERFORMANCE OPTIMIZATIONS
// ====================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeScrollEvents();
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    optimizeScrollEvents() {
        let ticking = false;
        
        const optimizedScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        link.as = 'style';
        document.head.appendChild(link);
    }
}

// ====================================
// PARTY SELECTOR SYSTEM
// ====================================

class PartySelector {
    constructor() {
        this.buttons = document.querySelectorAll('.party-btn');
        this.sections = document.querySelectorAll('.party-section');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.switchParty(button));
        });
    }

    switchParty(clickedButton) {
        const targetParty = clickedButton.getAttribute('data-party');
        
        // Update button states
        this.buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        clickedButton.classList.add('active');
        
        // Update section visibility
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(targetParty);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Add click effect
        this.createClickEffect(clickedButton);
    }

    createClickEffect(button) {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: partyClickEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 0;
        `;
        
        button.style.position = 'relative';
        button.appendChild(effect);
        
        setTimeout(() => effect.remove(), 600);
    }
}

// ====================================
// EASTER EGGS & INTERACTIONS
// ====================================

class EasterEggs {
    constructor() {
        this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        this.userInput = [];
        this.init();
    }

    init() {
        this.addKonamiCode();
        this.addClickEffects();
        this.addQuoteRotation();
    }

    addKonamiCode() {
        document.addEventListener('keydown', (e) => {
            this.userInput.push(e.keyCode);
            
            if (this.userInput.length > this.konamiCode.length) {
                this.userInput.shift();
            }
            
            if (this.userInput.length === this.konamiCode.length &&
                this.userInput.every((code, index) => code === this.konamiCode[index])) {
                this.activateSpecialMode();
            }
        });
    }

    activateSpecialMode() {
        document.body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
        
        // Add floating "Science!" text
        this.createFloatingText('Science!');
    }

    createFloatingText(text) {
        const floatingText = document.createElement('div');
        floatingText.textContent = text;
        floatingText.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-weight: 700;
            color: #dc2626;
            z-index: 10000;
            animation: floatUp 3s ease-out forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(floatingText);
        
        setTimeout(() => floatingText.remove(), 3000);
    }

    addClickEffects() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.vision-card, .stat-item')) {
                this.createSparkle(e.clientX, e.clientY);
            }
        });
    }

    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 10px;
            height: 10px;
            background: #dc2626;
            border-radius: 50%;
            animation: sparkle 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 600);
    }

    addQuoteRotation() {
        const quote = document.querySelector('.science-quote blockquote');
        if (!quote) return;
        
        const quotes = [
            "In almost every problem, a middle ground can be found through scientific approach and evidence-based policy making.",
            "Education and science are the twin engines that drive progress and create a better world for all of us.",
            "When we invest in scientific research and educational excellence, we invest in America's future.",
            "Facts don't care about your feelings, but they should guide your policies."
        ];
        
        let currentQuoteIndex = 0;
        
        setInterval(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quote.style.opacity = '0';
            
            setTimeout(() => {
                quote.textContent = quotes[currentQuoteIndex];
                quote.style.opacity = '1';
            }, 300);
        }, 8000);
    }
}

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes floatUp {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -80%) scale(0.5);
            }
        }
        
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1) rotate(180deg);
                opacity: 0;
            }
        }
        
        @keyframes partyClickEffect {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0.6;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize all systems
    const typewriter = new TypeWriter(
        document.getElementById('heroTitle'),
        document.getElementById('heroSubtitle')
    );
    
    const navigation = new Navigation();
    const revealAnimations = new RevealAnimations();
    const statsCounter = new StatsCounter();
    const interactiveButtons = new InteractiveButtons();
    const smartInteractions = new SmartInteractions();
    const performanceOptimizer = new PerformanceOptimizer();
    const partySelector = new PartySelector();
    const easterEggs = new EasterEggs();
    
    // Start typing animation after a brief delay
    setTimeout(() => {
        typewriter.startTyping();
    }, 1000);
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ====================================
// WINDOW LOAD OPTIMIZATIONS
// ====================================

window.addEventListener('load', () => {
    // Optimize performance after everything is loaded
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        orb.style.animationDelay = `${index * 2}s`;
    });
    
    // Preload next section content
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.willChange = 'transform, opacity';
            } else {
                entry.target.style.willChange = 'auto';
            }
        });
    });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all achievement cards
document.querySelectorAll('.achievement-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(card);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(item);
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(item);
});

// Add active class to navigation based on scroll position
let lastScrollPosition = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    // Header shadow on scroll
    if (currentScrollPosition > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
    
    // Active navigation link
    let current = '';
    const sections = document.querySelectorAll('.section, .hero');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    lastScrollPosition = currentScrollPosition;
});

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const suffix = element.dataset.suffix || '';
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 20);
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-item h3').forEach(stat => {
                const text = stat.textContent;
                const numbers = text.match(/\d+/);
                if (numbers) {
                    const target = parseInt(numbers[0]);
                    stat.dataset.suffix = text.replace(/\d+/g, '');
                    stat.textContent = '0' + stat.dataset.suffix;
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Parallax effect for hero background
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        if (scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Gallery lightbox effect (simple version)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.add('gallery-active');
        setTimeout(() => {
            item.classList.remove('gallery-active');
        }, 300);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add hover effect sound (optional - commented out by default)
/*
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0vBSh+zPDajzsKElyx6OyrWBUIQ5zd8sFuJAUuhM/z24k2CBhkuezooVARC0yl4fG5ZRwFNo3V7859LwUofsz');
document.querySelectorAll('.achievement-card, .gallery-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
    });
});
*/

console.log('Site des réalisations de Macky Sall chargé avec succès! 🇸🇳');


// Mascotte Lion qui suit le curseur/doigt
const lionMascot = document.querySelector('.lion-mascot');
let mouseX = 0;
let mouseY = 0;
let lionX = 0;
let lionY = 0;
const speed = 0.1; // Vitesse de suivi (plus petit = plus lent et fluide)

// Suivre la souris sur ordinateur
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Suivre le doigt sur mobile
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }
});

// Animation fluide du lion
function animateLion() {
    // Interpolation pour un mouvement fluide
    lionX += (mouseX - lionX) * speed;
    lionY += (mouseY - lionY) * speed;
    
    // Positionner le lion avec un léger décalage pour ne pas cacher le curseur
    lionMascot.style.left = (lionX + 20) + 'px';
    lionMascot.style.top = (lionY + 20) + 'px';
    
    requestAnimationFrame(animateLion);
}

// Démarrer l'animation
animateLion();

// Initialiser la position du lion au centre de l'écran
window.addEventListener('load', () => {
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;
    lionX = mouseX;
    lionY = mouseY;
});


// Gestion des images manquantes avec placeholder élégant
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Créer un placeholder SVG pour les images manquantes
        img.addEventListener('error', function() {
            const parent = this.parentElement;
            const altText = this.alt || 'Image';
            
            // Créer un SVG placeholder
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1a7f37 0%, #0d5c29 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: white;
                font-size: 1rem;
                text-align: center;
                padding: 2rem;
            `;
            
            placeholder.innerHTML = `
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity: 0.5; margin-bottom: 1rem;">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p style="opacity: 0.8; font-size: 0.9rem;">${altText}</p>
                <p style="opacity: 0.6; font-size: 0.75rem; margin-top: 0.5rem;">Image à ajouter</p>
            `;
            
            // Remplacer l'image par le placeholder
            this.style.display = 'none';
            parent.insertBefore(placeholder, this);
        });
    });
});

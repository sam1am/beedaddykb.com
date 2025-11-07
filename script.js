// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(139, 101, 8, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(139, 101, 8, 0.15)';
    }

    // Hide/Show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Email Obfuscation - Click to Reveal with Multiple Layers
document.querySelectorAll('.email-reveal').forEach(button => {
    // Prevent right-click inspect on email button
    button.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    button.addEventListener('click', function() {
        // Decode the obfuscated email parts
        const p1 = this.dataset.info;
        const p2 = this.dataset.service;

        // Multiple decode layers for maximum protection
        // Layer 1: Base64 decode
        const decoded1 = atob(p1);
        const decoded2 = atob(p2);

        // Layer 2: Character code construction for extra security
        const connector = String.fromCharCode(64); // @ symbol
        const suffix = String.fromCharCode(46, 99, 111, 109); // .com

        // Construct email with protection against string analysis
        const email = [decoded1, connector, decoded2, suffix].join('');

        const hiddenSpan = this.querySelector('.hidden-email');
        const revealedSpan = this.querySelector('.revealed-email');

        if (hiddenSpan.style.display !== 'none') {
            hiddenSpan.style.display = 'none';
            revealedSpan.style.display = 'inline';
            revealedSpan.textContent = email;

            // Copy to clipboard functionality
            navigator.clipboard.writeText(email).then(() => {
                // Visual feedback
                const originalBg = this.style.background;
                this.style.background = 'var(--honey-gold)';
                this.style.color = 'white';

                setTimeout(() => {
                    this.style.background = originalBg;
                    this.style.color = '';
                }, 1000);

                // Tooltip
                const tooltip = document.createElement('span');
                tooltip.textContent = 'Copied!';
                tooltip.style.cssText = `
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--dark-amber);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    animation: fadeOut 2s ease forwards;
                `;
                this.style.position = 'relative';
                this.appendChild(tooltip);

                setTimeout(() => tooltip.remove(), 2000);
            });
        }
    });
});

// Animate Elements on Scroll with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Add stagger effect for grid items
            if (entry.target.classList.contains('product-card')) {
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
            }

            // Animate timeline items
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.classList.add('animate');
            }

            // Animate honeycomb dividers
            if (entry.target.classList.contains('honeycomb-divider')) {
                const hexes = entry.target.querySelectorAll('.hex');
                hexes.forEach((hex, index) => {
                    setTimeout(() => {
                        hex.style.opacity = '1';
                        hex.style.transform = 'scale(1)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    card.dataset.delay = index * 100;
    observer.observe(card);
});

document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    card.style.transitionDelay = `${index * 150}ms`;
    observer.observe(card);
});

// Prepare honeycomb dividers for animation
document.querySelectorAll('.honeycomb-divider').forEach(divider => {
    const hexes = divider.querySelectorAll('.hex');
    hexes.forEach(hex => {
        hex.style.opacity = '0';
        hex.style.transform = 'scale(0)';
        hex.style.transition = 'all 0.5s ease';
    });
    observer.observe(divider);
});

// Parallax Effect for Multiple Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Hero image parallax
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const parallax = scrolled * 0.5;
        heroImage.style.transform = `translateY(${parallax}px)`;
    }

    // Background shapes parallax
    const honeycombPattern = document.querySelector('.honeycomb-pattern');
    if (honeycombPattern) {
        const parallax = scrolled * 0.1;
        honeycombPattern.style.transform = `translateY(${parallax}px)`;
    }
});

// Advanced Hover Effects for Product Cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Add floating bee animation
function createBee() {
    const bee = document.createElement('div');
    bee.className = 'floating-bee';
    bee.textContent = '🐝';
    bee.style.cssText = `
        position: fixed;
        font-size: 20px;
        z-index: 10;
        pointer-events: none;
        animation: fly 15s linear;
    `;

    // Random starting position
    const startSide = Math.random() > 0.5 ? 'left' : 'right';
    const startY = Math.random() * window.innerHeight;

    if (startSide === 'left') {
        bee.style.left = '-50px';
        bee.style.animationName = 'flyRight';
    } else {
        bee.style.right = '-50px';
        bee.style.animationName = 'flyLeft';
    }

    bee.style.top = startY + 'px';

    document.body.appendChild(bee);

    // Remove bee after animation
    setTimeout(() => {
        bee.remove();
    }, 15000);
}

// Add CSS for bee animation
const style = document.createElement('style');
style.textContent = `
    @keyframes flyRight {
        from {
            left: -50px;
            transform: translateY(0);
        }
        25% {
            transform: translateY(-30px);
        }
        50% {
            transform: translateY(30px);
        }
        75% {
            transform: translateY(-20px);
        }
        to {
            left: calc(100% + 50px);
            transform: translateY(0);
        }
    }

    @keyframes flyLeft {
        from {
            right: -50px;
            transform: translateY(0) scaleX(-1);
        }
        25% {
            transform: translateY(-30px) scaleX(-1);
        }
        50% {
            transform: translateY(30px) scaleX(-1);
        }
        75% {
            transform: translateY(-20px) scaleX(-1);
        }
        to {
            right: calc(100% + 50px);
            transform: translateY(0) scaleX(-1);
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
    }

    @keyframes popIn {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    /* Loading Shimmer Effect */
    .loading-shimmer {
        position: relative;
        overflow: hidden;
    }

    .loading-shimmer::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
        );
        animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;
document.head.appendChild(style);

// Create occasional flying bees
setInterval(() => {
    if (Math.random() > 0.7) {
        createBee();
    }
}, 10000);

// Honeycomb pattern mouse interaction
document.addEventListener('mousemove', (e) => {
    const honeycombPattern = document.querySelector('.honeycomb-pattern');
    if (honeycombPattern) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;

        honeycombPattern.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Number Counter Animation for Stats
const animateNumbers = () => {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const updateCount = () => {
            // Get target from data attribute
            const target = parseInt(stat.dataset.target);
            const count = parseInt(stat.dataset.count || 0);
            const increment = Math.max(1, target / 100);

            if (count < target) {
                stat.dataset.count = Math.ceil(count + increment);
                const display = parseInt(stat.dataset.count);

                // Format display based on size
                if (target >= 10000) {
                    const thousands = Math.floor(display / 1000);
                    stat.textContent = thousands + 'K';
                } else {
                    stat.textContent = display;
                }
                setTimeout(updateCount, 20);
            } else {
                // Final display - ensure exact target is shown
                if (target >= 10000) {
                    const thousands = Math.floor(target / 1000);
                    stat.textContent = thousands + 'K';
                } else {
                    stat.textContent = target;
                }
            }
        };

        // Start animation when element is in view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !stat.dataset.animated) {
                    stat.dataset.animated = true;
                    updateCount();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(stat);
    });
};

animateNumbers();

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Typing effect for hero title
const heroTitle = document.querySelector('.title-line-2');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.minHeight = '1.2em'; // Prevent layout shift

    let index = 0;
    const typeWriter = () => {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    };

    // Wait for other animations to start
    setTimeout(typeWriter, 800);
}

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            animation: zoomIn 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.querySelector('.lightbox')) {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
            }
        });
    });
});

// Add necessary animations to stylesheet
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes zoomIn {
        from { transform: scale(0.8); }
        to { transform: scale(1); }
    }
`;
document.head.appendChild(additionalStyles);

// Advanced scroll-based reveal for images
const imageReveal = () => {
    const images = document.querySelectorAll('.about-image img, .floating-image');

    images.forEach(img => {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.filter = 'blur(0)';
                    entry.target.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.3 });

        img.style.opacity = '0';
        img.style.filter = 'blur(10px)';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'all 1s ease';

        imageObserver.observe(img);
    });
};

imageReveal();

// Console Easter Egg with ASCII Art
console.log(`
%c
    __    __
   |  \\  /  |
    \\  \\/  /
     |    |
    /  /\\  \\
   |__/  \\__|

   BEE DADDY KB
`, 'color: #D4A574; font-weight: bold;');
console.log('%cCrafted with love, honey, and JavaScript', 'font-size: 14px; color: #B8860B;');
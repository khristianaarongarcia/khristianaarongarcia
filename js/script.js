// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const words = ['Full Stack Developer', 'Software Engineer', 'Web Developer', 'Mobile App Engineer', 'AI Expert'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active Navigation on Scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for Safari
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler with Formspree
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Success
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#22c55e';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Error
        submitBtn.textContent = 'Error! Try Again';
        submitBtn.style.background = '#ef4444';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-card, .service-card, .portfolio-category, .skill-item').forEach(el => {
    observer.observe(el);
});

// Add animation styles dynamically
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .value-card, .service-card, .portfolio-category, .skill-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .value-card.animate, .service-card.animate, .portfolio-category.animate, .skill-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .value-card:nth-child(1) { transition-delay: 0.1s; }
    .value-card:nth-child(2) { transition-delay: 0.2s; }
    .value-card:nth-child(3) { transition-delay: 0.3s; }
    .value-card:nth-child(4) { transition-delay: 0.4s; }
    
    .service-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2) { transition-delay: 0.2s; }
    .service-card:nth-child(3) { transition-delay: 0.3s; }
    
    .portfolio-category:nth-child(1) { transition-delay: 0.1s; }
    .portfolio-category:nth-child(2) { transition-delay: 0.2s; }
    .portfolio-category:nth-child(3) { transition-delay: 0.3s; }
    .portfolio-category:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(animationStyles);

// ===== PORTFOLIO MODAL =====
const portfolioModal = document.getElementById('portfolio-modal');
const modalIframe = document.getElementById('modal-iframe');
const modalTitle = document.querySelector('.modal-title');
const modalExternalLink = document.getElementById('modal-external-link');
const modalClose = document.querySelector('.modal-close');
const projectsGrid = document.getElementById('projects-grid');
const comingSoon = document.getElementById('coming-soon');
const singleProjectView = document.getElementById('single-project-view');
const backToGridBtn = document.querySelector('.back-to-grid');

// Category data
const categoryTitles = {
    'web-dev': 'Web Development Projects',
    'fullstack': 'Full Stack Development Projects',
    'mobile': 'Mobile App Development Projects',
    'automation': 'n8n Automation Projects'
};

const categoryHasProjects = {
    'web-dev': true,
    'fullstack': false,
    'mobile': false,
    'automation': false
};

// Open modal when clicking a category
document.querySelectorAll('.portfolio-category').forEach(category => {
    category.addEventListener('click', () => {
        const categoryType = category.getAttribute('data-category');
        
        modalTitle.textContent = categoryTitles[categoryType];
        
        // Show projects grid or coming soon based on category
        if (categoryHasProjects[categoryType]) {
            projectsGrid.style.display = 'grid';
            comingSoon.style.display = 'none';
        } else {
            projectsGrid.style.display = 'none';
            comingSoon.style.display = 'block';
        }
        
        // Always hide single project view initially
        singleProjectView.style.display = 'none';
        
        portfolioModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Open single project view when clicking a project card
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const url = card.getAttribute('data-url');
        const title = card.getAttribute('data-title');
        
        modalTitle.textContent = title;
        modalIframe.src = url;
        modalExternalLink.href = url;
        
        projectsGrid.style.display = 'none';
        singleProjectView.style.display = 'flex';
    });
});

// Back to projects grid
backToGridBtn.addEventListener('click', () => {
    modalIframe.src = ''; // Stop loading
    singleProjectView.style.display = 'none';
    projectsGrid.style.display = 'grid';
    modalTitle.textContent = 'Web Development Projects';
});

// Close modal
function closeModal() {
    portfolioModal.classList.remove('active');
    modalIframe.src = ''; // Stop loading iframe
    document.body.style.overflow = ''; // Restore scroll
    
    // Reset views
    setTimeout(() => {
        singleProjectView.style.display = 'none';
        projectsGrid.style.display = 'grid';
    }, 300);
}

modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside content
portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
        closeModal();
    }
});

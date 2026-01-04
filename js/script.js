// ===========================
// Particle Animation
// ===========================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        const colors = [
            { r: 0, g: 217, b: 255 },      // Cyan
            { r: 189, g: 107, b: 255 },    // Purple
            { r: 255, g: 107, b: 157 },    // Pink
            { r: 255, g: 182, b: 39 },     // Yellow
            { r: 0, g: 255, b: 148 }       // Green
        ];
        
        for (let i = 0; i < this.particleCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * 3 + 1;
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = (Math.random() - 0.5) * 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            this.particles.push({ x, y, size, speedX, speedY, color });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, i) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Draw particle
            const alpha = 0.3 + Math.random() * 0.7;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`;
            this.ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = particle.x - this.particles[j].x;
                const dy = particle.y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = 0.3 * (1 - distance / 120);
                    const avgColor = {
                        r: Math.floor((particle.color.r + this.particles[j].color.r) / 2),
                        g: Math.floor((particle.color.g + this.particles[j].color.g) / 2),
                        b: Math.floor((particle.color.b + this.particles[j].color.b) / 2)
                    };
                    this.ctx.strokeStyle = `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
            
            // Mouse interaction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.x += Math.cos(angle) * force * 2;
                    particle.y += Math.sin(angle) * force * 2;
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===========================
// Navigation
// ===========================
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkElements = document.querySelectorAll('.nav-link');

// Scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Counter Animation
// ===========================
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 300);
                });
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(element => {
    observer.observe(element);
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach(element => {
    observer.observe(element);
});

// ===========================
// Projects Loading & Filtering
// ===========================
let allProjects = [];

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        allProjects = await response.json();
        displayProjects(allProjects);
    } catch (error) {
        console.error('Error loading projects:', error);
        displayProjectsPlaceholder();
    }
}

// Display projects
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    
    // Reverse projects so newer ones (higher ID) show up first
    const reversedProjects = [...projects].reverse();
    
    reversedProjects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-aos', 'fade-up');
        projectCard.style.cursor = 'pointer';
        
        // Hide projects after the first 3
        if (index >= 3) {
            projectCard.classList.add('hidden');
        }
        
        projectCard.innerHTML = `
            <div class="project-image">
                ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image-img">` : `<div class="project-image-placeholder">
                    ${getProjectIcon(project.title)}
                </div>`}
            </div>
            <div class="project-content">
                <div class="project-meta">
                    <span class="project-year">${project.year}${project.age ? ` • Age ${project.age}` : ''}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    ${project.links && project.links.length > 0 ? project.links.map(link => `<a href="${link.url}" class="project-link" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        ${link.title}
                    </a>`).join('') : ''}
                </div>
            </div>
        `;
        
        // Add click handler to open modal
        projectCard.addEventListener('click', () => openProjectModal(project));
        
        projectsGrid.appendChild(projectCard);
        observer.observe(projectCard);
    });
    
    // Show/hide view more button
    const viewMoreBtn = document.getElementById('view-more-btn');
    if (projects.length > 3) {
        viewMoreBtn.style.display = 'inline-block';
        viewMoreBtn.textContent = 'View More Archives';
        viewMoreBtn.onclick = () => {
            const hiddenCards = document.querySelectorAll('.project-card.hidden');
            if (hiddenCards.length > 0) {
                hiddenCards.forEach(card => card.classList.remove('hidden'));
                projectsGrid.classList.add('expanded');
                viewMoreBtn.textContent = 'Show Less';
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            } else {
                const allCards = document.querySelectorAll('.project-card');
                allCards.forEach((card, index) => {
                    if (index >= 3) {
                        card.classList.add('hidden');
                    }
                });
                projectsGrid.classList.remove('expanded');
                viewMoreBtn.textContent = 'View More Archives';
            }
        };
    } else {
        viewMoreBtn.style.display = 'none';
    }
}

// Get icon based on title keywords
function getProjectIcon(title) {
    const lower = title.toLowerCase();
    if (lower.includes('robot') || lower.includes('frc')) return '🤖';
    if (lower.includes('haunted') || lower.includes('house')) return '🎃';
    if (lower.includes('3d') || lower.includes('print')) return '🖨️';
    if (lower.includes('music') || lower.includes('composition')) return '🎵';
    if (lower.includes('cad') || lower.includes('model')) return '📐';
    if (lower.includes('website') || lower.includes('portfolio')) return '🌐';
    if (lower.includes('controller') || lower.includes('automation')) return '⚙️';
    return '💡';
}

// Display placeholder projects if JSON fails to load
function displayProjectsPlaceholder() {
    allProjects = [
        {
            id: 1,
            title: "FRC Competition Robot",
            description: "Leading my team in designing and building a competitive robot for FIRST Robotics Competition.",
            category: "robotics",
            tags: ["FRC", "Java", "CAD"],
            github: null,
            demo: null,
            fullDescription: "As team captain, I led the design and build of our FRC competition robot, incorporating innovative mechanisms and reliable systems.",
            features: ["Custom mechanisms", "Autonomous programming", "Team leadership"],
            technologies: ["Java", "WPILib", "SolidWorks", "REV Robotics"]
        },
        {
            id: 2,
            title: "Haunted House Design",
            description: "Seasonal immersive horror experience with custom animatronics and effects.",
            category: "creative",
            tags: ["Design", "Arduino", "Experience"],
            github: null,
            demo: "#",
            fullDescription: "Designed and built a multi-room haunted house featuring custom animatronics, lighting, and interactive scares.",
            features: ["Motion-triggered effects", "Custom props", "Immersive storytelling"],
            technologies: ["Arduino", "Pneumatics", "Prop Design", "Audio"]
        },
        {
            id: 3,
            title: "3D Printed Designs",
            description: "Collection of functional robot parts and artistic pieces.",
            category: "design",
            tags: ["3D Printing", "CAD", "Design"],
            github: null,
            demo: null,
            fullDescription: "A portfolio of 3D printed designs ranging from functional robot components to artistic sculptures.",
            features: ["Custom robot parts", "Artistic sculptures", "Functional mechanisms"],
            technologies: ["Fusion 360", "PrusaSlicer", "FDM Printing"]
        }
    ];
    displayProjects(allProjects);
}

// ===========================
// Contact Form
// ===========================
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ===========================
// Project Modal
// ===========================
function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const imageContainer = document.getElementById('modal-image-container');
    
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-year').textContent = project.year;
    document.getElementById('modal-description').textContent = project.description;
    
    // Display image if available
    if (project.image) {
        imageContainer.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
    } else {
        imageContainer.innerHTML = '';
    }
    
    const linksContainer = document.getElementById('modal-links');
    linksContainer.innerHTML = '';
    
    if (project.links && project.links.length > 0) {
        project.links.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.target = '_blank';
            anchor.rel = 'noopener';
            anchor.className = 'modal-link';
            anchor.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> ${link.title}`;
            linksContainer.appendChild(anchor);
        });
    }
    
    modal.classList.add('active');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
}

// ===========================
// Initialize
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const loadingPage = document.getElementById('loading-page');
    
    // Initialize particle system
    const particlesCanvas = document.getElementById('particles-canvas');
    if (particlesCanvas) {
        new ParticleSystem(particlesCanvas);
    }

    // Hero video → photo transition
    const heroVideo = document.getElementById('hero-video');
    const heroPhoto = document.getElementById('hero-photo');
    let videoLoaded = false;
    
    if (heroVideo && heroPhoto) {
        const revealPhoto = () => {
            heroVideo.classList.add('is-hidden');
            heroPhoto.classList.add('is-visible');
            videoLoaded = true;
            hideLoadingPage();
        };

        // If no video source is configured, show the photo immediately
        if (!heroVideo.getAttribute('src')) {
            revealPhoto();
        } else {
            // Mark video as loaded when it can play
            heroVideo.addEventListener('canplay', () => {
                videoLoaded = true;
                hideLoadingPage();
            });
        }

        heroVideo.addEventListener('ended', revealPhoto);
        heroVideo.addEventListener('error', revealPhoto);

        const playAttempt = heroVideo.play();
        if (playAttempt && typeof playAttempt.catch === 'function') {
            playAttempt.catch(revealPhoto);
        }
    }
    
    // Load projects
    loadProjects();
    
    // Hide loading page after all resources load
    function hideLoadingPage() {
        if (loadingPage) {
            loadingPage.classList.add('hidden');
        }
    }
    
    // Fallback: hide loading after 5 seconds
    setTimeout(() => {
        if (loadingPage && !loadingPage.classList.contains('hidden')) {
            hideLoadingPage();
        }
    }, 5000);
    
    // Hide loading when window fully loads
    window.addEventListener('load', () => {
        if (loadingPage && !loadingPage.classList.contains('hidden')) {
            hideLoadingPage();
        }
    });
    
    // Modal event listeners
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    
    closeBtn.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
});

// ===========================
// HOW TO ADD NEW PROJECTS
// ===========================
/*
To add a new project to your portfolio:

1. Open the file: data/projects.json
2. Add a new project object with this simple structure:

{
    "id": 9,
    "title": "Your Project Title",
    "description": "A brief description of your project",
    "year": "2024",
    "image": "https://via.placeholder.com/600x400",
    "links": {
        "github": "https://github.com/yourusername/project",
        "demo": "https://yourproject-demo.com",
        "website": null
    }
}

3. Save the file and refresh - your new project will appear!

Notes:
- "id" must be unique
- "year" can be any string (e.g., "2024", "2023-2024")
- All fields in "links" are optional - use null if not available
- Projects display in order of appearance in the JSON file
*/
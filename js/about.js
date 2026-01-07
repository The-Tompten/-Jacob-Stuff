// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Counter Animation
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

// Stats setup
const statCalculators = {
    'years-robotics': () => {
        const currentYear = new Date().getFullYear();
        const startYear = 2018;
        return Math.max(0, currentYear - startYear);
    },
    'projects-total': (projects) => projects?.length || 0,
    'projects-robotics': (projects) =>
        (projects || []).filter(project => project.category === 'robotics').length,
    'categories-total': (projects) => {
        if (!projects) return 0;
        const categories = projects
            .map(project => project.category)
            .filter(Boolean);
        return new Set(categories).size;
    }
};

const setStatTarget = (element, value) => {
    if (!element) return;
    const safeValue = Number.isFinite(value) ? value : 0;
    element.setAttribute('data-target', safeValue);
    element.textContent = '0';
};

const initializeStats = async () => {
    const statElements = document.querySelectorAll('[data-stat]');

    // Always set the years stat immediately
    const yearsElement = document.querySelector('[data-stat="years-robotics"]');
    setStatTarget(yearsElement, statCalculators['years-robotics']());

    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();

        statElements.forEach(element => {
            const key = element.getAttribute('data-stat');
            const calculator = statCalculators[key];
            if (calculator) {
                setStatTarget(element, calculator(projects));
            }
        });
    } catch (error) {
        console.error('Unable to load projects for stats:', error);
        // Leave any already-set stats; others remain at 0
    }
};

// Intersection Observer for Animations
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
        }
    });
}, observerOptions);

const observeAnimatedElements = () => {
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
};

const observeStatNumbers = () => {
    document.querySelectorAll('.stat-number').forEach(element => {
        observer.observe(element);
    });
};

initializeStats().finally(() => {
    observeAnimatedElements();
    observeStatNumbers();
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
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
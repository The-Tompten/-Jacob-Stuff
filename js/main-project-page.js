const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        if (!mobileMenuToggle || !navLinks) {
            return;
        }

        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    if (!navbar) {
        return;
    }

    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

window.addEventListener('load', () => {
    const loadingPage = document.getElementById('loading-page');
    if (!loadingPage) {
        return;
    }

    // Delay slightly so the transition is visible and consistent with the main page.
    window.setTimeout(() => {
        loadingPage.classList.add('hidden');
    }, 250);
});

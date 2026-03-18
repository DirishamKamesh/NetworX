/*
 * frontend/js/script.js
 * Interactivity for NetworX index page
 * - Mobile menu toggle
 * - Smooth scrolling for anchor links
 * - Basic form validation for newsletter and create project forms
 * - Dark / Light theme toggle (persisted to localStorage)
 */

document.addEventListener('DOMContentLoaded', function () {
    // Elements (may not exist on every page) are selected defensively
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // MOBILE MENU TOGGLE
    // Toggles the `nav-open` class on body which controls the visibility of the menu in CSS
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            body.classList.toggle('nav-open');
        });
    }

    // SMOOTH SCROLL
    // Intercept internal anchor links and use smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            // Only handle same-page anchors
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile nav after clicking a link
                    if (body.classList.contains('nav-open')) {
                        body.classList.remove('nav-open');
                        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // THEME TOGGLE (dark/light)
    // Uses `data-theme` attribute on <html> and persists choice to localStorage
    const root = document.documentElement;
    const THEME_KEY = 'nx-theme';

    function applyTheme(theme) {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
            if (themeToggle) themeToggle.setAttribute('aria-pressed', 'false');
        } else {
            root.removeAttribute('data-theme');
            if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
        }
    }

    // Load saved theme or detect prefers-color-scheme
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) applyTheme(saved);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            // Toggle between light and dark
            const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next === 'light' ? 'light' : 'dark');
            localStorage.setItem(THEME_KEY, next === 'light' ? 'light' : 'dark');
        });
    }

    // BASIC FORM VALIDATION for newsletterForm and createProjectForm
    // Adds simple client-side checks and shows inline messages
    function attachFormValidation(formId, rules) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function (e) {
            let valid = true;
            // Remove previous errors
            form.querySelectorAll('.form-error').forEach(n => n.remove());

            Object.keys(rules).forEach(function (name) {
                const input = form.querySelector('[name="' + name + '"]');
                if (!input) return;
                const rule = rules[name];
                const val = (input.value || '').trim();

                if (rule.required && !val) {
                    valid = false;
                    const err = document.createElement('div');
                    err.className = 'form-error';
                    err.style.color = '#ffb4b4';
                    err.style.marginTop = '6px';
                    err.textContent = rule.message || 'This field is required';
                    input.insertAdjacentElement('afterend', err);
                }

                if (rule.type === 'email' && val) {
                    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRe.test(val)) {
                        valid = false;
                        const err = document.createElement('div');
                        err.className = 'form-error';
                        err.style.color = '#ffb4b4';
                        err.style.marginTop = '6px';
                        err.textContent = rule.message || 'Please provide a valid email';
                        input.insertAdjacentElement('afterend', err);
                    }
                }
            });

            if (!valid) {
                e.preventDefault();
                // Scroll to first error for visibility
                const firstErr = form.querySelector('.form-error');
                if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Attach to newsletter example
    attachFormValidation('newsletterForm', {
        email: { required: true, type: 'email', message: 'Please enter a valid email address.' }
    });

    // Attach to create project form (if present)
    attachFormValidation('createProjectForm', {
        title: { required: true, message: 'Please enter a project title.' },
        description: { required: true, message: 'Please add a description.' }
    });

    // Small UX enhancement: collapse mobile nav if clicking outside
    document.addEventListener('click', function (e) {
        if (!body.classList.contains('nav-open')) return;
        const nav = document.getElementById('primaryNav');
        if (!nav) return;
        if (!nav.contains(e.target) && !e.target.closest('#mobileMenuBtn')) {
            body.classList.remove('nav-open');
            if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
        }
    });

    /* -----------------------------
       Scroll/Entrance animations
       Uses IntersectionObserver to add `.in-view` to elements with `.animate` or `.stagger`.
       ----------------------------- */
    const observerOptions = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 };
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // If we want the animation to run only once, unobserve it
                io.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe hero content and hero illustration
    document.querySelectorAll('.animate, .stagger > *').forEach(el => io.observe(el));

    // Add animate classes to items that should animate by default
    // Hero content and features
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) heroContent.classList.add('animate');

    const heroIll = document.querySelector('.hero-illustration');
    if (heroIll) { heroIll.classList.add('float','animate'); io.observe(heroIll); }

    // Stagger feature cards
    const features = document.querySelectorAll('.features-grid article');
    features.forEach((card, idx) => {
        card.classList.add('animate');
        // set a CSS variable used to stagger (if desired)
        card.style.setProperty('--i', idx);
        io.observe(card);
    });

    // If no `.animate` elements exist on the page, add `.animate` to a sensible default
    // This ensures pages without explicit markup still get entrance animations
    if (document.querySelectorAll('.animate').length === 0) {
        const fallback = document.querySelector('main') || document.querySelector('section') || document.querySelector('body');
        if (fallback) {
            fallback.classList.add('animate');
            io.observe(fallback);
        }
    }

    /* -----------------------------
       Button ripple effect
       Adds a temporary ripple span on click for buttons with `.ripple` class
       ----------------------------- */
    document.querySelectorAll('.btn').forEach(btn => {
        // make ripples optional by treating every .btn as ripple-enabled
        btn.classList.add('ripple');
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const size = Math.max(rect.width, rect.height) * 1.2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            // remove after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

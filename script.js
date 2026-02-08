document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });




    // Carousel Logic
    const slides = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Wrap around logic
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        // Hide all slides (simple implementation for this structure)
        const slideContainer = document.querySelector('.carousel-slide');
        if (slideContainer) {
            slideContainer.style.transform = `translateX(-${index * 100}%)`;
        }

        // Update dots
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        }

        currentSlide = index;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    // Dot navigation
    if (dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showSlide(index);
            });
        });
    }

    // Auto-advance carousel
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Resize event to fix carousel alignment
    window.addEventListener('resize', () => {
        showSlide(currentSlide);
    });

    // Contact Form Logic (Mailto)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            const destinationEmail = "jhonsanabria407@gmail.com";
            const subject = encodeURIComponent("Contratar para evento - Sebastián Sanabria");
            const body = encodeURIComponent(
                `Hola, soy ${name}.\n\n` +
                `Quisiera contratarte para un evento:\n` +
                `${message}\n\n` +
                `Por favor contáctame al correo: ${email}\n` +
                `Saludos.`
            );

            // Check if mobile device
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile) {
                // Mobile: Open default mail app
                window.location.href = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
            } else {
                // PC/Desktop: Force open Gmail in new tab
                const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${destinationEmail}&su=${subject}&body=${body}`;
                window.open(gmailLink, '_blank');
            }
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Preloader Logic
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Particles Animation
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const numberOfParticles = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = 'rgba(212, 175, 55, 0.6)'; // Goldish color, higher opacity
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.01; // Fade out effect
                if (this.size <= 0.2) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 3 + 1;
                }
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });
    }

});

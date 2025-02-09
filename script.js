document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeSwitch.checked = savedTheme === 'dark';
    } else if (systemPrefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }

    // Theme toggle event listener
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('portfolio-theme', 'light');
        }
    });

    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // EmailJS Initialization
    (function(){
        emailjs.init("NgE9ilt3CjvWfIjJY"); // Replace with your actual EmailJS User ID
    })();

    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // EmailJS parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        // Send email using EmailJS
        emailjs.send('service_9vkkaav', 'template_q6zaobe', templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Merci pour votre message ! Je vous répondrai bientôt.');
                
                // Clear form fields
                contactForm.reset();
            }, (error) => {
                console.log('FAILED...', error);
                alert('Désolé, une erreur est survenue. Veuillez réessayer.');
            });
    });

    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Enhanced competence hover effects
    const competences = document.querySelectorAll('.competence');
    competences.forEach(competence => {
        competence.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
            this.style.boxShadow = '0 10px 15px rgba(0,0,0,0.15)';
        });

        competence.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
});
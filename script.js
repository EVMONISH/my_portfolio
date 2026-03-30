// Typewriter Effect Variables
const words = ["Full Stack Developer", "Freelancer", "Designer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector(".typewriter");

function type() {
    if(!typewriterElement) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
}

// Ensure smooth loading experience and initialization
window.addEventListener('load', () => {
    // 1. Remove Preloader after fixed delay to showcase the 3D Animation nicely
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.remove('loading-state');
        
        // Remove completely after fading
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
        
        // 2. Initialize AOS (Animate on Scroll) AFTER loading screen vanishes
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-in-out-cubic',
        });
        
        // 3. Start Typewriter
        setTimeout(type, 800);
    }, 2500); // 2.5 seconds minimum visual time for preloader branding
});

// Initialization of Themes and Navbar
document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update Icon with custom glows for light/dark
        if(theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeIcon.classList.replace('text-dark', 'text-white');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeIcon.classList.replace('text-white', 'text-dark');
        }
    }

    // Navbar scroll effect active link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

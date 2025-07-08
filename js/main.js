// js/main.js
document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('section');

    // --- Change header background on scroll ---
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // --- Update active nav link on scroll ---
    const updateActiveLink = () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // The '150' is an offset to ensure the link activates a bit before the section top hits the very top of the viewport
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    // --- EVENT LISTENERS ---
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        updateActiveLink();
    });
    
    // Set the Home link as active on initial load
    updateActiveLink();

});

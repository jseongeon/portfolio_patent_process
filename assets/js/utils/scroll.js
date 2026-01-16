// Scroll utilities
export function initSmoothScroll() {
    // Smooth scroll for navigation
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
}

export function initParallax() {
    // Parallax effect for images
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.macbook-image');
        
        parallaxElements.forEach(element => {
            const rate = scrolled * 0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

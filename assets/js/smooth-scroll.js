// Smooth scrolling for anchor links
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process if it's a same-page anchor (not empty or #)
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const navMenu = document.getElementById('navMenu');
                    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (mobileMenuToggle) {
                            const spans = mobileMenuToggle.querySelectorAll('span');
                            spans[0].style.transform = 'none';
                            spans[1].style.opacity = '1';
                            spans[2].style.transform = 'none';
                        }
                    }
                }
            }
        });
    });
}
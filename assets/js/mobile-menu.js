// Mobile Menu Toggle functionality
export function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}
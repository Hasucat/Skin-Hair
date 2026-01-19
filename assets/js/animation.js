// Animation and scroll effects
export function initAnimations() {
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Add scroll effects
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
            
            if (scrollTop > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
}
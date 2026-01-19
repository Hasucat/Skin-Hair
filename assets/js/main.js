// Main entry point - imports all modules and initializes them
import { initMobileMenu } from './mobile-menu.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initForms } from './forms.js';
import { initAnimations } from './animations.js';
import { updateCurrentYear } from './utils.js';
import { supabase, testConnection } from './supabase-client.js'

// Initialize everything when DOM is loaded
function addConnectionStatus() {
    const statusDiv = document.createElement('div')
    statusDiv.id = 'supabase-status'
    statusDiv.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        padding: 8px 12px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 9999;
        background: #333;
        color: white;
        opacity: 0.9;
        display: none;
    `
    document.body.appendChild(statusDiv)
    
    return statusDiv
}
async function checkAndShowConnection() {
    const statusDiv = addConnectionStatus()
    
    const { connected, error } = await testConnection()
    
    if (connected) {
        statusDiv.textContent = '✅ DB Connected'
        statusDiv.style.background = '#10b981'
        statusDiv.style.display = 'block'
        
        // Hide after 3 seconds
        setTimeout(() => {
            statusDiv.style.display = 'none'
        }, 3000)
    } else {
        statusDiv.textContent = '❌ DB Disconnected'
        statusDiv.style.background = '#ef4444'
        statusDiv.style.display = 'block'
        
        console.error('Database connection error:', error)
    }
}

// Run connection check on page load
document.addEventListener('DOMContentLoaded', () => {
    // Only show in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        checkAndShowConnection()
    }
})

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Skin & Hair Clinic website...');
    
    // Initialize all modules
    initMobileMenu();
    initSmoothScroll();
    initForms();
    initAnimations();
    updateCurrentYear();
    
    // Additional initialization can go here
    console.log('Website initialized successfully!');
});

// Export for potential use in other files
export { initMobileMenu, initSmoothScroll, initForms, initAnimations, updateCurrentYear };
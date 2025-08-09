/* ========================================
   HEBREW SYSTEM INTEGRATION
   ======================================== */

/**
 * Integration layer between main app and Hebrew system
 * Handles URL-based role detection and content switching
 */

// Error handling and graceful degradation
const IntegrationErrors = {
    HEBREW_SYSTEM_NOT_LOADED: 'Hebrew system not loaded',
    INVALID_VIEW_MODE: 'Invalid view mode',
    DOM_ELEMENT_NOT_FOUND: 'Required DOM element not found',
    DATA_LOADING_FAILED: 'Failed to load testimonial data'
};

function handleIntegrationError(error, fallback = null) {
    console.error('Integration Error:', error);
    
    // Track errors for debugging
    if (window.performanceMetrics) {
        window.performanceMetrics.errors.push({
            type: 'integration',
            message: error,
            timestamp: Date.now()
        });
    }
    
    // Announce error to screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader('Content loading failed, using fallback', 'assertive');
    }
    
    return fallback;
}

// Current view mode state with error handling
let currentViewMode = 'general';

/**
 * Initialize the integration system
 */
function initIntegration() {
    // Detect initial view mode from URL
    currentViewMode = detectViewMode();
    console.log(`Initial view mode: ${currentViewMode}`);
    
    // Set up URL change listeners
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    
    // Make functions globally available
    window.updateViewMode = updateViewMode;
    window.getCurrentViewMode = () => currentViewMode;
    
    // Update UI for initial mode
    updateUIForViewMode();
    
    console.log('Hebrew integration initialized');
}

/**
 * Detects current view mode from URL hash
 */
function detectViewMode() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#manager' || hash === '#ron') return 'manager';
    if (hash === '#guide' || hash === '#tzvika' || hash === '#צביקה') return 'guide';
    return 'general';
}

/**
 * Handles URL hash changes
 */
function handleHashChange() {
    const newMode = detectViewMode();
    if (newMode !== currentViewMode) {
        updateViewMode(newMode);
    }
}

/**
 * Updates the view mode and refreshes content
 */
function updateViewMode(mode) {
    const previousMode = currentViewMode;
    currentViewMode = mode;
    
    console.log(`View mode changed: ${previousMode} → ${mode}`);
    
    // Update URL hash without triggering page reload
    const newHash = mode === 'general' ? '' : `#${mode}`;
    if (window.location.hash !== newHash) {
        history.replaceState(null, null, newHash || window.location.pathname);
    }
    
    // Update UI
    updateUIForViewMode();
    
    // Re-render cards if the main app has this function
    if (typeof renderParticipantCards === 'function') {
        renderParticipantCards();
    }
    
    // Update view switcher if it exists
    updateViewSwitcher();
}

/**
 * Updates UI elements based on current view mode
 */
function updateUIForViewMode() {
    const isHebrew = currentViewMode !== 'general';
    const hebrewTexts = window.HebrewSystem?.hebrewTexts || {};
    
    // Update page direction and language
    document.documentElement.dir = isHebrew ? 'rtl' : 'ltr';
    document.documentElement.lang = isHebrew ? 'he' : 'en';
    document.body.setAttribute('dir', isHebrew ? 'rtl' : 'ltr');
    document.body.setAttribute('lang', isHebrew ? 'he' : 'en');
    
    // Update page title
    document.title = isHebrew ? hebrewTexts.title || 'מערכת ההכרה של תוכנית ההדרכה' : 'Mentorship Program Tribute | Transforming Careers';
    
    // Define text updates (minimal for production)
    const textUpdates = [
        // No UI text updates needed for production - only testimonial content
    ];
    
    // Apply text updates
    textUpdates.forEach(([selector, text]) => {
        const element = document.querySelector(selector);
        if (element && text) {
            element.textContent = text;
            element.classList.toggle('hebrew-text', isHebrew);
            element.classList.toggle('english-text', !isHebrew);
        }
    });
    
    // Update view mode indicator
    updateViewModeIndicator();
}

/**
 * Updates or creates view mode indicator (disabled in production)
 */
function updateViewModeIndicator() {
    // View mode indicator disabled for production
    return;
}

/**
 * Updates view mode switcher buttons
 */
function updateViewSwitcher() {
    const buttons = document.querySelectorAll('.view-mode-switcher button');
    buttons.forEach(button => {
        button.classList.remove('active');
        const mode = button.getAttribute('data-mode') || 
                    (button.textContent.includes('English') ? 'general' :
                     button.textContent.includes('Manager') ? 'manager' : 'guide');
        if (mode === currentViewMode) {
            button.classList.add('active');
        }
    });
}

/**
 * Gets current testimonials data based on view mode
 */
function getCurrentTestimonialsData() {
    try {
        if (currentViewMode === 'general') {
            // Return English data if available
            const englishData = window.participantsData;
            if (!englishData || !Array.isArray(englishData)) {
                throw new Error(IntegrationErrors.DATA_LOADING_FAILED);
            }
            return englishData;
        }
        
        // Return Hebrew data
        const HebrewSystem = window.HebrewSystem;
        if (!HebrewSystem) {
            throw new Error(IntegrationErrors.HEBREW_SYSTEM_NOT_LOADED);
        }
        
        const hebrewData = HebrewSystem.getHebrewTestimonials();
        if (!hebrewData || !Array.isArray(hebrewData)) {
            throw new Error(IntegrationErrors.DATA_LOADING_FAILED);
        }
        
        return hebrewData;
        
    } catch (error) {
        return handleIntegrationError(error.message, window.participantsData || []);
    }
}

/**
 * Gets testimonial text for modal based on view mode
 */
function getModalTestimonialText(participant) {
    if (currentViewMode === 'general') {
        return participant.fullTestimonial || participant.preview;
    }
    
    const HebrewSystem = window.HebrewSystem;
    if (!HebrewSystem) {
        return participant.generalTestimonial || '';
    }
    
    return HebrewSystem.getHebrewTestimonialText(participant, currentViewMode);
}

/**
 * Gets preview text for cards based on view mode
 */
function getCardPreviewText(participant) {
    if (currentViewMode === 'general') {
        return participant.preview;
    }
    
    const HebrewSystem = window.HebrewSystem;
    if (!HebrewSystem) {
        return participant.generalTestimonial || '';
    }
    
    return HebrewSystem.getHebrewPreviewText(participant);
}

/**
 * Gets participant name and initials based on view mode
 */
function getParticipantInfo(participant) {
    if (currentViewMode === 'general') {
        return {
            name: participant.name,
            initials: participant.initials,
            role: participant.role
        };
    }
    
    const HebrewSystem = window.HebrewSystem;
    if (!HebrewSystem) {
        return {
            name: participant.name || 'משתתף',
            initials: 'מש',
            role: participant.role || 'משתתף תוכנית'
        };
    }
    
    return {
        name: participant.name,
        initials: HebrewSystem.generateHebrewInitials(participant.name),
        role: participant.role
    };
}

/**
 * Adds development view mode switcher
 */
function addViewModeSwitcher() {
    if (document.querySelector('.view-mode-switcher')) return;
    
    const switcher = document.createElement('div');
    switcher.className = 'view-mode-switcher';
    switcher.innerHTML = `
        <div style="margin-bottom: 5px; font-weight: bold;">View Mode (Dev)</div>
        <button data-mode="general" onclick="updateViewMode('general')">English</button>
        <button data-mode="manager" onclick="updateViewMode('manager')">Manager (רון)</button>
        <button data-mode="guide" onclick="updateViewMode('guide')">Guide (צביקה)</button>
    `;
    
    document.body.appendChild(switcher);
    updateViewSwitcher();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntegration);
} else {
    initIntegration();
}

// Add development switcher only if explicitly enabled
if ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && 
    window.location.search.includes('dev=true')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addViewModeSwitcher);
    } else {
        addViewModeSwitcher();
    }
}

// Export functions for global use
window.IntegrationSystem = {
    getCurrentViewMode: () => currentViewMode,
    updateViewMode,
    getCurrentTestimonialsData,
    getModalTestimonialText,
    getCardPreviewText,
    getParticipantInfo
};

console.log('Hebrew Integration System loaded');
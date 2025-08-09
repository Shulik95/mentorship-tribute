/* ========================================
   PRODUCTION ERROR HANDLING & ACCESSIBILITY
   ======================================== */

// Global error handler
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
    showErrorFallback('Something went wrong. Please refresh the page.');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    event.preventDefault();
});

// Performance monitoring
const performanceMetrics = {
    startTime: performance.now(),
    loadTime: null,
    errors: [],
    interactions: 0
};

// Accessibility preferences
const a11yPreferences = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    highContrast: window.matchMedia('(prefers-contrast: high)').matches,
    colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
};

// Screen reader announcements
function announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Error fallback display
function showErrorFallback(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-fallback';
    errorDiv.innerHTML = `
        <div class="error-content">
            <h3>Oops! Something went wrong</h3>
            <p>${message}</p>
            <button onclick="location.reload()" class="error-retry-btn">Refresh Page</button>
        </div>
    `;
    
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(errorDiv, main.firstChild);
    }
}

/* ========================================
   PARTICIPANTS DATA STRUCTURE
   ======================================== */

/* ========================================
   MODAL SYSTEM CONFIGURATION
   ======================================== */

// Modal state management
const modalState = {
    isOpen: false,
    currentParticipant: null,
    focusedElementBeforeModal: null,
    isLoading: false
};

// Focusable elements selector for keyboard navigation
const FOCUSABLE_ELEMENTS = [
    'button',
    '[href]',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])'
].join(', ');

const participantsData = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Software Engineer",
        initials: "SC",
        image: "images/participants/1.jpg", // Optional: will fallback to initials if not found
        preview: "The mentorship program transformed my approach to problem-solving and gave me the confidence to lead technical projects. The guidance I received was invaluable.",
        fullTestimonial: "Before joining the mentorship program, I felt overwhelmed by the technical challenges in my role. My mentor helped me break down complex problems into manageable pieces and taught me frameworks for systematic thinking. Now I'm leading a team of five engineers and have been promoted twice since completing the program.",
    },
    {
        id: 2,
        name: "Marcus Rodriguez",
        role: "Product Manager",
        initials: "MR",
        image: "images/participants/2.jpg",
        preview: "Through this program, I learned to balance stakeholder needs while maintaining a clear product vision. The mentorship was a game-changer for my career.",
        fullTestimonial: "The mentorship program came at a crucial point in my career transition from engineering to product management. My mentor helped me understand the nuances of stakeholder management and strategic thinking. I've since launched three successful products and built strong relationships across all departments.",
    },
    {
        id: 3,
        name: "Aisha Patel",
        role: "UX Designer",
        initials: "AP",
        image: "images/participants/3.jpg",
        preview: "My mentor helped me develop a user-centered mindset that goes beyond aesthetics. I now approach design challenges with confidence and systematic thinking.",
        fullTestimonial: "Coming from a graphic design background, I struggled with user research and data-driven design decisions. My mentor introduced me to design thinking methodologies and helped me build empathy for users. My designs now consistently test better with users and I've become the go-to person for complex UX challenges.",
    },
    {
        id: 4,
        name: "David Kim",
        role: "Data Scientist",
        initials: "DK",
        image: "images/participants/4.jpg",
        preview: "The program taught me how to communicate complex data insights to non-technical stakeholders. This skill has been crucial for my career advancement.",
        fullTestimonial: "As a data scientist, I was great with numbers but struggled to make my insights actionable for business teams. My mentor taught me storytelling techniques and helped me understand business context. I now regularly present to C-level executives and my recommendations drive key business decisions.",
    },
    {
        id: 5,
        name: "Emily Johnson",
        role: "Marketing Lead",
        initials: "EJ",
        image: "images/participants/5.jpg",
        preview: "Through mentorship, I learned to think strategically about campaigns and measure impact effectively. The guidance helped me grow into a leadership role.",
        fullTestimonial: "I was managing individual campaigns without seeing the bigger picture. My mentor helped me understand customer journey mapping and cross-channel strategy. I've since increased our marketing ROI by 150% and been promoted to lead a team of eight marketers across three verticals.",
    },
    {
        id: 6,
        name: "James Thompson",
        role: "Sales Director",
        initials: "JT",
        image: "images/participants/6.jpg",
        preview: "The mentorship program helped me transition from individual contributor to team leader. I learned valuable skills in coaching and team development.",
        fullTestimonial: "Making the jump from top salesperson to sales manager was challenging. My mentor, a seasoned sales leader, taught me how to coach rather than just lead by example. I learned to identify each team member's strengths and development areas. My team now consistently exceeds quota and has the lowest turnover in the company.",
    },
    {
        id: 7,
        name: "Priya Sharma",
        role: "DevOps Engineer",
        initials: "PS",
        image: "images/participants/7.jpg",
        preview: "My mentor taught me to think beyond just tools and processes. I now focus on building systems that truly serve development teams and business needs.",
        fullTestimonial: "I was caught up in the latest DevOps tools without understanding their business impact. My mentor helped me step back and think about developer experience and business outcomes. I've since designed a deployment pipeline that reduced our time-to-market by 60% and improved developer satisfaction scores.",
    },
    {
        id: 8,
        name: "Alex Chen",
        role: "Business Analyst",
        initials: "AC",
        image: "images/participants/8.jpg",
        preview: "Through this program, I learned to ask the right questions and present findings that drive action. The mentorship elevated my analytical thinking.",
        fullTestimonial: "My analysis was always technically correct but didn't always lead to clear business decisions. My mentor taught me to start with business questions rather than data, and to frame insights in terms of recommendations and next steps. I'm now trusted to lead strategic initiatives and my analysis directly influences product roadmaps.",
    }
];

/* ========================================
   DOM MANIPULATION FUNCTIONS
   ======================================== */

/**
 * Handles image loading errors by falling back to initials
 * @param {HTMLImageElement} img - The failed image element
 */
function handleImageError(img) {
    const container = img.parentElement;
    if (container && container.hasAttribute('data-fallback-initials')) {
        const initials = container.getAttribute('data-fallback-initials');
        const gradient = container.getAttribute('data-fallback-gradient');
        
        // Replace image with initials fallback
        container.className = 'participant-card__image';
        container.style.background = gradient;
        container.innerHTML = initials;
        
        console.log('Image failed to load, using initials fallback:', initials);
    }
}

/**
 * Handles modal image loading errors by falling back to initials
 * @param {HTMLImageElement} img - The failed image element
 */
function handleModalImageError(img) {
    const container = img.parentElement;
    if (container && container.hasAttribute('data-fallback-initials')) {
        const initials = container.getAttribute('data-fallback-initials');
        const gradient = container.getAttribute('data-fallback-gradient');
        
        // Replace image with initials fallback
        container.className = 'modal__participant-image';
        container.style.background = gradient;
        container.innerHTML = initials;
        
        console.log('Modal image failed to load, using initials fallback:', initials);
    }
}

/**
 * Creates image container with fallback to initials
 * @param {Object} participant - Participant data object  
 * @param {Object} participantInfo - Processed participant info (name, initials, role)
 * @param {Object} colors - Gradient colors for fallback
 * @returns {string} - HTML string for image container
 */
function createImageContainer(participant, participantInfo, colors) {
    // Check if participant has an image defined
    if (participant.image) {
        return `
            <div class="participant-card__image participant-card__image--photo" 
                 data-fallback-initials="${participantInfo.initials}"
                 data-fallback-gradient="${colors.gradient}">
                <img src="${participant.image}" 
                     alt="${participantInfo.name}"
                     loading="lazy"
                     onerror="handleImageError(this)">
            </div>
        `;
    } else {
        // Fallback to initials if no image is defined
        return `
            <div class="participant-card__image" style="background: ${colors.gradient}">
                ${participantInfo.initials}
            </div>
        `;
    }
}

/**
 * Creates a participant card element with enhanced styling
 * @param {Object} participant - Participant data object
 * @param {number} index - Card index for animation delay
 * @returns {HTMLElement} - Participant card element
 */
function createParticipantCard(participant, index = 0) {
    const card = document.createElement('div');
    card.className = 'participant-card';
    card.setAttribute('data-participant-id', participant.id);
    
    // Add staggered animation delay
    const animationDelay = index * 0.1;
    card.style.setProperty('--float-delay', `${animationDelay}s`);
    
    // Get participant info based on current view mode
    const participantInfo = window.IntegrationSystem ? 
        window.IntegrationSystem.getParticipantInfo(participant) : 
        { name: participant.name, initials: participant.initials, role: participant.role };
    
    // Get preview text based on current view mode
    const previewText = window.IntegrationSystem ? 
        window.IntegrationSystem.getCardPreviewText(participant) : 
        participant.preview;
    
    // Generate gradient colors based on initials (for fallback)
    const colors = generateGradientColors(participantInfo.initials);
    
    // Create image container with fallback to initials
    const imageContainer = createImageContainer(participant, participantInfo, colors);
    
    card.innerHTML = `
        ${imageContainer}
        <h3 class="participant-card__name">${participantInfo.name}</h3>
        <p class="participant-card__preview">${previewText}</p>
        <div class="participant-card__click-indicator">→</div>
    `;
    
    // Add enhanced interaction handlers
    setupCardInteractions(card, participant);
    
    // Add keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Read full testimonial from ${participantInfo.name}`);
    
    return card;
}

/**
 * Generates unique gradient colors based on initials
 * @param {string} initials - Participant initials
 * @returns {Object} - Color object with gradient
 */
function generateGradientColors(initials) {
    const colors = [
        { start: '#667eea', end: '#764ba2' },
        { start: '#f093fb', end: '#f5576c' },
        { start: '#4facfe', end: '#00f2fe' },
        { start: '#43e97b', end: '#38f9d7' },
        { start: '#fa709a', end: '#fee140' },
        { start: '#a8edea', end: '#fed6e3' },
        { start: '#ff9a9e', end: '#fecfef' },
        { start: '#a1c4fd', end: '#c2e9fb' }
    ];
    
    // Use initials to determine color scheme
    const hash = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = hash % colors.length;
    const selectedColor = colors[colorIndex];
    
    return {
        gradient: `linear-gradient(135deg, ${selectedColor.start} 0%, ${selectedColor.end} 100%)`,
        start: selectedColor.start,
        end: selectedColor.end
    };
}

/**
 * Sets up enhanced card interactions
 * @param {HTMLElement} card - Card element
 * @param {Object} participant - Participant data
 */
function setupCardInteractions(card, participant) {
    // Click handler
    card.addEventListener('click', () => handleCardClick(participant));
    
    // Keyboard navigation
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(participant);
        }
    });
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', () => {
        card.style.setProperty('--hover-scale', '1.02');
        
        // Add subtle sound effect (if audio context available)
        playHoverSound();
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--hover-scale', '1');
    });
    
    // Touch interactions for mobile
    let touchStartTime = 0;
    
    card.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
        card.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime;
        card.style.transform = '';
        
        // Prevent double-tap zoom on mobile
        if (touchDuration < 300) {
            e.preventDefault();
        }
    });
}

/**
 * Renders all participant cards to the grid with enhanced animations
 */
function renderParticipantCards() {
    const grid = document.querySelector('.participants__grid');
    
    if (!grid) {
        console.error('Participants grid not found');
        return;
    }
    
    // Clear existing content
    grid.innerHTML = '';
    
    // Add loading state with skeleton cards
    showLoadingSkeletons(grid);
    
    // Simulate realistic loading delay
    setTimeout(() => {
        // Clear loading skeletons
        grid.innerHTML = '';
        
        // Get current testimonials data based on view mode
        let currentData;
        try {
            currentData = window.IntegrationSystem ? 
                window.IntegrationSystem.getCurrentTestimonialsData() : 
                participantsData;
            
            // Fallback if data is empty or undefined
            if (!currentData || !Array.isArray(currentData) || currentData.length === 0) {
                currentData = participantsData || [];
            }
        } catch (error) {
            console.warn('Error loading testimonials data, using fallback:', error);
            currentData = participantsData || [];
        }
        
        // Render actual cards with staggered animation
        currentData.forEach((participant, index) => {
            const card = createParticipantCard(participant, index);
            
            // Initially hide cards for entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            grid.appendChild(card);
            
            // Staggered entrance animation
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        grid.classList.remove('loading');
        
        // Initialize intersection observer for scroll animations
        initializeScrollAnimations();
        
    }, 800);
}

/**
 * Shows loading skeleton cards
 * @param {HTMLElement} grid - Grid container
 */
function showLoadingSkeletons(grid) {
    grid.classList.add('loading');
    
    // Create 8 skeleton cards
    for (let i = 0; i < 8; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'participant-card participant-card--loading';
        skeleton.innerHTML = `
            <div class="participant-card__image"></div>
            <h3 class="participant-card__name">Loading Name</h3>
            <p class="participant-card__role">Loading Role</p>
            <p class="participant-card__preview">Loading preview text that shows testimonial content...</p>
        `;
        grid.appendChild(skeleton);
    }
}

/**
 * Initializes scroll-based animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Add bounce effect to cards when they come into view
                if (entry.target.classList.contains('participant-card')) {
                    setTimeout(() => {
                        entry.target.style.animation = 'bounce 0.6s ease';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe cards and other elements
    document.querySelectorAll('.participant-card, .intro, .cta').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

/**
 * Handles participant card click events with modal opening
 * @param {Object} participant - Participant data object
 */
function handleCardClick(participant) {
    const card = document.querySelector(`[data-participant-id="${participant.id}"]`);
    
    // Enhanced visual feedback
    if (card) {
        // Add click animation
        card.style.transform = 'scale(0.95)';
        card.style.transition = 'transform 0.1s ease';
        
        // Play click sound
        playClickSound();
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 100);
        
        // Add ripple effect
        createRippleEffect(card, event);
    }
    
    // Open modal with participant data
    openTestimonialModal(participant);
}

/**
 * Creates a ripple effect on card click
 * @param {HTMLElement} card - Card element
 * @param {Event} event - Click event
 */
function createRippleEffect(card, event) {
    const ripple = document.createElement('div');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (event?.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (event?.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    card.style.position = 'relative';
    card.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/* ========================================
   MODAL SYSTEM FUNCTIONS
   ======================================== */

/**
 * Opens the testimonial modal with participant data
 * @param {Object} participant - Participant data
 */
function openTestimonialModal(participant) {
    try {
        if (modalState.isOpen) {
            console.warn('Modal is already open');
            return;
        }
        
        modalState.isOpen = true;
        modalState.currentParticipant = participant;
        modalState.focusedElementBeforeModal = document.activeElement;
        
        const modal = document.getElementById('testimonial-modal');
        if (!modal) {
            throw new Error('Modal element not found');
        }
        
        // Prevent body scrolling
        document.body.classList.add('modal-open');
        
        // Show modal with loading state
        modal.classList.add('is-active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Show loading state
        showModalLoading();
        
        // Simulate loading time for better UX
        setTimeout(() => {
            populateModalContent(participant);
            hideModalLoading();
            focusModal();
        }, 600);
        
        // Set up event listeners
        setupModalEventListeners();
        
        // Log for analytics
        console.log(`Modal opened for ${participant.name}`);
        
    } catch (error) {
        console.error('Error opening modal:', error);
        handleModalError('Failed to open testimonial. Please try again.');
    }
}

/**
 * Closes the testimonial modal
 */
function closeTestimonialModal() {
    try {
        if (!modalState.isOpen) {
            return;
        }
        
        const modal = document.getElementById('testimonial-modal');
        if (!modal) {
            throw new Error('Modal element not found');
        }
        
        // Hide modal
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Restore body scrolling
        document.body.classList.remove('modal-open');
        
        // Restore focus to the element that opened the modal
        if (modalState.focusedElementBeforeModal) {
            modalState.focusedElementBeforeModal.focus();
        }
        
        // Clean up event listeners
        cleanupModalEventListeners();
        
        // Reset modal state
        modalState.isOpen = false;
        modalState.currentParticipant = null;
        modalState.focusedElementBeforeModal = null;
        
        // Clear modal content after animation
        setTimeout(() => {
            clearModalContent();
        }, 300);
        
        console.log('Modal closed');
        
    } catch (error) {
        console.error('Error closing modal:', error);
        // Force close in case of error
        document.body.classList.remove('modal-open');
        modalState.isOpen = false;
    }
}

/**
 * Shows the modal loading state
 */
function showModalLoading() {
    const loading = document.querySelector('.modal__loading');
    const content = document.querySelector('.modal__content');
    
    if (loading && content) {
        loading.classList.remove('is-hidden');
        loading.setAttribute('aria-hidden', 'false');
        content.classList.remove('is-visible');
        content.setAttribute('aria-hidden', 'true');
        modalState.isLoading = true;
    }
}

/**
 * Hides the modal loading state and shows content
 */
function hideModalLoading() {
    const loading = document.querySelector('.modal__loading');
    const content = document.querySelector('.modal__content');
    
    if (loading && content) {
        loading.classList.add('is-hidden');
        loading.setAttribute('aria-hidden', 'true');
        content.classList.add('is-visible');
        content.setAttribute('aria-hidden', 'false');
        modalState.isLoading = false;
    }
}

/**
 * Populates the modal with participant data
 * @param {Object} participant - Participant data
 */
function populateModalContent(participant) {
    try {
        // Get participant info based on current view mode
        const participantInfo = window.IntegrationSystem ? 
            window.IntegrationSystem.getParticipantInfo(participant) : 
            { name: participant.name, initials: participant.initials, role: participant.role };
        
        // Generate gradient colors for consistency
        const colors = generateGradientColors(participantInfo.initials);
        
        // Populate participant image
        const image = document.querySelector('.modal__participant-image');
        if (image) {
            // Clear any existing content
            image.innerHTML = '';
            image.className = 'modal__participant-image';
            
            if (participant.image) {
                // Use photo if available
                image.classList.add('modal__participant-image--photo');
                image.setAttribute('data-fallback-initials', participantInfo.initials);
                image.setAttribute('data-fallback-gradient', colors.gradient);
                
                const img = document.createElement('img');
                img.src = participant.image;
                img.alt = participantInfo.name;
                img.loading = 'lazy';
                img.onerror = () => handleModalImageError(img);
                
                image.appendChild(img);
            } else {
                // Fallback to initials
                image.style.background = colors.gradient;
                image.textContent = participantInfo.initials;
            }
        }
        
        // Populate participant info
        const name = document.querySelector('.modal__participant-name');
        if (name) name.textContent = participantInfo.name;
        
        const role = document.querySelector('.modal__participant-role');
        if (role) role.textContent = participantInfo.role;
        
        // Completion date removed from display
        
        // Get testimonial text based on current view mode
        const testimonialText = window.IntegrationSystem ? 
            window.IntegrationSystem.getModalTestimonialText(participant) : 
            (participant.fullTestimonial || participant.generalTestimonial || '');
        
        // Populate testimonial with separate paragraphs
        const quoteContent = document.querySelector('.modal__quote-content');
        if (quoteContent) {
            // Clear previous content
            quoteContent.innerHTML = '';
            
            // Split testimonial text into paragraphs
            const paragraphs = testimonialText.split('\n\n').filter(p => p.trim());
            
            // Create paragraph elements
            paragraphs.forEach(paragraphText => {
                const p = document.createElement('p');
                p.className = 'modal__quote-paragraph';
                p.textContent = paragraphText.trim();
                quoteContent.appendChild(p);
            });
            
            // Handle RTL text direction for Hebrew content
            const currentViewMode = window.IntegrationSystem?.getCurrentViewMode() || 'general';
            if (currentViewMode !== 'general') {
                quoteContent.style.direction = 'rtl';
                quoteContent.style.textAlign = 'right';
            } else {
                quoteContent.style.direction = 'ltr';
                quoteContent.style.textAlign = 'left';
            }
        }
        
        // Stats section removed - no longer showing program metrics
        
        // Update modal title for screen readers
        document.title = `Testimonial: ${participantInfo.name} - Mentorship Program`;
        
    } catch (error) {
        console.error('Error populating modal content:', error);
        handleModalError('Failed to load testimonial content.');
    }
}

/**
 * Clears the modal content
 */
function clearModalContent() {
    const elements = [
        '.modal__participant-name',
        '.modal__participant-role'
    ];
    
    elements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) element.textContent = '';
    });
    
    // Clear quote content container
    const quoteContent = document.querySelector('.modal__quote-content');
    if (quoteContent) quoteContent.innerHTML = '';
    
    const image = document.querySelector('.modal__participant-image');
    if (image) {
        image.style.background = '';
        image.textContent = '';
    }
}

/**
 * Sets up modal event listeners
 */
function setupModalEventListeners() {
    const modal = document.getElementById('testimonial-modal');
    const overlay = document.querySelector('.modal__overlay');
    const closeButton = document.querySelector('.modal__close');
    
    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', closeTestimonialModal);
    }
    
    // Close on close button click
    if (closeButton) {
        closeButton.addEventListener('click', closeTestimonialModal);
    }
    
    
    // Keyboard event listeners
    document.addEventListener('keydown', handleModalKeydown);
    
    // Prevent modal from closing when clicking inside content
    const modalContent = document.querySelector('.modal__container');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

/**
 * Cleans up modal event listeners
 */
function cleanupModalEventListeners() {
    const overlay = document.querySelector('.modal__overlay');
    const closeButton = document.querySelector('.modal__close');
    
    if (overlay) {
        overlay.removeEventListener('click', closeTestimonialModal);
    }
    
    if (closeButton) {
        closeButton.removeEventListener('click', closeTestimonialModal);
    }
    
    document.removeEventListener('keydown', handleModalKeydown);
}

/**
 * Handles keyboard events in the modal
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleModalKeydown(event) {
    if (!modalState.isOpen) return;
    
    switch (event.key) {
        case 'Escape':
            event.preventDefault();
            closeTestimonialModal();
            break;
            
        case 'Tab':
            handleModalTabNavigation(event);
            break;
            
        default:
            break;
    }
}

/**
 * Handles tab navigation within the modal
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleModalTabNavigation(event) {
    if (modalState.isLoading) {
        event.preventDefault();
        return;
    }
    
    const modal = document.getElementById('testimonial-modal');
    const focusableElements = modal.querySelectorAll(FOCUSABLE_ELEMENTS);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
    }
}

/**
 * Focuses the modal after opening
 */
function focusModal() {
    const closeButton = document.querySelector('.modal__close');
    if (closeButton) {
        closeButton.focus();
    }
}


/**
 * Handles modal errors
 * @param {string} message - Error message
 */
function handleModalError(message) {
    console.error('Modal error:', message);
    
    // Reset modal state
    modalState.isOpen = false;
    modalState.isLoading = false;
    document.body.classList.remove('modal-open');
    
    // Show user-friendly error
    setTimeout(() => {
        alert(`⚠️ ${message}`);
    }, 100);
}

/**
 * Plays a subtle hover sound (if audio context is available)
 */
function playHoverSound() {
    try {
        // Only play if user has interacted with the page (to avoid autoplay restrictions)
        if (window.audioContext && window.hasUserInteracted) {
            const oscillator = window.audioContext.createOscillator();
            const gainNode = window.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(window.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, window.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.01, window.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, window.audioContext.currentTime + 0.1);
            
            oscillator.start(window.audioContext.currentTime);
            oscillator.stop(window.audioContext.currentTime + 0.1);
        }
    } catch (error) {
        // Silently fail if audio context is not available
    }
}

/**
 * Plays a subtle click sound
 */
function playClickSound() {
    try {
        if (window.audioContext && window.hasUserInteracted) {
            const oscillator = window.audioContext.createOscillator();
            const gainNode = window.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(window.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(1000, window.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, window.audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.02, window.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, window.audioContext.currentTime + 0.1);
            
            oscillator.start(window.audioContext.currentTime);
            oscillator.stop(window.audioContext.currentTime + 0.1);
        }
    } catch (error) {
        // Silently fail if audio context is not available
    }
}

/**
 * Enhanced card animation with multiple effects
 */
function animateCardsIn() {
    const cards = document.querySelectorAll('.participant-card');
    
    cards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.filter = 'blur(10px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.filter = 'blur(0px)';
            
            // Add subtle bounce after main animation
            setTimeout(() => {
                card.style.animation = 'bounce 0.6s ease';
            }, 400);
            
        }, index * 150 + 200);
    });
}

/* ========================================
   INTERACTIVE FEATURES
   ======================================== */

/**
 * Handles the "Join the Program" button click (disabled in production)
 */
function handleJoinButtonClick() {
    // Join button functionality disabled for production
    return;
}

/**
 * Adds smooth scrolling behavior to internal links
 */
function initSmoothScrolling() {
    // If there were internal navigation links, they would be handled here
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

/**
 * Adds intersection observer for animations on scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    document.querySelectorAll('.intro, .cta').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

/* ========================================
   INITIALIZATION
   ======================================== */

/**
 * Initialize the application when DOM is loaded
 */
function initApp() {
    console.log('Initializing Enhanced Mentorship Program Tribute website with Modal System...');
    
    // Initialize audio context for sound effects (only after user interaction)
    initAudioContext();
    
    // Add CSS animations stylesheet if needed
    addRippleAnimationStyles();
    
    // Initialize modal system
    initModalSystem();
    
    // Render participant cards with enhanced loading
    renderParticipantCards();
    
    // Set up enhanced event listeners
    setupEnhancedEventListeners();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize enhanced scroll animations
    initScrollAnimations();
    
    // Add performance monitoring
    monitorPerformance();
    
    console.log('Enhanced application with Modal System initialized successfully!');
}

/**
 * Initializes the modal system
 */
function initModalSystem() {
    try {
        const modal = document.getElementById('testimonial-modal');
        if (!modal) {
            throw new Error('Modal element not found in DOM');
        }
        
        // Ensure modal is hidden initially
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Reset modal state
        modalState.isOpen = false;
        modalState.currentParticipant = null;
        modalState.focusedElementBeforeModal = null;
        modalState.isLoading = false;
        
        // Hide content, show loading by default
        hideModalLoading();
        
        console.log('Modal system initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize modal system:', error);
    }
}

/**
 * Sets up enhanced event listeners
 */
function setupEnhancedEventListeners() {
    // Join button functionality removed for production
    
    // Track user interaction for audio
    document.addEventListener('click', () => {
        window.hasUserInteracted = true;
    }, { once: true });
    
    // Global error handler for unhandled modal errors
    window.addEventListener('error', (event) => {
        if (modalState.isOpen) {
            console.error('Unhandled error while modal is open:', event.error);
            handleModalError('An unexpected error occurred. Please try again.');
        }
    });
    
    // Handle page visibility changes (close modal if page becomes hidden)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && modalState.isOpen) {
            console.log('Page hidden, closing modal');
            closeTestimonialModal();
        }
    });
}

/**
 * Initializes audio context for sound effects
 */
function initAudioContext() {
    try {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        window.hasUserInteracted = false;
    } catch (error) {
        console.log('Audio context not available');
    }
}

/**
 * Adds ripple animation styles to the document
 */
function addRippleAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Monitors performance and logs metrics
 */
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load performance:', {
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                    totalTime: perfData.loadEventEnd - perfData.navigationStart
                });
                
                // Monitor modal performance
                if (modalState.isOpen) {
                    console.log('Modal state:', modalState);
                }
            }, 0);
        });
    }
    
    // Monitor modal performance metrics
    const originalOpen = openTestimonialModal;
    window.openTestimonialModal = function(participant) {
        const startTime = performance.now();
        const result = originalOpen.call(this, participant);
        const endTime = performance.now();
        console.log(`Modal open time: ${endTime - startTime}ms`);
        return result;
    };
}

/* ========================================
   EVENT LISTENERS
   ======================================== */

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Any resize-specific logic would go here
        console.log('Window resized, layout adjusted');
    }, 250);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key to close any modals (for future implementation)
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        console.log('Escape key pressed');
    }
});

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Utility function to get participant by ID
 * @param {number} id - Participant ID
 * @returns {Object|null} - Participant object or null if not found
 */
function getParticipantById(id) {
    return participantsData.find(participant => participant.id === id) || null;
}

/**
 * Utility function to filter participants by role
 * @param {string} role - Role to filter by
 * @returns {Array} - Array of participants with matching role
 */
function getParticipantsByRole(role) {
    return participantsData.filter(participant => 
        participant.role.toLowerCase().includes(role.toLowerCase())
    );
}

/**
 * Utility function to shuffle array (for potential random ordering)
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
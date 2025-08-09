/* ========================================
   BROWSER COMPATIBILITY POLYFILLS
   ======================================== */

/**
 * Essential polyfills for older browser support
 * Loaded conditionally to avoid unnecessary overhead
 */

(function() {
    'use strict';
    
    // Feature detection and polyfill loading
    const needsPolyfills = [];
    
    // IntersectionObserver polyfill check
    if (!window.IntersectionObserver) {
        needsPolyfills.push('intersectionObserver');
    }
    
    // CSS.supports polyfill check
    if (!window.CSS || !window.CSS.supports) {
        needsPolyfills.push('cssSupports');
    }
    
    // Array.from polyfill check
    if (!Array.from) {
        needsPolyfills.push('arrayFrom');
    }
    
    // Object.assign polyfill check
    if (!Object.assign) {
        needsPolyfills.push('objectAssign');
    }
    
    // Promise polyfill check
    if (!window.Promise) {
        needsPolyfills.push('promise');
    }
    
    // URL API polyfill check
    if (!window.URL) {
        needsPolyfills.push('url');
    }
    
    // CustomEvent polyfill check
    if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
        needsPolyfills.push('customEvent');
    }
    
    // Element.closest polyfill check
    if (!Element.prototype.closest) {
        needsPolyfills.push('closest');
    }
    
    // Element.matches polyfill check
    if (!Element.prototype.matches) {
        needsPolyfills.push('matches');
    }
    
    // Polyfill implementations
    const polyfills = {
        
        // IntersectionObserver polyfill
        intersectionObserver: function() {
            window.IntersectionObserver = function(callback, options) {
                this.callback = callback;
                this.options = options || {};
                this.observed = [];
                
                // Fallback implementation using scroll events
                this._checkIntersections = function() {
                    this.observed.forEach(function(entry) {
                        const rect = entry.target.getBoundingClientRect();
                        const isIntersecting = rect.top < window.innerHeight && rect.bottom > 0;
                        
                        this.callback([{
                            target: entry.target,
                            isIntersecting: isIntersecting,
                            intersectionRatio: isIntersecting ? 1 : 0
                        }]);
                    }.bind(this));
                }.bind(this);
                
                // Set up scroll listener
                window.addEventListener('scroll', this._checkIntersections);
                window.addEventListener('resize', this._checkIntersections);
            };
            
            window.IntersectionObserver.prototype.observe = function(target) {
                this.observed.push({ target: target });
                this._checkIntersections();
            };
            
            window.IntersectionObserver.prototype.unobserve = function(target) {
                this.observed = this.observed.filter(function(entry) {
                    return entry.target !== target;
                });
            };
            
            window.IntersectionObserver.prototype.disconnect = function() {
                this.observed = [];
                window.removeEventListener('scroll', this._checkIntersections);
                window.removeEventListener('resize', this._checkIntersections);
            };
        },
        
        // CSS.supports polyfill
        cssSupports: function() {
            if (!window.CSS) {
                window.CSS = {};
            }
            
            window.CSS.supports = function(property, value) {
                // Simple implementation - create a test element
                const element = document.createElement('div');
                const camelProperty = property.replace(/-([a-z])/g, function(match, letter) {
                    return letter.toUpperCase();
                });
                
                try {
                    element.style[camelProperty] = value;
                    return element.style[camelProperty] === value;
                } catch (e) {
                    return false;
                }
            };
        },
        
        // Array.from polyfill
        arrayFrom: function() {
            Array.from = function(arrayLike, mapFn, thisArg) {
                const items = Object(arrayLike);
                const len = parseInt(items.length) || 0;
                const result = new Array(len);
                
                for (let i = 0; i < len; i++) {
                    const value = items[i];
                    result[i] = mapFn ? mapFn.call(thisArg, value, i) : value;
                }
                
                return result;
            };
        },
        
        // Object.assign polyfill
        objectAssign: function() {
            Object.assign = function(target) {
                if (target == null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                
                const to = Object(target);
                
                for (let index = 1; index < arguments.length; index++) {
                    const nextSource = arguments[index];
                    
                    if (nextSource != null) {
                        for (const nextKey in nextSource) {
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                
                return to;
            };
        },
        
        // Promise polyfill (minimal implementation)
        promise: function() {
            function Promise(executor) {
                const self = this;
                self.state = 'pending';
                self.value = undefined;
                self.handlers = [];
                
                function resolve(result) {
                    if (self.state === 'pending') {
                        self.state = 'fulfilled';
                        self.value = result;
                        self.handlers.forEach(handle);
                        self.handlers = null;
                    }
                }
                
                function reject(error) {
                    if (self.state === 'pending') {
                        self.state = 'rejected';
                        self.value = error;
                        self.handlers.forEach(handle);
                        self.handlers = null;
                    }
                }
                
                function handle(handler) {
                    if (self.state === 'pending') {
                        self.handlers.push(handler);
                    } else {
                        if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
                            handler.onFulfilled(self.value);
                        }
                        if (self.state === 'rejected' && typeof handler.onRejected === 'function') {
                            handler.onRejected(self.value);
                        }
                    }
                }
                
                this.then = function(onFulfilled, onRejected) {
                    return new Promise(function(resolve, reject) {
                        handle({
                            onFulfilled: function(result) {
                                try {
                                    resolve(onFulfilled ? onFulfilled(result) : result);
                                } catch (ex) {
                                    reject(ex);
                                }
                            },
                            onRejected: function(error) {
                                try {
                                    resolve(onRejected ? onRejected(error) : error);
                                } catch (ex) {
                                    reject(ex);
                                }
                            }
                        });
                    });
                };
                
                executor(resolve, reject);
            }
            
            Promise.resolve = function(value) {
                return new Promise(function(resolve) {
                    resolve(value);
                });
            };
            
            Promise.reject = function(reason) {
                return new Promise(function(resolve, reject) {
                    reject(reason);
                });
            };
            
            window.Promise = Promise;
        },
        
        // URL API polyfill
        url: function() {
            function URL(url, base) {
                const link = document.createElement('a');
                link.href = base ? new URL(base).href.replace(/\/$/, '') + '/' + url : url;
                
                this.href = link.href;
                this.protocol = link.protocol;
                this.host = link.host;
                this.hostname = link.hostname;
                this.port = link.port;
                this.pathname = link.pathname;
                this.search = link.search;
                this.hash = link.hash;
                this.origin = link.protocol + '//' + link.host;
            }
            
            window.URL = URL;
        },
        
        // CustomEvent polyfill
        customEvent: function() {
            function CustomEvent(event, params) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                const evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            }
            
            CustomEvent.prototype = window.Event.prototype;
            window.CustomEvent = CustomEvent;
        },
        
        // Element.closest polyfill
        closest: function() {
            Element.prototype.closest = function(selector) {
                let element = this;
                
                while (element && element.nodeType === 1) {
                    if (element.matches(selector)) {
                        return element;
                    }
                    element = element.parentElement;
                }
                
                return null;
            };
        },
        
        // Element.matches polyfill
        matches: function() {
            Element.prototype.matches = Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function(s) {
                    const matches = (this.document || this.ownerDocument).querySelectorAll(s);
                    let i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {}
                    return i > -1;
                };
        }
    };
    
    // Apply needed polyfills
    needsPolyfills.forEach(function(polyfillName) {
        if (polyfills[polyfillName]) {
            try {
                polyfills[polyfillName]();
                console.log('Applied polyfill:', polyfillName);
            } catch (error) {
                console.warn('Failed to apply polyfill:', polyfillName, error);
            }
        }
    });
    
    // CSS Grid fallback for older browsers
    function addGridFallbacks() {
        if (!window.CSS || !window.CSS.supports('display', 'grid')) {
            console.log('CSS Grid not supported, applying fallbacks');
            
            // Add fallback styles
            const fallbackCSS = `
                .participants__grid {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 20px !important;
                }
                
                .participant-card {
                    flex: 1 1 300px !important;
                    max-width: 400px !important;
                }
                
                @media (max-width: 768px) {
                    .participant-card {
                        flex: 1 1 100% !important;
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = fallbackCSS;
            document.head.appendChild(style);
        }
    }
    
    // Apply CSS fallbacks when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addGridFallbacks);
    } else {
        addGridFallbacks();
    }
    
    // Service Worker fallback for unsupported browsers
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker not supported, using fallback caching');
        
        // Simple localStorage caching fallback
        window.fallbackCache = {
            set: function(key, data) {
                try {
                    localStorage.setItem('cache_' + key, JSON.stringify({
                        data: data,
                        timestamp: Date.now()
                    }));
                } catch (e) {
                    console.warn('Fallback cache failed:', e);
                }
            },
            
            get: function(key, maxAge) {
                try {
                    const cached = localStorage.getItem('cache_' + key);
                    if (cached) {
                        const parsed = JSON.parse(cached);
                        if (!maxAge || (Date.now() - parsed.timestamp) < maxAge) {
                            return parsed.data;
                        }
                    }
                } catch (e) {
                    console.warn('Fallback cache retrieval failed:', e);
                }
                return null;
            }
        };
    }
    
    // Viewport units fix for mobile browsers
    function fixViewportUnits() {
        // Fix for vh units on mobile browsers
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
        
        window.addEventListener('resize', function() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', vh + 'px');
        });
    }
    
    fixViewportUnits();
    
    // Log browser compatibility information
    console.log('Browser compatibility check complete. Applied polyfills:', needsPolyfills);
    
})();
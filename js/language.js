// Language management for Color Aquatic
console.log('language.js loaded');

// Initialize language functionality
function initializeLanguage() {
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

// Language switching functionality
function toggleLanguage() {
    console.log('Đang chuyển đổi ngôn ngữ...');
    const currentLang = window.currentLanguage || 'vi';
    const newLang = currentLang === 'vi' ? 'en' : 'vi';
    
    switchToLanguage(newLang);
}

// Switch to specific language
function switchToLanguage(lang) {
    console.log(`Chuyển đổi sang ngôn ngữ: ${lang}`);
    
    // Update global language
    window.currentLanguage = lang;
    
    // Store in localStorage
    localStorage.setItem('colorAquaticLanguage', lang);
    
    // Update language toggle button
    updateLanguageToggleButton();
    
    // Update all page texts
    updatePageTexts();
    
    // Re-render content
    displayPostList();
    displayCollectionProducts();
    
    // Update page URL without reload
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url.toString());
    
    // Update meta tags
    updateMetaTags();
    
    console.log(`Đã chuyển đổi sang ngôn ngữ: ${lang}`);
}

// Update language toggle button
function updateLanguageToggleButton() {
    const langToggle = document.getElementById('language-toggle');
    const lang = window.currentLanguage || 'vi';
    
    if (langToggle) {
        if (lang === 'vi') {
            langToggle.innerHTML = '<i class="fas fa-language"></i> EN';
            langToggle.setAttribute('aria-label', 'Switch to English');
        } else {
            langToggle.innerHTML = '<i class="fas fa-language"></i> VI';
            langToggle.setAttribute('aria-label', 'Chuyển sang tiếng Việt');
        }
    }
}

// Update all page texts
function updatePageTexts() {
    const lang = window.currentLanguage || 'vi';
    
    // Update hero section
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroButton = document.getElementById('hero-button');
    
    if (heroTitle) heroTitle.textContent = t('hero.title', lang);
    if (heroSubtitle) heroSubtitle.textContent = t('hero.subtitle', lang);
    if (heroButton) heroButton.textContent = t('hero.button', lang);
    
    // Update navigation
    updateNavigation();
    
    // Update section headers
    const collectionTitle = document.querySelector('#collection h2');
    const postsTitle = document.querySelector('#posts h2');
    
    if (collectionTitle) collectionTitle.textContent = t('collection.title', lang);
    if (postsTitle) postsTitle.textContent = t('posts.title', lang);
    
    // Update footer
    updateFooter();
    
    // Update search placeholders
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.placeholder = t('search.placeholder', lang);
    }
}

// Update navigation
function updateNavigation() {
    const lang = window.currentLanguage || 'vi';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        switch(link.getAttribute('href') || link.getAttribute('onclick')) {
            case '#collection':
                link.textContent = t('nav.collection', lang);
                break;
            case '#posts':
                link.textContent = t('nav.posts', lang);
                break;
        }
    });
    
    // Update dropdown menu if exists
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        const options = categoryFilter.querySelectorAll('option');
        options.forEach(option => {
            const value = option.value;
            switch(value) {
                case 'all':
                    option.textContent = t('collection.filters.all', lang);
                    break;
                case 'shrimps':
                    option.textContent = t('collection.filters.shrimps', lang);
                    break;
                case 'fishes':
                    option.textContent = t('collection.filters.fishes', lang);
                    break;
                case 'accessory':
                    option.textContent = t('collection.filters.accessory', lang);
                    break;
                case 'plants':
                    option.textContent = t('collection.filters.plants', lang);
                    break;
            }
        });
    }
}

// Update footer
function updateFooter() {
    const lang = window.currentLanguage || 'vi';
    const footer = document.querySelector('footer');
    
    if (footer) {
        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-section">
                    <h4>${t('footer.aboutUs', lang)}</h4>
                    <p>${t('footer.description', lang)}</p>
                </div>
                <div class="footer-section">
                    <h4>${t('footer.contact', lang)}</h4>
                    <p>Email: coloraquatic@gmail.com</p>
                    <p>Phone: +84 123 456 789</p>
                </div>
                <div class="footer-section">
                    <h4>${t('footer.followUs', lang)}</h4>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Color Aquatic. ${t('footer.allRightsReserved', lang)}.</p>
            </div>
        `;
    }
}

// Get text by language with fallback
function getPostByLang(post, field, lang) {
    if (!post || !post[field]) return '';
    
    // If it's an object with language keys
    if (typeof post[field] === 'object') {
        return post[field][lang] || post[field]['vi'] || post[field]['en'] || '';
    }
    
    // If it's a string (fallback)
    return post[field] || '';
}

// Get product text by language with fallback
function getProductByLang(product, field, lang) {
    if (!product || !product[field]) return '';
    
    // If it's an object with language keys
    if (typeof product[field] === 'object') {
        return product[field][lang] || product[field]['vi'] || product[field]['en'] || '';
    }
    
    // If it's a string (fallback)
    return product[field] || '';
}

// Initialize language from URL or localStorage
function initializeLanguageFromStorage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const storedLang = localStorage.getItem('colorAquaticLanguage');
    
    let initialLang = urlLang || storedLang || 'vi';
    
    // Validate language
    if (!['vi', 'en'].includes(initialLang)) {
        initialLang = 'vi';
    }
    
    window.currentLanguage = initialLang;
    
    // Update the URL if needed
    if (!urlLang) {
        const url = new URL(window.location);
        url.searchParams.set('lang', initialLang);
        window.history.replaceState(null, '', url.toString());
    }
    
    console.log(`Language initialized: ${initialLang}`);
    return initialLang;
}

// Format date for current language
function formatDateForLanguage(dateString, lang) {
    const date = new Date(dateString);
    const locale = lang === 'en' ? 'en-US' : 'vi-VN';
    
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Get translated text helper
function t(key, lang) {
    if (!window.translations) return key;
    
    const keys = key.split('.');
    let value = window.translations[lang] || window.translations['vi'];
    
    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return key; // fallback to key if not found
        }
    }
    
    return value || key;
}
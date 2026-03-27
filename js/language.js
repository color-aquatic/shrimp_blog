// Language management for Color Aquatic
console.log('language.js loaded');

// Initialize language functionality
function initializeLanguage() {
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    // Header language dropdown options
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach((option) => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedLang = option.getAttribute('data-lang');
            if (selectedLang) {
                switchToLanguage(selectedLang);
            }
        });
    });
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
    localStorage.setItem('blogLanguage', lang);

    const targetPath = typeof getLanguageSwitchPath === 'function'
        ? getLanguageSwitchPath(lang)
        : `/${lang}/`;

    if (targetPath && targetPath !== `${window.location.pathname}${window.location.hash}`) {
        window.location.href = targetPath;
        return;
    }
    
    // Update language toggle button
    updateLanguageToggleButton();
    updateLanguageSummary();
    
    // Update all page texts
    updatePageTexts();
    
    // Check if we're on a detail page and reload it with new language
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    const productId = urlParams.get('product');
    
    if (postId && window.loadPost) {
        console.log('Reloading post with new language:', lang);
        window.loadPost(postId);
    } else if (productId && window.loadProduct) {
        console.log('Reloading product with new language:', lang);
        window.loadProduct(productId);
    } else {
        // Re-render list content only if on home page
        displayPostList();
        displayCollectionProducts();
    }
    
    console.log(`Đã chuyển đổi sang ngôn ngữ: ${lang}`);
}

// Update visible language label in header summary
function updateLanguageSummary() {
    const lang = window.currentLanguage || 'vi';
    const summary = document.getElementById('language-summary');
    if (!summary) return;

    const flag = summary.querySelector('.lang-flag');
    const text = summary.querySelector('.lang-text');

    if (lang === 'en') {
        if (flag) flag.className = 'lang-flag flag-gb';
        if (text) text.textContent = 'English';
    } else {
        if (flag) flag.className = 'lang-flag flag-vn';
        if (text) text.textContent = 'Tiếng Việt';
    }
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

    // Update any element tagged with data-translate
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach((element) => {
        const key = element.getAttribute('data-translate');
        if (!key) return;
        const translated = t(key, lang);
        if (translated === key) return;

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translated;
        } else {
            element.textContent = translated;
        }
    });

    // Keep email link markup while translating label text
    const emailElement = document.querySelector('[data-translate="contact.email"]');
    if (emailElement && emailElement.querySelector('a')) {
        const anchor = emailElement.querySelector('a');
        emailElement.firstChild.textContent = `${t('contact.email', lang)} `;
        if (anchor) {
            anchor.textContent = 'hoangquoctu95@gmail.com';
        }
    }

    updateLanguageSummary();
}

// Update navigation
function updateNavigation() {
    const lang = window.currentLanguage || 'vi';
    const navLinks = document.querySelectorAll('nav a[data-translate^="nav."]');
    
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
                    option.textContent = t('collection.filterAll', lang);
                    break;
                case 'shrimps':
                    option.textContent = t('collection.filterShrimps', lang);
                    break;
                case 'fishes':
                    option.textContent = t('collection.filterFishes', lang);
                    break;
                case 'accessory':
                    option.textContent = t('collection.filterAccessory', lang);
                    break;
                case 'plants':
                    option.textContent = t('collection.filterPlants', lang);
                    break;
            }
        });
    }
}

// Update footer
function updateFooter() {
    // Footer is now translated by data-translate bindings in updatePageTexts().
}

// Get text by language with fallback
function getPostByLang(post, field, lang) {
    if (!post) return '';

    const langKey = `${field}${lang === 'en' ? 'En' : 'Vi'}`;
    if (post[langKey]) return post[langKey];

    if (post[field] && typeof post[field] === 'object') {
        return post[field][lang] || post[field].vi || post[field].en || '';
    }

    return post[field] || '';
}

// Get product text by language with fallback
function getProductByLang(product, field, lang) {
    if (!product) return '';

    const langKey = `${field}${lang === 'en' ? 'En' : 'Vi'}`;
    if (product[langKey]) return product[langKey];

    if (product[field] && typeof product[field] === 'object') {
        return product[field][lang] || product[field].vi || product[field].en || '';
    }

    return product[field] || '';
}

// Initialize language from URL or localStorage
function initializeLanguageFromStorage() {
    const pathLang = typeof getLanguageFromPath === 'function' ? getLanguageFromPath() : null;
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const storedLang = localStorage.getItem('colorAquaticLanguage') || localStorage.getItem('blogLanguage');
    
    let initialLang = pathLang || urlLang || storedLang || 'vi';
    
    // Validate language
    if (!['vi', 'en'].includes(initialLang)) {
        initialLang = 'vi';
    }
    
    window.currentLanguage = initialLang;
    updateLanguageSummary();
    
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
    const source = window.translations || (typeof translations !== 'undefined' ? translations : null);
    if (!source) return key;
    
    const keys = key.split('.');
    let value = source[lang] || source['vi'];
    
    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return key; // fallback to key if not found
        }
    }
    
    return value || key;
}
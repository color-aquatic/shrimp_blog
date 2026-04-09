// Main JavaScript for Color Aquatic - Optimized and Cleaned Version
console.log('main.js loaded - Optimized version');

/**
 * Global variables for application state
 */
window.currentLanguage = 'vi';
let currentCollectionPage = 1;
let currentFilter = 'all';
const productsPerPage = 20;
let currentSlideIndex = 0;
let slideshowInterval;

/**
 * Initialize mobile hamburger menu functionality
 * Handles menu toggle, overlay, and keyboard events
 */
function initializeHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');

    if (!hamburgerMenu || !navMenu || !navOverlay) {
        console.error('Hamburger menu elements not found');
        return;
    }

    /**
     * Toggle menu visibility with animation
     */
    function toggleMenu() {
        const isActive = hamburgerMenu.classList.contains('active');

        if (isActive) {
            closeMenu();
        } else {
            navOverlay.classList.add('active');
            setTimeout(() => {
                hamburgerMenu.classList.add('active');
                navMenu.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close menu with animation
     */
    function closeMenu() {
        if (!navMenu.classList.contains('active')) return;

        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');

        setTimeout(() => {
            navOverlay.classList.remove('active');
        }, 300);

        document.body.style.overflow = '';
    }

    // Event listeners
    hamburgerMenu.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Close menu on nav link clicks
    navMenu.querySelectorAll('a:not(.lang-option)').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Handle window resize and escape key
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
    });
}

/**
 * Display collection products with pagination and filtering
 * @param {number} page - Current page number
 * @param {string} filter - Category filter ('all', 'shrimps', 'plants', 'accessory')
 */
function displayCollectionProducts(page = 1, filter = currentFilter) {
    const collectionContainer = document.getElementById('collection-list');
    if (!collectionContainer) return;

    currentCollectionPage = page;
    currentFilter = filter;

    // Filter products by category
    let filteredProducts = collectionProducts;
    if (filter && filter !== 'all') {
        filteredProducts = collectionProducts.filter(product => product.category === filter);
    }

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, totalProducts);
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    // Clear existing content
    collectionContainer.innerHTML = '';

    if (productsToShow.length === 0) {
        const lang = window.currentLanguage || 'vi';
        collectionContainer.innerHTML = `<div class="loading">${t('collection.noProducts', lang)}</div>`;
        return;
    }

    const lang = window.currentLanguage || 'vi';
    const categoryOrder = ['shrimps', 'plants', 'accessory'];
    const categoryTitles = {
        shrimps: t('collection.filterShrimps', lang),
        plants: t('collection.filterPlants', lang),
        accessory: t('collection.filterAccessory', lang)
    };

    // Group products by category for better organization
    const groupedProducts = productsToShow.reduce((groups, product) => {
        const key = product.category || 'other';
        if (!groups[key]) groups[key] = [];
        groups[key].push(product);
        return groups;
    }, {});

    const sortedCategories = [
        ...categoryOrder.filter(category => groupedProducts[category]?.length),
        ...Object.keys(groupedProducts).filter(category => !categoryOrder.includes(category))
    ];

    // Render each category section
    sortedCategories.forEach((category) => {
        const section = document.createElement('section');
        section.className = 'collection-category-section';
        section.setAttribute('data-category', category);

        const title = document.createElement('h3');
        title.className = 'collection-category-title';
        title.textContent = categoryTitles[category] || category;
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'collection-category-grid';

        groupedProducts[category].forEach((product) => {
            const productCard = createProductCard(product);
            grid.appendChild(productCard);
        });

        section.appendChild(grid);
        collectionContainer.appendChild(section);
    });

    // Add pagination if needed
    if (totalPages > 1) {
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        paginationContainer.innerHTML = createPaginationHTML(page, totalPages, filter);
        collectionContainer.appendChild(paginationContainer);
    }

    console.log(`Displayed ${productsToShow.length} products (page ${page}/${totalPages}, filter: ${filter})`);
}

/**
 * Filter collection by category and reset to first page
 * @param {string} category - Category to filter by
 */
function filterCollection(category) {
    currentCollectionPage = 1;
    displayCollectionProducts(1, category);

    // Update filter dropdown
    const filterDropdown = document.getElementById('category-filter');
    if (filterDropdown) {
        filterDropdown.value = category;
    }
}

/**
 * Display list of posts sorted by date
 * @param {number} page - Page number (currently unused, all posts shown)
 */
function displayPostList(page = 1) {
    const postsContainer = document.getElementById('post-list');
    if (!postsContainer) return;

    const lang = window.currentLanguage || 'vi';
    postsContainer.innerHTML = '';

    // Sort posts by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Create card for each post
    sortedPosts.forEach(post => {
        const postCard = createPostCard(post);
        postsContainer.appendChild(postCard);
    });
}

/**
 * Display detailed view of a post
 * @param {Object} post - Post object to display
 */
function displayPostDetail(post) {
    if (!post) return;

    const postDetailSection = document.getElementById('post-content');
    const articleContent = document.getElementById('article-content');
    if (!postDetailSection || !articleContent) return;

    const lang = window.currentLanguage || 'vi';
    articleContent.innerHTML = `<div class="loading">${t('post.loading', lang)}</div>`;

    postDetailSection.style.display = 'block';

    // Load markdown content
    loadMarkdownContent(post.id, lang, 'post');
}

/**
 * Display detailed view of a product
 * @param {Object} product - Product object to display
 */
function displayProductDetail(product) {
    if (!product) return;

    const postDetailSection = document.getElementById('post-content');
    const articleContent = document.getElementById('article-content');
    if (!postDetailSection || !articleContent) return;

    const lang = window.currentLanguage || 'vi';
    articleContent.innerHTML = `<div class="loading">${t('post.loading', lang)}</div>`;
    postDetailSection.style.display = 'block';

    // Load markdown content
    loadMarkdownContent(product.id, lang, 'product');
}

/**
 * Extract product ID from URL path for static builds
 * @returns {string|null} Product ID or null if not found
 */
function getProductIdFromUrlPath() {
    const path = (typeof getBasePath === 'function' ? window.location.pathname.replace(getBasePath(), '') : window.location.pathname).replace(/^\//, '');
    const segments = path.split('/').filter(Boolean);
    if (segments.length >= 4 && segments[1] === 'collection') {
        return segments[3];
    }
    return null;
}

/**
 * Ensure product images are displayed for static builds
 */
function ensureStaticProductImages() {
    const articleContent = document.getElementById('article-content');
    if (!articleContent || articleContent.querySelector('.product-images')) return;

    const productId = getProductIdFromUrlPath();
    if (!productId) return;

    const product = collectionProducts.find((item) => item.id === productId);
    if (!product) return;

    const lang = window.currentLanguage || 'vi';
    const productName = getProductByLang(product, 'name', lang);
    const basePath = typeof getBasePath === 'function' ? getBasePath() : '';
    const mainImg = (product.images && product.images.length) ? product.images[0] : 'placeholder1.png';
    const thumbnailsHtml = (product.images || []).slice(0, 6).map((img, index) =>
        `<img src="${basePath}/images/${img}" alt="${productName} ${index + 1}" loading="lazy" decoding="async" onerror="this.style.display='none'">`
    ).join('');

    const productImagesHtml = `
        <div class="product-images">
            <div class="main-image">
                <img id="main-product-image" src="${basePath}/images/${mainImg}" alt="${productName}" loading="lazy" decoding="async" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhsb2dnYW5nIGltYWdlPC90ZXh0Pjwvc3ZnPg=='" >
            </div>
            <div class="thumbnail-images">
                ${thumbnailsHtml}
            </div>
        </div>
    `;

    const headerNode = articleContent.querySelector('header');
    if (headerNode) {
        headerNode.insertAdjacentHTML('afterend', productImagesHtml);
    } else {
        articleContent.insertAdjacentHTML('afterbegin', productImagesHtml);
    }

    // Add thumbnail click handlers
    const thumbnails = articleContent.querySelectorAll('.thumbnail-images img');
    thumbnails.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            changeMainImage(thumb.src, thumb);
        });
    });
}

/**
 * Load and render markdown content for posts/products
 * @param {string} id - Content ID
 * @param {string} lang - Language code
 * @param {string} type - 'post' or 'product'
 */
async function loadMarkdownContent(id, lang, type) {
    try {
        const basePath = type === 'post' ? 'posts' : 'collection';
        const category = type === 'product'
            ? (collectionProducts.find(p => p.id === id)?.category || '')
            : '';

        const filePath = type === 'post'
            ? `${basePath}/${lang}/${id}.md`
            : `${basePath}/${category}/${lang}/${id}.md`;

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to load content: ${response.status}`);
        }

        const markdown = await response.text();
        const articleContent = document.getElementById('article-content');
        if (!articleContent) return;

        if (typeof marked === 'undefined') {
            throw new Error('Marked.js is not loaded');
        }

        const html = marked.parse(markdown);
        const safeHtml = (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function')
            ? window.DOMPurify.sanitize(html)
            : html;

        if (type === 'post') {
            const post = posts.find(p => p.id === id);
            if (!post) throw new Error(`Post not found: ${id}`);

            const title = getPostByLang(post, 'title', lang);
            const date = new Date(post.date);
            const locale = lang === 'en' ? 'en-US' : 'vi-VN';
            const formattedDate = date.toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const publishedOnText = t('post.publishedOn', lang);

            articleContent.innerHTML = `
                <header>
                    <h1>${title}</h1>
                    <p><small>📅 ${publishedOnText} ${formattedDate}</small></p>
                </header>
                <hr>
                ${safeHtml}
            `;
        } else {
            const product = collectionProducts.find(p => p.id === id);
            if (!product) throw new Error(`Product not found: ${id}`);

            const productName = getProductByLang(product, 'name', lang);
            const basePath = getBasePath();
            const mainImg = product.images && product.images[0] ? product.images[0] : 'placeholder1.png';
            const thumbnailsHtml = product.images
                ? product.images.slice(0, 6).map((img, i) =>
                    `<img src="${basePath}/images/${img}" alt="${productName} ${i + 1}" loading="lazy" decoding="async" class="thumb-img${i === 0 ? ' active' : ''}" onclick="changeMainImage('${basePath}/images/${img}', this)" onerror="this.style.display='none'">`
                ).join('')
                : '';
            articleContent.innerHTML = `
                <header>
                    <h1>${productName}</h1>
                </header>
                <div class="product-images">
                    <div class="main-image">
                        <img id="main-product-image" src="${basePath}/images/${mainImg}" alt="${productName}" loading="lazy" decoding="async" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkto4buZbmcg4bupY2gg4bqhaDwvdGV4dD48L3N2Zz4='" >
                    </div>
                    <div class="thumbnail-images">
                        ${thumbnailsHtml}
                    </div>
                </div>
                <hr>
                ${safeHtml}
            `;
        }

    } catch (error) {
        console.error(`Error loading ${type} content:`, error);
        const articleContent = document.getElementById('article-content');
        if (articleContent) {
            const currentLang = window.currentLanguage || 'vi';
            articleContent.innerHTML = `
                <div class="loading">
                    <p>${t('post.error', currentLang)}</p>
                </div>
            `;
        }
    }
}

/**
 * Change the main product image when thumbnail is clicked
 * @param {string} src - Image source URL
 * @param {HTMLElement} thumbEl - Thumbnail element
 */
function changeMainImage(src, thumbEl) {
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = src;
    }
    if (thumbEl) {
        const siblings = thumbEl.closest('.thumbnail-images');
        if (siblings) {
            siblings.querySelectorAll('.thumb-img').forEach(el => el.classList.remove('active'));
        }
        thumbEl.classList.add('active');
    }
}

/**
 * Initialize slideshow functionality for hero section
 */
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.getElementById('slide-prev');
    const nextButton = document.getElementById('slide-next');
    if (!slides.length) return;

    /**
     * Render the current slide
     * @param {number} index - Slide index to show
     */
    function renderSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    /**
     * Show next slide
     */
    function showNextSlide() {
        if (slides.length === 0) return;
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        renderSlide(currentSlideIndex);
    }

    /**
     * Start automatic slideshow
     */
    function startAutoSlideshow() {
        if (slides.length > 1) {
            clearInterval(slideshowInterval);
            slideshowInterval = setInterval(showNextSlide, 3000);
        }
    }

    /**
     * Go to specific slide
     * @param {number} index - Target slide index
     */
    function goToSlide(index) {
        currentSlideIndex = (index + slides.length) % slides.length;
        renderSlide(currentSlideIndex);
        startAutoSlideshow();
    }

    /**
     * Change slide by direction
     * @param {number} direction - -1 for previous, 1 for next
     */
    function changeSlide(direction) {
        currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
        renderSlide(currentSlideIndex);
        startAutoSlideshow();
    }

    // Event listeners
    if (prevButton) {
        prevButton.addEventListener('click', () => changeSlide(-1));
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => changeSlide(1));
    }

    indicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
            const target = Number(indicator.getAttribute('data-slide-to') || 0);
            goToSlide(target);
        });
    });

    renderSlide(currentSlideIndex);
    startAutoSlideshow();
}

/**
 * Setup category filter dropdown
 */
function setupCategoryFilter() {
    const filterSelect = document.getElementById('category-filter');
    if (!filterSelect) return;

    filterSelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        filterCollection(selectedCategory);
    });
}

/**
 * Setup collection interaction handlers
 */
function setupCollectionInteractions() {
    const collectionContainer = document.getElementById('collection-list');
    if (!collectionContainer) return;

    collectionContainer.addEventListener('click', function(event) {
        const pageButton = event.target.closest('[data-page]');
        if (pageButton) {
            const page = Number(pageButton.getAttribute('data-page') || '1');
            const filter = pageButton.getAttribute('data-filter') || currentFilter;
            displayCollectionProducts(page, filter);
        }
    });
}

/**
 * Initialize everything when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    console.log('Current script version: Optimized version');

    const staticPageType = typeof getCurrentStaticPageType === 'function' ? getCurrentStaticPageType() : '';

    // Initialize language from storage
    const initialLang = initializeLanguageFromStorage();
    window.currentLanguage = initialLang;

    // Initialize all modules
    console.log('Initializing language...');
    initializeLanguage();

    console.log('Initializing hamburger menu...');
    initializeHamburgerMenu();

    // Update page content
    updateLanguageToggleButton();
    updatePageTexts();

    if (staticPageType === 'detail') {
        console.log('Static detail page initialized');
        ensureStaticProductImages();
        return;
    }

    console.log('Initializing navigation...');
    initializeNavigation();

    console.log('Initializing search...');
    initializeSearch();

    console.log('Setting up category filter...');
    setupCategoryFilter();
    setupCollectionInteractions();

    // Check URL parameters for specific content
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    const productId = urlParams.get('product');

    if (postId) {
        console.log('Loading post:', postId);
        loadPost(postId);
    } else if (productId) {
        console.log('Loading product:', productId);
        loadProduct(productId);
    } else {
        console.log('Displaying post list and collection...');
        displayPostList();
        displayCollectionProducts();
    }

    // Initialize slideshow if needed
    initSlideshow();

    // Initialize scroll-triggered animations
    initializeScrollAnimations();

    // Initialize page transitions
    initializePageTransitions();

    console.log('Color Aquatic blog initialized successfully!');
});

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initializeScrollAnimations() {
    // Check if browser supports Intersection Observer
    if (!('IntersectionObserver' in window)) {
        console.warn('Intersection Observer not supported, falling back to basic animations');
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);

                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe section transitions and cards
    const sectionsToAnimate = ['.section-transition'];

    const cardsToAnimate = ['.product-card', '.post-card'];

    // Observe sections
    sectionsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            observer.observe(element);
        });
    });

    // Observe cards with staggered animation
    cardsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });
}

/**
 * Initialize smooth page transitions
 */
function initializePageTransitions() {
    // Override navigation functions to add transitions
    const originalNavigateToSection = window.navigateToSection;
    const originalLoadPost = window.loadPost;
    const originalLoadProduct = window.loadProduct;
    const originalShowHomePage = window.showHomePage;

    if (originalNavigateToSection) {
        window.navigateToSection = function(section) {
            smoothPageTransition(() => originalNavigateToSection(section));
        };
    }

    if (originalLoadPost) {
        window.loadPost = function(postId) {
            smoothPageTransition(() => originalLoadPost(postId));
        };
    }

    if (originalLoadProduct) {
        window.loadProduct = function(productId) {
            smoothPageTransition(() => originalLoadProduct(productId));
        };
    }

    if (originalShowHomePage) {
        window.showHomePage = function() {
            smoothPageTransition(() => originalShowHomePage());
        };
    }
}

/**
 * Smooth page transition wrapper
 * @param {Function} callback - Function to execute after transition
 */
function smoothPageTransition(callback) {
    // Add loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // Fade out current content
    const sections = document.querySelectorAll('.section-transition');
    sections.forEach(section => {
        if (section.style.display !== 'none') {
            section.classList.add('fade-out');
        }
    });

    // Execute callback after fade out
    setTimeout(() => {
        callback();

        // Fade in new content
        setTimeout(() => {
            const newSections = document.querySelectorAll('.section-transition');
            newSections.forEach(section => {
                if (section.style.display !== 'none') {
                    section.classList.remove('fade-out');
                    section.classList.add('fade-in');
                }
            });

            // Remove loading overlay
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                }
            }, 300);
        }, 50);
    }, 300);
}

/**
 * Add loading animation to async operations
 * @param {Function} asyncFunction - Async function to wrap
 * @returns {Function} Wrapped function with loading animation
 */
function withLoadingAnimation(asyncFunction) {
    return async function(...args) {
        // Add loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loadingOverlay);

        try {
            const result = await asyncFunction.apply(this, args);
            return result;
        } finally {
            // Remove loading overlay
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                }
            }, 300);
        }
    };
}

/**
 * Enhanced image loading with fade-in animation
 * @param {HTMLImageElement} img - Image element to enhance
 */
function enhanceImageLoading(img) {
    if (img.complete) {
        img.style.opacity = '1';
        return;
    }

    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in-out';

    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });

    img.addEventListener('error', () => {
        img.style.opacity = '1';
        // Fallback to placeholder
        img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial,sans-serif' font-size='14' fill='%23999'%3EImage%20unavailable%3C/text%3E%3C/svg%3E";
    });
}

/**
 * Initialize enhanced image loading for all images
 */
function initializeEnhancedImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"], .product-images img, .main-image img');
    images.forEach(enhanceImageLoading);
}

/**
 * Add bounce animation to elements on click
 * @param {HTMLElement} element - Element to add bounce effect to
 */
function addBounceEffect(element) {
    element.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'bounceIn 0.6s ease-out';
        }, 10);
    });
}

/**
 * Initialize bounce effects for interactive elements
 */
function initializeBounceEffects() {
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .product-card, .post-card');
    interactiveElements.forEach(addBounceEffect);
}

// Initialize enhanced features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced image loading
    initializeEnhancedImageLoading();

    // Initialize bounce effects
    initializeBounceEffects();

    console.log('Enhanced animations initialized!');
});

window.filterCollection = filterCollection;
window.changeMainImage = changeMainImage;

console.log('main.js completed loading - all modules integrated');
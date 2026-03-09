// Main JavaScript for Color Aquatic - Refactored version
console.log('main.js loaded - Refactored modular version');

// Global variables
window.currentLanguage = 'vi';
let currentCollectionPage = 1;
let currentFilter = 'all';
const productsPerPage = 20;
let currentSlideIndex = 0;
let slideshowInterval;

// Mobile Hamburger Menu
function initializeHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    
    if (!hamburgerMenu || !navMenu || !navOverlay) {
        console.error('Hamburger menu elements not found');
        return;
    }
    
    // Toggle menu function
    function toggleMenu() {
        const isActive = hamburgerMenu.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            // Show overlay first
            navOverlay.classList.add('active');
            
            // Then show menu with slight delay
            setTimeout(() => {
                hamburgerMenu.classList.add('active');
                navMenu.classList.add('active');
            }, 10);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close menu function
    function closeMenu() {
        if (!navMenu.classList.contains('active')) return;
        
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Hide overlay after menu animation
        setTimeout(() => {
            navOverlay.classList.remove('active');
        }, 300);
        
        document.body.style.overflow = '';
    }
    
    // Event listeners
    hamburgerMenu.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking on nav links (except language selector)
    const navLinks = navMenu.querySelectorAll('a:not(.lang-option)');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Display collection products with pagination and filtering
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

    // Display products
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        collectionContainer.appendChild(productCard);
    });

    // Add pagination
    if (totalPages > 1) {
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        paginationContainer.innerHTML = createPaginationHTML(page, totalPages, filter);
        collectionContainer.appendChild(paginationContainer);
    }

    console.log(`Displayed ${productsToShow.length} products (page ${page}/${totalPages}, filter: ${filter})`);
}

// Filter collection
function filterCollection(category) {
    currentCollectionPage = 1; // Reset về trang đầu khi filter
    displayCollectionProducts(1, category);
    
    // Update filter dropdown
    const filterDropdown = document.getElementById('category-filter');
    if (filterDropdown) {
        filterDropdown.value = category;
    }
}

// Display posts
function displayPostList(page = 1) {
    const postsContainer = document.getElementById('post-list');
    if (!postsContainer) return;

    const lang = window.currentLanguage || 'vi';
    // Clear existing content
    postsContainer.innerHTML = '';
    
    // Sort posts by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create card for each post
    sortedPosts.forEach(post => {
        const postCard = createPostCard(post);
        postsContainer.appendChild(postCard);
    });
}

// Display post detail
function displayPostDetail(post) {
    if (!post) return;
    
    const postDetailSection = document.getElementById('post-content');
    const articleContent = document.getElementById('article-content');
    if (!postDetailSection || !articleContent) return;

    const lang = window.currentLanguage || 'vi';
    articleContent.innerHTML = `<div class="loading">${t('post.loading', lang)}</div>`;

    postDetailSection.style.display = 'block';
    
    // Load markdown content using old source structure
    loadMarkdownContent(post.id, lang, 'post');
}

// Display product detail
function displayProductDetail(product) {
    if (!product) return;

    const postDetailSection = document.getElementById('post-content');
    const articleContent = document.getElementById('article-content');
    if (!postDetailSection || !articleContent) return;

    const lang = window.currentLanguage || 'vi';
    articleContent.innerHTML = `<div class="loading">${t('post.loading', lang)}</div>`;
    postDetailSection.style.display = 'block';
    
    // Load markdown content using old source structure
    loadMarkdownContent(product.id, lang, 'product');
}

// Load markdown content dynamically
async function loadMarkdownContent(id, lang, type) {
    try {
        const basePath = type === 'post' ? 'posts' : 'collection';
        const category = type === 'product'
            ? (collectionProducts.find(p => p.id === id)?.category || '')
            : '';
        
        const filePath = type === 'post'
            ?
            `${basePath}/${lang}/${id}.md` :
            `${basePath}/${category}/${lang}/${id}.md`;
        
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
                ${html}
            `;
        } else {
            const product = collectionProducts.find(p => p.id === id);
            if (!product) throw new Error(`Product not found: ${id}`);

            const productName = getProductByLang(product, 'name', lang);
            articleContent.innerHTML = `
                <header>
                    <h1>${productName}</h1>
                </header>
                <hr>
                ${html}
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

// Simple markdown parser (basic implementation)
function parseSimpleMarkdown(content) {
    return content
        // Headers
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        // Line breaks
        .replace(/\n/g, '<br>');
}

// Change main product image
function changeMainImage(src) {
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = src;
    }
}

// Initialize slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    if (!slides.length) return;

    function renderSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function showNextSlide() {
        if (slides.length === 0) return;
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        renderSlide(currentSlideIndex);
    }

    function startAutoSlideshow() {
        if (slides.length > 1) {
            // Clear any existing interval first
            clearInterval(slideshowInterval);
            // Start automatic slideshow with 3 second interval
            slideshowInterval = setInterval(showNextSlide, 3000);
        }
    }

    window.goToSlide = function(index) {
        currentSlideIndex = (index + slides.length) % slides.length;
        renderSlide(currentSlideIndex);
        // Restart auto slideshow after manual interaction
        startAutoSlideshow();
    };

    window.changeSlide = function(direction) {
        currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
        renderSlide(currentSlideIndex);
        // Restart auto slideshow after manual interaction
        startAutoSlideshow();
    };

    renderSlide(currentSlideIndex);
    // Start auto slideshow
    startAutoSlideshow();
}

// Setup category filter dropdown
function setupCategoryFilter() {
    const filterSelect = document.getElementById('category-filter');
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        filterCollection(selectedCategory);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    console.log('Current script version: Refactored modular version');
    
    // Initialize language from storage
    const initialLang = initializeLanguageFromStorage();
    window.currentLanguage = initialLang;
    
    // Initialize all modules
    console.log('Initializing language...');
    initializeLanguage();
    
    console.log('Initializing navigation...');
    initializeNavigation();
    
    console.log('Initializing search...');
    initializeSearch();
    
    console.log('Initializing hamburger menu...');
    initializeHamburgerMenu();
    
    console.log('Setting up category filter...');
    setupCategoryFilter();
    
    // Update page content
    updateLanguageToggleButton();
    updatePageTexts();
    
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
    
    console.log('Color Aquatic blog initialized successfully!');
});

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlideshow);
window.filterCollection = filterCollection;
window.changeMainImage = changeMainImage;

console.log('main.js completed loading - all modules integrated');
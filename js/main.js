// Main JavaScript for Color Aquatic - Refactored version
console.log('main.js loaded - Refactored modular version');

// Global variables
window.currentLanguage = 'vi';
let currentCollectionPage = 1;
let currentFilter = 'all';
const productsPerPage = 20;

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
    const endIndex = startIndex + productsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);

    let html = '';
    pageProducts.forEach(product => {
        html += createProductCard(product);
    });

    collectionContainer.innerHTML = html;

    // Update pagination
    updatePagination(totalPages, page, 'collection');

    console.log(`Displayed ${pageProducts.length} products (page ${page}/${totalPages}, filter: ${filter})`);
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

// Update pagination
function updatePagination(totalPages, currentPage, type) {
    const paginationContainer = document.getElementById(`${type}-pagination`);
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    paginationContainer.innerHTML = createPaginationHTML(totalPages, currentPage, type);
}

// Change page
function changePage(page, type) {
    if (type === 'posts') {
        displayPostList(page);
    } else if (type === 'collection') {
        displayCollectionProducts(page, currentFilter);
    }
    
    // Scroll to top of section
    const section = document.getElementById(type === 'posts' ? 'posts' : 'collection');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Display posts
function displayPostList(page = 1) {
    const postsContainer = document.getElementById('posts-list');
    if (!postsContainer) return;

    const lang = window.currentLanguage || 'vi';
    const totalPosts = posts.length;
    const postsPerPage = 6; // Số posts mỗi trang
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const pagePosts = posts.slice(startIndex, endIndex);
    
    let html = '';
    pagePosts.forEach(post => {
        html += createPostCard(post);
    });
    
    postsContainer.innerHTML = html;
    
    // Update pagination
    updatePagination(totalPages, page, 'posts');
}

// Display post detail
function displayPostDetail(post) {
    if (!post) return;
    
    const postDetailSection = document.getElementById('post-detail');
    if (!postDetailSection) return;
    
    const lang = window.currentLanguage || 'vi';
    const title = getPostByLang(post, 'title', lang);
    const description = getPostByLang(post, 'description', lang);
    
    const date = new Date(post.date);
    const locale = lang === 'en' ? 'en-US' : 'vi-VN';
    const formattedDate = date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    postDetailSection.innerHTML = `
        <div class="post-detail-header">
            <button class="back-btn" onclick="goBack()">
                <i class="fas fa-arrow-left"></i> ${t('common.back', lang)}
            </button>
        </div>
        <article class="post-detail-content">
            <h1>${title}</h1>
            <div class="post-meta">
                <span class="post-date">📅 ${formattedDate}</span>
            </div>
            <div class="post-description">
                <p>${description}</p>
            </div>
            <div class="post-content" id="post-markdown-content">
                ${t('common.loading', lang)}...
            </div>
        </article>
    `;
    
    // Load markdown content
    loadMarkdownContent(post.id, lang, 'post');
}

// Display product detail
function displayProductDetail(product) {
    if (!product) return;
    
    const productDetailSection = document.getElementById('product-detail');
    if (!productDetailSection) return;
    
    const lang = window.currentLanguage || 'vi';
    const name = getProductByLang(product, 'name', lang);
    const description = getProductByLang(product, 'shortDescription', lang);
    
    productDetailSection.innerHTML = `
        <div class="product-detail-header">
            <button class="back-btn" onclick="goBack()">
                <i class="fas fa-arrow-left"></i> ${t('common.back', lang)}
            </button>
        </div>
        <article class="product-detail-content">
            <h1>${name}</h1>
            <div class="product-gallery">
                <div class="main-image">
                    <img id="main-product-image" src="images/placeholder1.png" alt="${name}">
                </div>
                <div class="thumbnail-gallery">
                    ${product.images ? product.images.map((img, index) =>
                        `<img src="images/${img}" alt="${name} ${index + 1}" onclick="changeMainImage(this.src)">`
                    ).join('') : ''}
                </div>
            </div>
            <div class="product-info">
                <p class="product-description">${description}</p>
                ${(product.category !== 'accessory' && product.category !== 'plants') ? `
                <div class="product-specifications">
                    <h3>${t('collection.specifications', lang)}</h3>
                    <table>
                        <tr>
                            <td>${t('collection.temperature', lang)}:</td>
                            <td>${product.temperature || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>${t('collection.tds', lang)}:</td>
                            <td>${product.tds || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>${t('collection.gh', lang)}:</td>
                            <td>${product.gh || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>${t('collection.lifespan', lang)}:</td>
                            <td>${product.lifespan ? product.lifespan + ' ' + t('collection.years', lang) : 'N/A'}</td>
                        </tr>
                    </table>
                </div>
                ` : ''}
            </div>
            <div class="product-content" id="product-markdown-content">
                ${t('common.loading', lang)}...
            </div>
        </article>
    `;
    
    // Load markdown content
    loadMarkdownContent(product.id, lang, 'product');
}

// Load markdown content dynamically
async function loadMarkdownContent(id, lang, type) {
    try {
        const basePath = type === 'post' ? 'posts' : 'collection';
        const category = type === 'product' ? 
            collectionProducts.find(p => p.id === id)?.category || '' : '';
        
        const filePath = type === 'post' ? 
            `${basePath}/${lang}/${id}.md` :
            `${basePath}/${category}/${lang}/${id}.md`;
        
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`Failed to load content: ${response.status}`);
        }
        
        const content = await response.text();
        const contentContainer = document.getElementById(`${type}-markdown-content`);
        
        if (contentContainer) {
            // Simple markdown parsing (you can use a library like marked.js for better parsing)
            const htmlContent = parseSimpleMarkdown(content);
            contentContainer.innerHTML = htmlContent;
        }
        
    } catch (error) {
        console.error(`Error loading ${type} content:`, error);
        const contentContainer = document.getElementById(`${type}-markdown-content`);
        if (contentContainer) {
            const lang = window.currentLanguage || 'vi';
            contentContainer.innerHTML = `<p class="error-message">${t('common.contentLoadError', lang)}</p>`;
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
    console.log('Initializing slideshow...');
    // Slideshow implementation can be added here if needed
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

// Make functions globally available for onclick handlers
window.loadPost = loadPost;
window.loadProduct = loadProduct;
window.changePage = changePage;
window.filterCollection = filterCollection;
window.changeMainImage = changeMainImage;
window.goBack = goBack;

console.log('main.js completed loading - all modules integrated');
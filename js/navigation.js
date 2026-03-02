// Navigation and routing for Color Aquatic
console.log('navigation.js loaded');

// Initialize navigation functionality
function initializeNavigation() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', handlePopState);
    
    // Initialize navigation based on URL
    initializeFromUrl();
    
    // Add navigation event listeners
    setupNavigationListeners();
}

// Handle browser navigation
function handlePopState(event) {
    const state = event.state;
    
    if (state) {
        if (state.postId) {
            loadPost(state.postId);
        } else if (state.productId) {
            loadProduct(state.productId);
        } else if (state.section) {
            navigateToSection(state.section);
        }
    } else {
        // No state, show home page
        showHomePage();
    }
}

// Initialize page based on URL parameters
function initializeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    const productId = urlParams.get('product');
    const section = urlParams.get('section');
    
    if (postId) {
        loadPost(postId);
    } else if (productId) {
        loadProduct(productId);
    } else if (section) {
        navigateToSection(section);
    } else {
        showHomePage();
    }
}

// Setup navigation event listeners
function setupNavigationListeners() {
    // Navigation links
    document.addEventListener('click', function(e) {
        // Handle navigation links
        if (e.target.closest('[data-nav]')) {
            e.preventDefault();
            const section = e.target.closest('[data-nav]').getAttribute('data-nav');
            navigateToSection(section);
        }
        
        // Handle logo click
        if (e.target.closest('.logo')) {
            e.preventDefault();
            showHomePage();
        }
    });
}

// Navigate to section
function navigateToSection(section) {
    // Hide all sections
    hideAllSections();
    
    // Show target section
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.delete('post');
    url.searchParams.delete('product');
    url.searchParams.set('section', section);
    window.history.pushState({ section: section }, '', url.toString());
    
    // Update navigation highlighting
    updateActiveNavigation(section);
}

// Show home page
function showHomePage() {
    // Show main sections
    const heroSection = document.getElementById('hero');
    const collectionSection = document.getElementById('collection');
    const postsSection = document.getElementById('posts');
    const searchResultsSection = document.getElementById('search-results');
    
    if (heroSection) heroSection.style.display = 'block';
    if (collectionSection) collectionSection.style.display = 'block';
    if (postsSection) postsSection.style.display = 'block';
    if (searchResultsSection) searchResultsSection.style.display = 'none';
    
    // Hide detail sections
    const postDetailSection = document.getElementById('post-detail');
    const productDetailSection = document.getElementById('product-detail');
    
    if (postDetailSection) postDetailSection.style.display = 'none';
    if (productDetailSection) productDetailSection.style.display = 'none';
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.delete('post');
    url.searchParams.delete('product');
    url.searchParams.delete('section');
    window.history.pushState(null, '', url.toString());
    
    // Update navigation
    updateActiveNavigation('home');
    
    // Re-display content
    displayPostList();
    displayCollectionProducts();
}

// Hide all sections
function hideAllSections() {
    const sections = ['hero', 'collection', 'posts', 'search-results', 'post-detail', 'product-detail'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
}

// Update active navigation highlighting
function updateActiveNavigation(activeSection) {
    // Remove active class from all nav items
    const navLinks = document.querySelectorAll('.nav-link, .nav-item');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section
    const activeNavLink = document.querySelector(`[data-nav="${activeSection}"]`);
    if (activeNavLink) {
        activeNavLink.classList.add('active');
    }
}

// Load post and show detail
function loadPost(postId) {
    console.log(`Loading post: ${postId}`);
    
    const lang = window.currentLanguage || 'vi';
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        console.error('Post not found:', postId);
        showHomePage();
        return;
    }
    
    // Hide main sections
    hideAllSections();
    
    // Show post detail section
    const postDetailSection = document.getElementById('post-detail');
    if (postDetailSection) {
        postDetailSection.style.display = 'block';
    }
    
    // Load post content
    displayPostDetail(post);
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.delete('product');
    url.searchParams.delete('section');
    url.searchParams.set('post', postId);
    window.history.pushState({ postId: postId }, '', url.toString());
    
    // Update meta tags for SEO
    updateMetaTags(post, 'post');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Load product and show detail
function loadProduct(productId) {
    console.log(`Loading product: ${productId}`);
    
    const lang = window.currentLanguage || 'vi';
    const product = collectionProducts.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        showHomePage();
        return;
    }
    
    // Hide main sections
    hideAllSections();
    
    // Show product detail section
    const productDetailSection = document.getElementById('product-detail');
    if (productDetailSection) {
        productDetailSection.style.display = 'block';
    }
    
    // Load product content
    displayProductDetail(product);
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.delete('post');
    url.searchParams.delete('section');
    url.searchParams.set('product', productId);
    window.history.pushState({ productId: productId }, '', url.toString());
    
    // Update meta tags for SEO
    updateMetaTags(product, 'product');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Go back to previous page
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        showHomePage();
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Get current page type
function getCurrentPageType() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('post')) {
        return 'post';
    } else if (urlParams.get('product')) {
        return 'product';
    } else if (urlParams.get('section')) {
        return 'section';
    } else {
        return 'home';
    }
}

// Get current page ID
function getCurrentPageId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('post') || urlParams.get('product') || urlParams.get('section') || null;
}
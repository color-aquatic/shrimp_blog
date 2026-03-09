// Search functionality for Color Aquatic
console.log('search.js loaded');

// Search variables
let searchResults = [];
let isSearchActive = false;

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-search');
    const searchResultsContent = document.getElementById('search-results-content');
    
    if (!searchInput || !searchButton || !clearButton) {
        console.error('Search elements not found');
        return;
    }
    
    // Search on input
    searchInput.addEventListener('input', debounce(performSearch, 300));
    
    // Search on button click
    searchButton.addEventListener('click', performSearch);
    
    // Clear search
    clearButton.addEventListener('click', clearSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    if (searchResultsContent) {
        searchResultsContent.addEventListener('click', function(e) {
            const target = e.target.closest('[data-result-id][data-result-type]');
            if (!target) return;

            e.preventDefault();
            const id = target.getAttribute('data-result-id');
            const type = target.getAttribute('data-result-type');

            if (!id || !type) return;
            if (type === 'post') {
                loadPost(id);
            } else if (type === 'collection') {
                loadProduct(id);
            }
        });
    }
}

// Debounce function to limit search frequency
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    
    if (query.length === 0) {
        clearSearch();
        return;
    }
    
    // Show clear button
    const clearButton = document.getElementById('clear-search');
    clearButton.style.display = 'flex';
    
    // Search in posts and collections
    const postResults = searchInPosts(query);
    const collectionResults = searchInCollections(query);
    
    searchResults = {
        posts: postResults,
        collections: collectionResults,
        query: query
    };
    
    displaySearchResults();
    isSearchActive = true;
}

// Search in posts
function searchInPosts(query) {
    const lang = window.currentLanguage || 'vi';
    const results = [];
    const lowercaseQuery = query.toLowerCase();
    
    posts.forEach(post => {
        const title = getPostByLang(post, 'title', lang).toLowerCase();
        const description = getPostByLang(post, 'description', lang).toLowerCase();
        const keywords = getPostByLang(post, 'keywords', lang).toLowerCase();
        
        let score = 0;
        let matchedFields = [];
        
        if (title.includes(lowercaseQuery)) {
            score += 3; // Title matches have highest score
            matchedFields.push('title');
        }
        
        if (description.includes(lowercaseQuery)) {
            score += 2; // Description matches
            matchedFields.push('description');
        }
        
        if (keywords.includes(lowercaseQuery)) {
            score += 1; // Keywords matches
            matchedFields.push('keywords');
        }
        
        if (score > 0) {
            results.push({
                ...post,
                score,
                matchedFields,
                type: 'post'
            });
        }
    });
    
    // Sort by score (highest first)
    return results.sort((a, b) => b.score - a.score);
}

// Search in collections
function searchInCollections(query) {
    const lang = window.currentLanguage || 'vi';
    const results = [];
    const lowercaseQuery = query.toLowerCase();
    
    collectionProducts.forEach((product, index) => {
        const name = getProductByLang(product, 'name', lang);
        const description = getProductByLang(product, 'shortDescription', lang);
        
        if (!name || !description) {
            console.warn(`Product ${index} missing name or description for language ${lang}:`, product);
            return;
        }
        
        const nameLower = name.toLowerCase();
        const descriptionLower = description.toLowerCase();
        
        let score = 0;
        let matchedFields = [];
        
        if (nameLower.includes(lowercaseQuery)) {
            score += 3; // Name matches have highest score
            matchedFields.push('name');
        }
        
        if (descriptionLower.includes(lowercaseQuery)) {
            score += 2; // Description matches
            matchedFields.push('description');
        }
        
        // Search in specifications
        const specs = `${product.temperature || ''} ${product.tds || ''} ${product.gh || ''}`.toLowerCase();
        if (specs.includes(lowercaseQuery)) {
            score += 1;
            matchedFields.push('specs');
        }
        
        if (score > 0) {
            results.push({
                ...product,
                score,
                matchedFields,
                type: 'collection'
            });
        }
    });
    
    // Sort by score (highest first)
    return results.sort((a, b) => b.score - a.score);
}

// Display search results
function displaySearchResults() {
    const lang = window.currentLanguage || 'vi';
    const searchResultsSection = document.getElementById('search-results');
    const searchResultsContent = document.getElementById('search-results-content');
    const collectionSection = document.getElementById('collection');
    const postsSection = document.getElementById('posts');
    
    if (!searchResultsSection || !searchResultsContent) return;
    
    const totalResults = searchResults.posts.length + searchResults.collections.length;
    
    if (totalResults === 0) {
        // No results found
        searchResultsContent.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search no-results-icon"></i>
                <p>${t('search.noResults', lang)} "<strong>${searchResults.query}</strong>"</p>
                <p class="no-results-hint">${t('search.tryDifferentKeywords', lang)}</p>
            </div>
        `;
    } else {
        let html = `<div class="search-stats">${t('search.foundResults', lang).replace('{count}', totalResults).replace('{query}', searchResults.query)}</div>`;
        
        // Display collection results
        if (searchResults.collections.length > 0) {
            html += `
                <div class="search-results-section">
                    <h4><i class="fas fa-gem"></i> ${t('search.collectionResults', lang)} (${searchResults.collections.length})</h4>
                    <div class="grid">
            `;
            
            searchResults.collections.forEach(product => {
                html += createSearchResultCard(product, 'collection');
            });
            
            html += '</div></div>';
        }
        
        // Display post results
        if (searchResults.posts.length > 0) {
            html += `
                <div class="search-results-section">
                    <h4><i class="fas fa-newspaper"></i> ${t('search.postResults', lang)} (${searchResults.posts.length})</h4>
                    <div class="grid">
            `;
            
            searchResults.posts.forEach(post => {
                html += createSearchResultCard(post, 'post');
            });
            
            html += '</div></div>';
        }
        
        searchResultsContent.innerHTML = html;
    }
    
    // Show search results and hide original sections
    searchResultsSection.style.display = 'block';
    collectionSection.style.display = 'none';
    postsSection.style.display = 'none';
}

// Create search result card
function createSearchResultCard(item, type) {
    const lang = window.currentLanguage || 'vi';
    const query = searchResults.query;
    
    if (type === 'post') {
        const title = getPostByLang(item, 'title', lang);
        const description = getPostByLang(item, 'description', lang);
        const highlightedTitle = highlightText(title, query);
        const highlightedDescription = highlightText(description, query);
        
        const date = new Date(item.date);
        const locale = lang === 'en' ? 'en-US' : 'vi-VN';
        const formattedDate = date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const matchFields = item.matchedFields.map(field => {
            return t('search.field.' + field, lang);
        }).join(', ');
        
        return `
            <div class="post-card" data-result-type="post" data-result-id="${item.id}">
                <h3>${highlightedTitle}</h3>
                <div class="post-date">📅 ${formattedDate}</div>
                <p class="post-description">${highlightedDescription}</p>
                <div class="search-match-info">
                    <small><i class="fas fa-tag"></i> ${t('search.matchIn', lang)}: ${matchFields}</small>
                </div>
            </div>
        `;
    } else if (type === 'collection') {
        const name = getProductByLang(item, 'name', lang);
        const description = getProductByLang(item, 'shortDescription', lang);
        const highlightedName = highlightText(name, query);
        const highlightedDescription = highlightText(description, query);
        
        const matchFields = item.matchedFields.map(field => {
            return t('search.field.' + field, lang);
        }).join(', ');
        
        return `
            <div class="product-card" data-result-type="collection" data-result-id="${item.id}">
                <div class="product-images">
                    <div class="main-image">
                        <img src="images/placeholder1.png" alt="${name}" loading="lazy" decoding="async" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkto4buZbmcg4bupY2gg4bqhaDwvdGV4dD48L3N2Zz4='>
                    </div>
                    <div class="thumbnail-images">
                        ${item.images ? item.images.slice(0, 4).map((img, index) =>
                            `<img src="images/${img}" alt="${name} ${index + 1}" loading="lazy" decoding="async" onerror="this.style.display='none'">`
                        ).join('') : ''}
                    </div>
                </div>
                <div class="product-info">
                    <h3>${highlightedName}</h3>
                    <p class="product-description">${highlightedDescription}</p>
                    ${item.category !== 'accessory' && item.category !== 'plants' ? `
                    <div class="product-specs">
                        <div class="spec-item">
                            <span class="spec-label">${t('collection.temperature', lang)}:</span>
                            <span class="spec-value">${highlightText(item.temperature || '', query)}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">${t('collection.tds', lang)}:</span>
                            <span class="spec-value">${highlightText(item.tds || '', query)}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">${t('collection.gh', lang)}:</span>
                            <span class="spec-value">${highlightText(item.gh || '', query)}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">${t('collection.lifespan', lang)}:</span>
                            <span class="spec-value">${highlightText(item.lifespan || '', query)}</span>
                        </div>
                    </div>
                    ` : ''}
                    <button type="button" class="view-details-btn" data-result-type="collection" data-result-id="${item.id}">
                        ${t('collection.viewDetails', lang)}
                    </button>
                    <div class="search-match-info">
                        <small><i class="fas fa-tag"></i> ${t('search.matchIn', lang)}: ${matchFields}</small>
                    </div>
                </div>
            </div>
        `;
    }
}

// Highlight search terms in text
function highlightText(text, query) {
    if (!text || !query) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// Clear search
function clearSearch() {
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search');
    const searchResultsSection = document.getElementById('search-results');
    const collectionSection = document.getElementById('collection');
    const postsSection = document.getElementById('posts');
    const heroSection = document.getElementById('hero');
    
    if (searchInput) searchInput.value = '';
    if (clearButton) clearButton.style.display = 'none';
    if (searchResultsSection) searchResultsSection.style.display = 'none';
    if (collectionSection) collectionSection.style.display = 'block';
    if (postsSection) postsSection.style.display = 'block';
    if (heroSection) heroSection.style.display = 'block';
    
    searchResults = [];
    isSearchActive = false;
    
    // Re-display original content
    displayPostList();
    displayCollectionProducts();
}
// UI Helper Functions for Color Aquatic
console.log('ui-helpers.js loaded');

// Helper function to get post properties based on language
function getPostByLang(post, property, lang) {
    const langKey = property + (lang === 'en' ? 'En' : 'Vi');
    return post[langKey] || post[property] || '';
}

// Helper function to get post file path based on language
function getPostFile(postId, lang) {
    return `posts/${lang}/${postId}.md`;
}

// Helper function to get collection product properties based on language
function getProductByLang(product, property, lang) {
    const langKey = property + (lang === 'en' ? 'En' : 'Vi');
    return product[langKey] || product[property] || '';
}

// Create product card HTML
function createProductCard(product) {
    const lang = window.currentLanguage || 'vi';
    const card = document.createElement('div');
    card.className = 'product-card';

    const productName = getProductByLang(product, 'name', lang);
    const productDescription = getProductByLang(product, 'shortDescription', lang);

    card.innerHTML = `
        <div class="product-images">
            <div class="main-image">
                <img src="images/placeholder1.png" alt="${productName}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkto4buZbmcg4bupY2gg4bqhaDwvdGV4dD48L3N2Zz4='">
            </div>
            <div class="thumbnail-images">
                ${product.images.slice(0, 4).map((img, index) =>
                    `<img src="images/${img}" alt="${productName} ${index + 1}" onerror="this.style.display='none'">`
                ).join('')}
            </div>
        </div>
        <div class="product-info">
            <h3>${productName}</h3>
            <p class="product-description">${productDescription}</p>
            ${product.category !== 'accessory' && product.category !== 'plants' ? `
            <div class="product-specs">
                <div class="spec-item">
                    <span class="spec-label">${t('collection.temperature', lang)}:</span>
                    <span class="spec-value">${product.temperature}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">${t('collection.tds', lang)}:</span>
                    <span class="spec-value">${product.tds}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">${t('collection.gh', lang)}:</span>
                    <span class="spec-value">${product.gh}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">${t('collection.lifespan', lang)}:</span>
                    <span class="spec-value">${product.lifespan}</span>
                </div>
            </div>
            ` : ''}
            <button class="view-details-btn" onclick="loadProduct('${product.id}')">
                ${t('collection.viewDetails', lang)}
            </button>
        </div>
    `;

    return card;
}

// Create pagination HTML
function createPaginationHTML(currentPage, totalPages, filter = 'all') {
    const lang = window.currentLanguage || 'vi';
    let paginationHTML = '<div class="pagination-controls">';

    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="displayCollectionProducts(${currentPage - 1}, '${filter}')">${t('collection.previous', lang)}</button>`;
    }

    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += `<span class="pagination-current">${i}</span>`;
        } else {
            paginationHTML += `<button class="pagination-btn" onclick="displayCollectionProducts(${i}, '${filter}')">${i}</button>`;
        }
    }

    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="pagination-btn" onclick="displayCollectionProducts(${currentPage + 1}, '${filter}')">${t('collection.next', lang)}</button>`;
    }

    paginationHTML += '</div>';
    return paginationHTML;
}

// Create post card HTML
function createPostCard(post) {
    const lang = window.currentLanguage || 'vi';
    const card = document.createElement('a');
    card.href = `?post=${post.id}`;
    card.className = 'post-card';
    card.onclick = function(e) {
        e.preventDefault();
        loadPost(post.id);
    };
    
    const date = new Date(post.date);
    const locale = lang === 'en' ? 'en-US' : 'vi-VN';
    const formattedDate = date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const title = getPostByLang(post, 'title', lang);
    const description = getPostByLang(post, 'description', lang);

    card.innerHTML = `
        <h3>${title}</h3>
        <div class="post-date">📅 ${formattedDate}</div>
        <p class="post-description">${description}</p>
    `;

    return card;
}

// Update meta tags for SEO
function updateMetaTags(post) {
    const lang = window.currentLanguage || 'vi';
    const title = getPostByLang(post, 'title', lang);
    const description = getPostByLang(post, 'description', lang);
    const keywords = getPostByLang(post, 'keywords', lang);
    
    // Cập nhật title
    document.title = `${title} - Color Aquatic`;
    
    // Cập nhật meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
    
    // Cập nhật meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
        metaKeywords.setAttribute('content', keywords);
    }
    
    // Cập nhật canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        const baseUrl = window.location.origin + window.location.pathname;
        canonical.setAttribute('href', `${baseUrl}?post=${post.id}`);
    }
    
    // Cập nhật Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', `${title} - Color Aquatic`);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.setAttribute('content', description);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        const baseUrl = window.location.origin + window.location.pathname;
        ogUrl.setAttribute('content', `${baseUrl}?post=${post.id}`);
    }
}

// Update meta tags for product pages
function updateProductMetaTags(product, productName) {
    const lang = window.currentLanguage || 'vi';
    document.title = `${productName} - Color Aquatic`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        const description = getProductByLang(product, 'shortDescription', lang);
        metaDescription.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', `${productName} - Color Aquatic`);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        const description = getProductByLang(product, 'shortDescription', lang);
        ogDescription.setAttribute('content', description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        const baseUrl = window.location.origin + window.location.pathname;
        ogUrl.setAttribute('content', `${baseUrl}?product=${product.id}`);
    }
}

// Reset meta tags về trang chủ
function resetMetaTags() {
    const lang = window.currentLanguage || 'vi';
    if (lang === 'en') {
        document.title = 'Color Aquatic - Aquarium Shrimp Care Guide';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Blog sharing knowledge about aquarium shrimp, common shrimp species, care methods, tank setup and practical experience from long-time shrimp keepers.');
        }
    } else {
        document.title = 'Color Aquatic - Hướng dẫn nuôi và chăm sóc tép cảnh';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Blog chia sẻ kiến thức về nuôi tép cảnh, các loại tép phổ biến, cách chăm sóc, setup bể và kinh nghiệm thực tế từ người chơi tép lâu năm.');
        }
    }
    
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        const baseUrl = window.location.origin + window.location.pathname;
        canonical.setAttribute('href', baseUrl);
    }
}
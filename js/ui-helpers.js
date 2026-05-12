// ─── Cloudinary Configuration ───────────────────────────────────────────────
const CLOUDINARY_CLOUD_NAME = 'dgdwyi1wk';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Build a Cloudinary image URL with automatic format (WebP/AVIF) and quality.
 * @param {string} publicId - The Cloudinary public ID (e.g. 'shrimp-blog/shrimps/bluedream1')
 * @param {number} width    - Desired display width in pixels (default 600)
 * @returns {string} Optimized Cloudinary URL
 */
function getImageUrl(publicId, width = 600) {
    if (!publicId) return '';
    return `${CLOUDINARY_BASE}/f_auto,q_auto,w_${width}/${publicId}`;
}
// ────────────────────────────────────────────────────────────────────────────

// UI Helper Functions for Color Aquatic

/**
 * Get post file path based on language
 * @param {string} postId - Post ID
 * @param {string} lang - Language code
 * @returns {string} File path
 */
function getPostFile(postId, lang) {
    return `posts/${lang}/${postId}.md`;
}

/**
 * Get base path for the application
 * @returns {string} Base path
 */
function getBasePath() {
    return (typeof window.__BASE_PATH__ === 'string' ? window.__BASE_PATH__ : '');
}

/**
 * Get language from URL path
 * @param {string} pathname - URL pathname
 * @returns {string|null} Language code or null
 */
function getLanguageFromPath(pathname = window.location.pathname) {
    const bp = getBasePath();
    const stripped = bp ? pathname.replace(bp, '') : pathname;
    const segments = stripped.split('/').filter(Boolean);
    const lang = segments[0];
    return ['vi', 'en'].includes(lang) ? lang : null;
}

/**
 * Get current static page type
 * @returns {string} Page type
 */
function getCurrentStaticPageType() {
    return document.body?.dataset?.staticPageType || '';
}

/**
 * Check if running in static build mode
 * @returns {boolean} True if static build mode
 */
function isStaticBuildMode() {
    return Boolean(getCurrentStaticPageType());
}

/**
 * Build source URL with parameters
 * @param {Object} params - URL parameters
 * @param {string} params.lang - Language code
 * @param {string} params.postId - Post ID
 * @param {string} params.productId - Product ID
 * @param {string} params.section - Section name
 * @returns {string} Built URL
 */
function buildSourceUrl({ lang, postId, productId, section } = {}) {
    const params = new URLSearchParams();

    if (lang) {
        params.set('lang', lang);
    }
    if (postId) {
        params.set('post', postId);
    }
    if (productId) {
        params.set('product', productId);
    }
    if (section) {
        params.set('section', section);
    }

    const query = params.toString();
    return `${getBasePath()}/index.html${query ? `?${query}` : ''}`;
}

/**
 * Get home page path
 * @param {string} lang - Language code
 * @returns {string} Home path
 */
function getHomePath(lang = window.currentLanguage || getLanguageFromPath() || 'vi') {
    if (!isStaticBuildMode()) {
        return buildSourceUrl({ lang });
    }

    return `${getBasePath()}/${lang}/`;
}

/**
 * Get post page path
 * @param {string} postId - Post ID
 * @param {string} lang - Language code
 * @returns {string} Post path
 */
function getPostPath(postId, lang = window.currentLanguage || getLanguageFromPath() || 'vi') {
    if (!isStaticBuildMode()) {
        return buildSourceUrl({ lang, postId });
    }

    return `${getBasePath()}/${lang}/posts/${postId}/`;
}

/**
 * Get product page path
 * @param {string|Object} productOrId - Product object or ID
 * @param {string} lang - Language code
 * @returns {string} Product path
 */
function getProductPath(productOrId, lang = window.currentLanguage || getLanguageFromPath() || 'vi') {
    const product = typeof productOrId === 'string'
        ? collectionProducts.find((item) => item.id === productOrId)
        : productOrId;
    const productId = typeof productOrId === 'string' ? productOrId : productOrId?.id;
    const category = product?.category || 'shrimps';

    if (!isStaticBuildMode()) {
        return buildSourceUrl({ lang, productId });
    }

    return `${getBasePath()}/${lang}/collection/${category}/${productId}/`;
}

/**
 * Get language switch path
 * @param {string} lang - Target language code
 * @returns {string} Switch path
 */
function getLanguageSwitchPath(lang) {
    const body = document.body;
    const staticSwitch = lang === 'vi' ? body?.dataset?.switchVi : body?.dataset?.switchEn;
    if (staticSwitch) {
        return staticSwitch;
    }

    if (!isStaticBuildMode()) {
        const urlParams = new URLSearchParams(window.location.search);
        return buildSourceUrl({
            lang,
            postId: urlParams.get('post'),
            productId: urlParams.get('product'),
            section: urlParams.get('section')
        });
    }

    const pageType = getCurrentStaticPageType();
    if (pageType === 'detail') {
        const bp = getBasePath();
        const stripped = bp ? window.location.pathname.replace(bp, '') : window.location.pathname;
        const segments = stripped.split('/').filter(Boolean);
        if (segments[1] === 'posts' && segments[2]) {
            return getPostPath(segments[2], lang);
        }
        if (segments[1] === 'collection' && segments[2] && segments[3]) {
            return `${bp}/${lang}/collection/${segments[1]}/${segments[2]}/`;
        }
    }

    return getHomePath(lang);
}

/**
 * Create product card HTML element
 * @param {Object} product - Product object
 * @returns {HTMLElement} Product card element
 */
function createProductCard(product) {
    const lang = window.currentLanguage || 'vi';
    const card = document.createElement('div');
    card.className = 'product-card collection-item';

    const productName = getProductByLang(product, 'name', lang);
    const productDescription = getProductByLang(product, 'shortDescription', lang);

    card.innerHTML = `
        <div class="product-images">
            <div class="main-image">
                <img src="${getImageUrl(product.images && product.images[0] ? product.images[0] : 'placeholder1', 800)}" alt="${productName}" width="800" height="600" loading="lazy" decoding="async" onerror="this.style.opacity='0.3'">
            </div>
            <div class="thumbnail-images">
                ${product.images.slice(0, 4).map((img, index) =>
                    `<img src="${getImageUrl(img, 400)}" alt="${productName} ${index + 1}" width="400" height="300" loading="lazy" decoding="async" onerror="this.style.display='none'">`
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
            <a href="${getProductPath(product, lang)}" class="view-details-btn" role="button">
                ${t('collection.viewDetails', lang)}
            </a>
        </div>
    `;

    return card;
}

/**
 * Create pagination HTML
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {string} filter - Current filter
 * @returns {string} Pagination HTML
 */
function createPaginationHTML(currentPage, totalPages, filter = 'all') {
    const lang = window.currentLanguage || 'vi';
    let paginationHTML = '<div class="pagination-controls">';

    // Always render previous button to keep pagination layout stable across pages
    const hasPrevious = currentPage > 1;
    paginationHTML += `<button type="button" class="pagination-btn${hasPrevious ? '' : ' pagination-btn-disabled'}" data-page="${currentPage - 1}" data-filter="${filter}" ${hasPrevious ? '' : 'disabled aria-disabled="true" tabindex="-1"'}>${t('collection.previous', lang)}</button>`;

    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += `<button type="button" class="pagination-btn pagination-current" aria-current="page" tabindex="-1">${i}</button>`;
        } else {
            paginationHTML += `<button type="button" class="pagination-btn" data-page="${i}" data-filter="${filter}">${i}</button>`;
        }
    }

    // Always render next button to keep pagination layout stable across pages
    const hasNext = currentPage < totalPages;
    paginationHTML += `<button type="button" class="pagination-btn${hasNext ? '' : ' pagination-btn-disabled'}" data-page="${currentPage + 1}" data-filter="${filter}" ${hasNext ? '' : 'disabled aria-disabled="true" tabindex="-1"'}>${t('collection.next', lang)}</button>`;

    paginationHTML += '</div>';
    return paginationHTML;
}

/**
 * Create post card HTML element
 * @param {Object} post - Post object
 * @returns {HTMLElement} Post card element
 */
function createPostCard(post) {
    const lang = window.currentLanguage || 'vi';
    const card = document.createElement('a');
    card.href = getPostPath(post.id, lang);
    card.className = 'post-card';

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

/**
 * Update meta tags for SEO
 * @param {Object} post - Post object
 */
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

/**
 * Update meta tags for product pages
 * @param {Object} product - Product object
 * @param {string} productName - Product name
 */
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

/**
 * Reset meta tags to home page defaults
 */
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
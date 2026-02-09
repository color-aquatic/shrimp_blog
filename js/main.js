// Main JavaScript for Color Aquatic
console.log('main.js loaded - Version 1.0 with language switching');

// Current language - khởi tạo sau khi translations.js load
let currentLanguage = 'vi';
console.log('Initial language:', currentLanguage);

// Clear old/corrupted localStorage data if needed (uncomment to reset)
// localStorage.removeItem('blogLanguage');

// Danh sách bài viết (chung cho cả hai ngôn ngữ, file path sẽ được thay đổi dựa trên ngôn ngữ)
const posts = [
    {
        id: 'tep-mau',
        titleVi: 'Tép Màu (Neocaridina) - Hướng dẫn nuôi và chăm sóc',
        titleEn: 'Color Shrimp (Neocaridina) - Care and Breeding Guide',
        date: '2024-01-20',
        descriptionVi: 'Tìm hiểu về tép màu (Neocaridina) - nhóm tép cảnh phổ biến nhất với nhiều màu sắc đa dạng như đỏ, vàng, xanh, cam. Hướng dẫn cách nuôi và chăm sóc để chúng phát triển khỏe mạnh.',
        descriptionEn: 'Learn about color shrimp (Neocaridina) - the most popular group of aquarium shrimp with diverse colors like red, yellow, blue, orange. Guide on how to care and breed them for healthy development.',
        keywordsVi: 'tép màu, neocaridina, tép cherry, tép cảnh màu sắc, nuôi tép màu',
        keywordsEn: 'color shrimp, neocaridina, cherry shrimp, colorful aquarium shrimp, keeping color shrimp'
    },
    {
        id: 'tep-lanh',
        titleVi: 'Tép Lạnh - Hướng dẫn nuôi và chăm sóc',
        titleEn: 'Cold Water Shrimp - Care Guide',
        date: '2024-01-18',
        descriptionVi: 'Tìm hiểu về tép lạnh - nhóm tép có thể sống ở nhiệt độ thấp, không cần máy sưởi. Phù hợp với khí hậu mát mẻ và giúp tiết kiệm điện.',
        descriptionEn: 'Learn about cold water shrimp - a group of shrimp that can live at low temperatures without a heater. Suitable for cool climates and helps save electricity.',
        keywordsVi: 'tép lạnh, tép amano, tép ghost, nuôi tép không cần sưởi, tép ôn đới',
        keywordsEn: 'cold water shrimp, amano shrimp, ghost shrimp, shrimp without heater, temperate shrimp'
    },
    {
        id: 'tep-sulawesi',
        titleVi: 'Tép Sulawesi - Hướng dẫn nuôi và chăm sóc',
        titleEn: 'Sulawesi Shrimp - Care Guide',
        date: '2024-01-16',
        descriptionVi: 'Tìm hiểu về tép Sulawesi - nhóm tép quý hiếm và đặc biệt từ Indonesia. Yêu cầu điều kiện nuôi đặc biệt với nhiệt độ cao và pH cao.',
        descriptionEn: 'Learn about Sulawesi shrimp - rare and special shrimp group from Indonesia. Requires special care conditions with high temperature and high pH.',
        keywordsVi: 'tép sulawesi, tép cardinal, tép quý hiếm, nuôi tép sulawesi, caridina dennerli',
        keywordsEn: 'sulawesi shrimp, cardinal shrimp, rare shrimp, keeping sulawesi shrimp, caridina dennerli'
    },
    {
        id: 'setup-be-tep',
        titleVi: 'Hướng dẫn Setup Bể Tép Cảnh Cho Người Mới Bắt Đầu',
        titleEn: 'Aquarium Shrimp Setup Guide for Beginners',
        date: '2024-01-10',
        descriptionVi: 'Hướng dẫn chi tiết cách setup bể tép cảnh từ A-Z, bao gồm lựa chọn thiết bị, setup môi trường nước và các lưu ý quan trọng.',
        descriptionEn: 'Detailed guide on how to setup an aquarium shrimp tank from A-Z, including equipment selection, water environment setup and important notes.',
        keywordsVi: 'setup bể tép, bể tép cảnh, hướng dẫn nuôi tép',
        keywordsEn: 'shrimp tank setup, aquarium shrimp tank, shrimp keeping guide'
    }
];

// Collection products content (embedded markdown)
const collectionContent = {
    'vi': {
        'tep-bluedream': `# Tép Blue Dream

## Giới thiệu

Tép Blue Dream là một trong những giống tép cảnh quý hiếm và được yêu thích nhất hiện nay. Với màu xanh dương đặc trưng, chúng tạo nên một điểm nhấn tuyệt đẹp trong bể thủy sinh.

## Đặc điểm

- **Tên khoa học**: Caridina cf. cantonensis "Blue Dream"
- **Kích thước**: 2-3 cm khi trưởng thành
- **Màu sắc**: Xanh dương đặc trưng với ánh kim loại
- **Tính cách**: Hiền lành, thích sống theo nhóm
- **Độ khó nuôi**: Khó (phù hợp cho người chơi có kinh nghiệm)

## Thông số nước

| Thông số | Giá trị khuyến nghị |
|----------|---------------------|
| Nhiệt độ | 22-26°C |
| pH | 6.8-7.5 |
| TDS | 150-250 ppm |
| GH | 6-12 dGH |
| KH | 3-8 dKH |

## Đặc điểm sinh học

Tép Blue Dream có nguồn gốc từ khu vực Đông Nam Á, được lai tạo để có màu sắc đặc biệt. Chúng cần điều kiện nước ổn định và chất lượng cao để duy trì màu sắc.

## Cách nuôi

### Thiết bị cần thiết

1. **Bể nuôi**: Tối thiểu 40 lít, có thể nuôi chung với các loại tép khác màu
2. **Lọc**: Hệ thống lọc tốt để duy trì chất lượng nước
3. **Sưởi**: Duy trì nhiệt độ ổn định
4. **Ánh sáng**: Ánh sáng dịu nhẹ

### Thức ăn

- Thức ăn chuyên dụng cho tép cảnh
- Thức ăn tự nhiên: Tảo, màng sinh học
- Bổ sung vitamin và khoáng chất

## Lưu ý quan trọng

⚠️ **Quan trọng**: Tép Blue Dream rất nhạy cảm với thay đổi chất lượng nước. Hãy theo dõi TDS và các thông số nước thường xuyên.

## Tuổi thọ

1-2 năm trong điều kiện nuôi tốt.

## Giá cả

Tép Blue Dream có giá khá cao do độ quý hiếm và khó nuôi. Giá dao động từ 50.000 - 200.000 VNĐ/con tùy kích thước và chất lượng.`,
        'tep-pure-red-line': `# Tép Pure Red Line

## Giới thiệu

Tép Pure Red Line là giống tép cảnh có đường màu đỏ thuần khiết chạy dọc lưng. Chúng có ngoại hình đẹp mắt và màu sắc bền vững, phù hợp cho cả người mới bắt đầu và người chơi có kinh nghiệm.

## Đặc điểm

- **Tên khoa học**: Caridina cf. cantonensis "Pure Red Line"
- **Kích thước**: 2-3 cm khi trưởng thành
- **Màu sắc**: Đỏ thuần với đường đỏ nổi bật trên lưng
- **Tính cách**: Hiền lành, dễ thích nghi
- **Độ khó nuôi**: Trung bình (phù hợp cho người mới và có kinh nghiệm)

## Thông số nước

| Thông số | Giá trị khuyến nghị |
|----------|---------------------|
| Nhiệt độ | 20-28°C |
| pH | 6.5-7.8 |
| TDS | 120-200 ppm |
| GH | 4-10 dGH |
| KH | 2-6 dKH |

## Đặc điểm sinh học

Tép Pure Red Line được lai tạo để có đường màu đỏ đặc trưng. Chúng có khả năng thích nghi tốt với nhiều điều kiện nước khác nhau, dễ sinh sản trong môi trường nuôi.

## Cách nuôi

### Thiết bị cần thiết

1. **Bể nuôi**: Tối thiểu 30 lít, có thể nuôi đơn hoặc chung với các loại tép khác
2. **Lọc**: Hệ thống lọc cơ bản đến nâng cao
3. **Sưởi**: Tùy theo nhiệt độ phòng
4. **Ánh sáng**: Ánh sáng tự nhiên hoặc đèn LED dịu nhẹ

### Thức ăn

- Thức ăn viên chuyên dụng cho tép
- Thức ăn tự nhiên: Tảo, màng sinh học
- Rau xanh luộc: Rau bina, rau máng cầu
- Thức ăn đông lạnh: Artemia nhỏ

## Sinh sản

Tép Pure Red Line sinh sản dễ dàng trong điều kiện tốt. Con cái mang thai khoảng 3-4 tuần và có thể đẻ 20-50 tép con mỗi lần.

### Chăm sóc tép con

- Cần nơi ẩn náu an toàn
- Thức ăn nhỏ: Tảo tự nhiên, thức ăn nghiền
- Tránh lọc mạnh hút tép con

## Lưu ý quan trọng

⚠️ **Quan trọng**: Giữ màu đỏ thuần bằng cách nuôi riêng giống hoặc chấp nhận lai tạp tạo màu mới.

## Tuổi thọ

1-2 năm trong điều kiện nuôi tốt.

## Giá cả

Tép Pure Red Line có giá phải chăng, dao động từ 20.000 - 50.000 VNĐ/con tùy kích thước.`
    },
    'en': {
        'tep-bluedream': `# Blue Dream Shrimp

## Introduction

Blue Dream shrimp is one of the most precious and beloved aquarium shrimp varieties today. With their distinctive blue color, they create a beautiful highlight in aquariums.

## Characteristics

- **Scientific name**: Caridina cf. cantonensis "Blue Dream"
- **Size**: 2-3 cm when fully grown
- **Color**: Characteristic blue with metallic sheen
- **Temperament**: Gentle, prefers living in groups
- **Difficulty level**: Hard (suitable for experienced hobbyists)

## Water Parameters

| Parameter | Recommended Value |
|-----------|-------------------|
| Temperature | 22-26°C |
| pH | 6.8-7.5 |
| TDS | 150-250 ppm |
| GH | 6-12 dGH |
| KH | 3-8 dKH |

## Biological Characteristics

Blue Dream shrimp originates from Southeast Asia and has been selectively bred for their special coloration. They require stable and high-quality water conditions to maintain their color.

## Care Guide

### Required Equipment

1. **Tank**: Minimum 40 liters, can be kept with other colored shrimp varieties
2. **Filtration**: Good filtration system to maintain water quality
3. **Heater**: Maintain stable temperature
4. **Lighting**: Soft lighting

### Food

- Specialized shrimp food
- Natural food: Algae, biofilm
- Vitamin and mineral supplements

## Important Notes

⚠️ **Important**: Blue Dream shrimp are very sensitive to water quality changes. Monitor TDS and water parameters regularly.

## Lifespan

1-2 years under good care conditions.

## Price

Blue Dream shrimp are quite expensive due to their rarity and difficulty in breeding. Prices range from $2-8 USD per shrimp depending on size and quality.`,
        'tep-pure-red-line': `# Pure Red Line Shrimp

## Introduction

Pure Red Line shrimp are aquarium shrimp with pure red stripes running along their backs. They have an attractive appearance and sustainable colors, suitable for both beginners and experienced hobbyists.

## Characteristics

- **Scientific name**: Caridina cf. cantonensis "Pure Red Line"
- **Size**: 2-3 cm when fully grown
- **Color**: Pure red with prominent red stripes on the back
- **Temperament**: Gentle, easy to adapt
- **Difficulty level**: Medium (suitable for beginners and experienced keepers)

## Water Parameters

| Parameter | Recommended Value |
|-----------|-------------------|
| Temperature | 20-28°C |
| pH | 6.5-7.8 |
| TDS | 120-200 ppm |
| GH | 4-10 dGH |
| KH | 2-6 dKH |

## Biological Characteristics

Pure Red Line shrimp are bred to have characteristic red stripes. They have good adaptability to various water conditions and breed easily in captivity.

## Care Guide

### Required Equipment

1. **Tank**: Minimum 30 liters, can be kept alone or with other shrimp varieties
2. **Filtration**: Basic to advanced filtration system
3. **Heater**: Depending on room temperature
4. **Lighting**: Natural light or soft LED lighting

### Food

- Specialized shrimp pellets
- Natural food: Algae, biofilm
- Boiled vegetables: Spinach, watercress
- Frozen food: Small artemia

## Breeding

Pure Red Line shrimp breed easily under good conditions. Females carry eggs for about 3-4 weeks and can produce 20-50 shrimp per brood.

### Baby Shrimp Care

- Need safe hiding places
- Small food: Natural algae, crushed food
- Avoid strong filtration that sucks up babies

## Important Notes

⚠️ **Important**: Keep pure red color by breeding separately or accept hybridization to create new colors.

## Lifespan

1-2 years under good care conditions.

## Price

Pure Red Line shrimp are reasonably priced, ranging from $1-2 USD per shrimp depending on size.`
    }
};

// Collection products data
const collectionProducts = [
    {
        id: 'tep-bluedream',
        nameVi: 'Tép Blue Dream',
        nameEn: 'Blue Dream Shrimp',
        shortDescriptionVi: 'Tép cảnh với màu xanh dương tuyệt đẹp, phù hợp cho người chơi lâu năm.',
        shortDescriptionEn: 'Beautiful blue-colored aquarium shrimp, suitable for experienced hobbyists.',
        temperature: '22-26°C',
        tds: '150-250 ppm',
        gh: '6-12 dGH',
        lifespan: '1-2',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'tep-pure-red-line',
        nameVi: 'Tép Pure Red Line',
        nameEn: 'Pure Red Line Shrimp',
        shortDescriptionVi: 'Tép với đường màu đỏ thuần khiết, màu sắc sống động và bền vững.',
        shortDescriptionEn: 'Shrimp with pure red lines, vibrant and sustainable colors.',
        temperature: '20-28°C',
        tds: '120-200 ppm',
        gh: '4-10 dGH',
        lifespan: '1-2',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    }
];

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

// Helper function to get collection product file path based on language
// getProductFile function removed - now using embedded content

// Collection pagination variables
let currentCollectionPage = 1;
const productsPerPage = 20;

// Display collection products with pagination
function displayCollectionProducts(page = 1) {
    const collectionContainer = document.getElementById('collection-list');
    if (!collectionContainer) return;

    currentCollectionPage = page;

    // Calculate pagination
    const totalProducts = collectionProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, totalProducts);
    const productsToShow = collectionProducts.slice(startIndex, endIndex);

    // Clear existing content
    collectionContainer.innerHTML = '';

    if (productsToShow.length === 0) {
        collectionContainer.innerHTML = `<div class="loading">${t('collection.noProducts', currentLanguage)}</div>`;
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
        paginationContainer.innerHTML = createPaginationHTML(page, totalPages);
        collectionContainer.appendChild(paginationContainer);
    }
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const productName = getProductByLang(product, 'name', currentLanguage);
    const productDescription = getProductByLang(product, 'shortDescription', currentLanguage);

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
            <div class="product-specs">
                <div class="spec-item">
                    <span class="spec-label">${t('collection.temperature', currentLanguage)}:</span>
                    <span class="spec-value">${product.temperature}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">${t('collection.tds', currentLanguage)}:</span>
                    <span class="spec-value">${product.tds}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">${t('collection.gh', currentLanguage)}:</span>
                    <span class="spec-value">${product.gh}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">${t('collection.lifespan', currentLanguage)}:</span>
                    <span class="spec-value">${product.lifespan}</span>
                </div>
            </div>
            <button class="view-details-btn" onclick="loadProduct('${product.id}')">
                ${t('collection.viewDetails', currentLanguage)}
            </button>
        </div>
    `;

    return card;
}

// Create pagination HTML
function createPaginationHTML(currentPage, totalPages) {
    let paginationHTML = '<div class="pagination-controls">';

    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="displayCollectionProducts(${currentPage - 1})">${t('collection.previous', currentLanguage)}</button>`;
    }

    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += `<span class="pagination-current">${i}</span>`;
        } else {
            paginationHTML += `<button class="pagination-btn" onclick="displayCollectionProducts(${i})">${i}</button>`;
        }
    }

    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="pagination-btn" onclick="displayCollectionProducts(${currentPage + 1})">${t('collection.next', currentLanguage)}</button>`;
    }

    paginationHTML += '</div>';
    return paginationHTML;
}

// Load product details
function loadProduct(productId) {
    const product = collectionProducts.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    // Hide specific sections and show post content
    const postsSection = document.getElementById('posts');
    const collectionSection = document.getElementById('collection');
    const heroSection = document.getElementById('hero');
    const postContentElement = document.getElementById('post-content');

    if (postsSection) postsSection.style.display = 'none';
    if (collectionSection) collectionSection.style.display = 'none';
    if (heroSection) heroSection.style.display = 'none';
    if (postContentElement) postContentElement.style.display = 'block';

    // Update URL
    const newUrl = `${window.location.pathname}?product=${productId}`;
    window.history.pushState({ productId }, '', newUrl);

    // Load product content from embedded data
    const markdown = collectionContent[currentLanguage]?.[productId];

    if (!markdown) {
        console.error('Product content not found for:', productId, 'in language:', currentLanguage);
        document.getElementById('article-content').innerHTML = `
            <div class="error-message">
                <h2>${t('post.error', currentLanguage)}</h2>
                <p>Nội dung sản phẩm không tìm thấy.</p>
                <button onclick="goHome()" class="secondary">${t('post.backButton', currentLanguage)}</button>
            </div>
        `;
        return;
    }

    // Parse markdown and display
    const html = marked.parse(markdown);
    const articleElement = document.getElementById('article-content');

    if (articleElement) {
        articleElement.innerHTML = html;

        // Update page title and meta
        const productName = getProductByLang(product, 'name', currentLanguage);
        updateProductMetaTags(product, productName);
    }
}

// Update meta tags for product pages
function updateProductMetaTags(product, productName) {
    document.title = `${productName} - Color Aquatic`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        const description = getProductByLang(product, 'shortDescription', currentLanguage);
        metaDescription.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', `${productName} - Color Aquatic`);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        const description = getProductByLang(product, 'shortDescription', currentLanguage);
        ogDescription.setAttribute('content', description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        const baseUrl = window.location.origin + window.location.pathname;
        ogUrl.setAttribute('content', `${baseUrl}?product=${product.id}`);
    }
}

// Khởi tạo blog
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    console.log('Current script version: 1.0 - Language switching enabled');
    
    // Đảm bảo getCurrentLanguage đã được định nghĩa
    if (typeof getCurrentLanguage === 'function') {
        currentLanguage = getCurrentLanguage();
        console.log('Using getCurrentLanguage(), result:', currentLanguage);
    } else {
        currentLanguage = localStorage.getItem('blogLanguage') || 'vi';
        console.log('Using localStorage, language:', currentLanguage);
    }
    
    // Debug: Kiểm tra localStorage
    console.log('localStorage blogLanguage:', localStorage.getItem('blogLanguage'));
    console.log('All localStorage keys:', Object.keys(localStorage));
    
    // Load language và cập nhật UI
    console.log('Initializing language...');
    initializeLanguage();
    
    // Setup language selector
    console.log('Setting up language selector...');
    setupLanguageSelector();
    
    // Kiểm tra xem có đang xem bài viết hoặc sản phẩm cụ thể không
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
});

// Khởi tạo ngôn ngữ và cập nhật UI
function initializeLanguage() {
    // Lấy ngôn ngữ từ localStorage
    if (typeof getCurrentLanguage === 'function') {
        currentLanguage = getCurrentLanguage();
    } else {
        currentLanguage = localStorage.getItem('blogLanguage') || 'vi';
    }
    
    document.documentElement.lang = currentLanguage;
    updateLanguageSelector();
    updateTranslations();
}

// Setup language selector
function setupLanguageSelector() {
    const langOptions = document.querySelectorAll('.lang-option');
    console.log('Setting up language selector, found', langOptions.length, 'options');
    
    if (langOptions.length === 0) {
        console.error('No language options found! Check HTML structure.');
        return;
    }
    
    langOptions.forEach((option, index) => {
        console.log(`Setting up option ${index + 1}, data-lang:`, option.getAttribute('data-lang'));
        
        // Remove existing listeners if any by cloning
        const newOption = option.cloneNode(true);
        option.parentNode.replaceChild(newOption, option);
        
        // Add click event listener
        newOption.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const selectedLang = this.getAttribute('data-lang');
            console.log('=== Language option clicked ===');
            console.log('Selected language:', selectedLang);
            console.log('Current language:', currentLanguage);
            
            // Đóng dropdown
            const languageSelector = document.getElementById('language-selector');
            if (languageSelector) {
                languageSelector.removeAttribute('open');
            }
            
            // Switch language
            switchLanguage(selectedLang);
        });
    });
    
    console.log('Language selector setup complete');
}

// Cập nhật language selector (summary)
function updateLanguageSelector() {
    const languageSummary = document.getElementById('language-summary');
    if (!languageSummary) return;

    const flagSpan = languageSummary.querySelector('.lang-flag');
    const textSpan = languageSummary.querySelector('.lang-text');

    if (flagSpan) {
        // Remove existing flag classes
        flagSpan.classList.remove('flag-vn', 'flag-gb');
        // Add appropriate flag class
        flagSpan.classList.add(currentLanguage === 'en' ? 'flag-gb' : 'flag-vn');
    }
    
    if (textSpan) {
        // Hiển thị tên ngôn ngữ thay vì "Ngôn ngữ"
        const langName = currentLanguage === 'en' ? 'English' : 'Tiếng Việt';
        textSpan.textContent = langName;
    }
}

// Chuyển đổi ngôn ngữ
function switchLanguage(lang) {
    console.log('=== switchLanguage() called ===');
    console.log('New language:', lang);
    console.log('Current language:', currentLanguage);
    
    if (lang === currentLanguage) {
        console.log('Same language, no change needed');
        // Đóng dropdown nếu đang mở
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.removeAttribute('open');
        }
        return;
    }
    
    // Lưu ngôn ngữ mới TRƯỚC khi update currentLanguage
    if (typeof setLanguage === 'function') {
        setLanguage(lang);
    } else {
        localStorage.setItem('blogLanguage', lang);
    }
    
    // Cập nhật currentLanguage TRƯỚC khi load lại
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    console.log('Language updated to:', currentLanguage);
    console.log('Updating UI...');

    // Cập nhật language selector (summary)
    updateLanguageSelector();

    // Reload current view - QUAN TRỌNG: load lại với ngôn ngữ mới
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    const productId = urlParams.get('product');

    console.log('Current postId from URL:', postId);
    console.log('Current productId from URL:', productId);

    if (postId) {
        console.log('Reloading post with new language:', currentLanguage);
        loadPost(postId);
    } else if (productId) {
        console.log('Reloading product with new language:', currentLanguage);
        loadProduct(productId);
    } else {
        // Ensure collection section is visible
        const collectionSection = document.getElementById('collection');
        if (collectionSection) collectionSection.style.display = 'block';

        displayPostList();
        displayCollectionProducts();
    }

    // Cập nhật translations cho tất cả elements (sau khi đã render lại)
    updateTranslations();
}

// Cập nhật translations cho tất cả elements có data-translate
function updateTranslations() {
    // Kiểm tra xem function t() có tồn tại không
    if (typeof t !== 'function') {
        console.error('Translation function t() is not defined! Make sure translations.js is loaded first.');
        return;
    }
    
    const elements = document.querySelectorAll('[data-translate]');
    console.log('Updating translations for', elements.length, 'elements, language:', currentLanguage);
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (!key) return;
        
        // Bỏ qua lang-text vì nó được update riêng trong updateLanguageSelector()
        if (element.classList && element.classList.contains('lang-text')) {
            return;
        }
        
        const translation = t(key, currentLanguage);
        if (!translation) {
            console.warn('No translation found for key:', key);
            return;
        }
        
        // Cập nhật theo loại element
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.value = translation;
        } else if (element.hasAttribute('placeholder')) {
            element.setAttribute('placeholder', translation);
        } else {
            // Cập nhật text content (innerHTML nếu có HTML)
            if (element.innerHTML.includes('<') && !element.querySelector('span')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    console.log('Translations updated successfully');
}

// Hiển thị danh sách bài viết
function displayPostList() {
    const postListContainer = document.getElementById('post-list');
    const postContentSection = document.getElementById('post-content');
    const postsSection = document.getElementById('posts');
    const collectionSection = document.getElementById('collection');

    if (!postListContainer) return;

    // Hiển thị phần danh sách bài viết và bộ sưu tập
    postsSection.style.display = 'block';
    collectionSection.style.display = 'block';
    postContentSection.style.display = 'none';
    
    // Xóa nội dung cũ
    postListContainer.innerHTML = '';
    
    // Sắp xếp bài viết theo ngày (mới nhất trước)
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Tạo card cho mỗi bài viết
    sortedPosts.forEach(post => {
        const postCard = createPostCard(post);
        postListContainer.appendChild(postCard);
    });
}

// Tạo card bài viết
function createPostCard(post) {
    const card = document.createElement('a');
    card.href = `?post=${post.id}`;
    card.className = 'post-card';
    card.onclick = function(e) {
        e.preventDefault();
        loadPost(post.id);
        // Cập nhật URL mà không reload trang
        window.history.pushState({ postId: post.id }, '', `?post=${post.id}`);
    };
    
    const date = new Date(post.date);
    const locale = currentLanguage === 'en' ? 'en-US' : 'vi-VN';
    const formattedDate = date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const title = getPostByLang(post, 'title', currentLanguage);
    const description = getPostByLang(post, 'description', currentLanguage);
    
    card.innerHTML = `
        <h3>${title}</h3>
        <div class="post-date">📅 ${formattedDate}</div>
        <p class="post-description">${description}</p>
    `;
    
    return card;
}

// Load bài viết
async function loadPost(postId) {
    console.log('=== loadPost() called ===');
    console.log('postId:', postId);
    console.log('currentLanguage:', currentLanguage);
    
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        console.error('Post not found:', postId);
        displayPostList();
        return;
    }
    
    const postListContainer = document.getElementById('post-list');
    const postContentSection = document.getElementById('post-content');
    const articleContent = document.getElementById('article-content');
    const postsSection = document.getElementById('posts');
    const collectionSection = document.getElementById('collection');

    // Ẩn danh sách bài viết và bộ sưu tập, hiển thị nội dung bài viết
    postsSection.style.display = 'none';
    collectionSection.style.display = 'none';
    postContentSection.style.display = 'block';
    
    // Hiển thị loading
    const loadingText = t('post.loading', currentLanguage);
    articleContent.innerHTML = `<div class="loading">${loadingText}</div>`;
    
    try {
        // Load file Markdown từ thư mục posts/{lang}/
        const postFile = getPostFile(postId, currentLanguage);
        console.log('Loading post file:', postFile);
        console.log('Expected path: posts/' + currentLanguage + '/' + postId + '.md');
        
        const response = await fetch(postFile);
        
        if (!response.ok) {
            throw new Error('Failed to load post');
        }
        
        const markdown = await response.text();
        
        // Render Markdown sang HTML
        if (typeof marked !== 'undefined') {
            const html = marked.parse(markdown);
            
            // Cập nhật nội dung bài viết
            const date = new Date(post.date);
            const locale = currentLanguage === 'en' ? 'en-US' : 'vi-VN';
            const formattedDate = date.toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const title = getPostByLang(post, 'title', currentLanguage);
            const publishedOnText = t('post.publishedOn', currentLanguage);
            
            articleContent.innerHTML = `
                <header>
                    <h1>${title}</h1>
                    <p><small>📅 ${publishedOnText} ${formattedDate}</small></p>
                </header>
                <hr>
                ${html}
            `;
            
            // Cập nhật meta tags cho SEO
            updateMetaTags(post);
            
            // Cập nhật translations cho button back
            updateTranslations();
            
            // Scroll lên đầu trang
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            throw new Error('Marked.js is not loaded');
        }
    } catch (error) {
        console.error('Error loading post:', error);
        const errorText = t('post.error', currentLanguage);
        const backButtonText = t('post.backButton', currentLanguage);
        articleContent.innerHTML = `
            <div class="loading">
                <p>${errorText}</p>
                <a href="index.html" role="button" data-translate="post.backButton">${backButtonText}</a>
            </div>
        `;
        updateTranslations();
    }
}

// Cập nhật meta tags cho SEO
function updateMetaTags(post) {
    const title = getPostByLang(post, 'title', currentLanguage);
    const description = getPostByLang(post, 'description', currentLanguage);
    const keywords = getPostByLang(post, 'keywords', currentLanguage);
    
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

// Xử lý nút back của trình duyệt
window.addEventListener('popstate', function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    const productId = urlParams.get('product');

    if (postId) {
        loadPost(postId);
    } else if (productId) {
        loadProduct(productId);
    } else {
        // Ensure all sections are visible when going back to home
        const postsSection = document.getElementById('posts');
        const collectionSection = document.getElementById('collection');
        if (postsSection) postsSection.style.display = 'block';
        if (collectionSection) collectionSection.style.display = 'block';

        displayPostList();
        displayCollectionProducts();
        // Reset meta tags về trang chủ
        resetMetaTags();
    }
});

// Reset meta tags về trang chủ
function resetMetaTags() {
    if (currentLanguage === 'en') {
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

// Go back to home page
function goHome() {
    // Hide post content and show main content
    document.querySelector('main').style.display = 'block';
    document.getElementById('post-content').style.display = 'none';

    // Ensure all sections are visible
    const postsSection = document.getElementById('posts');
    const collectionSection = document.getElementById('collection');
    if (postsSection) postsSection.style.display = 'block';
    if (collectionSection) collectionSection.style.display = 'block';

    // Reset URL
    window.history.pushState({}, '', window.location.pathname);

    // Display posts and collection
    displayPostList();
    displayCollectionProducts();

    // Reset meta tags
    resetMetaTags();
}

// Main JavaScript for Color Aquatic
console.log('main.js loaded - Version 1.0 with language switching');

// Current language - khởi tạo sau khi translations.js load
let currentLanguage = 'vi';
console.log('Initial language:', currentLanguage);

// Clear old/corrupted localStorage data if needed (uncomment to reset)
// localStorage.removeItem('blogLanguage');

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

const collectionProducts = [
    {
        id: 'tep-bluedream',
        category: 'shrimps',
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
        category: 'shrimps',
        nameVi: 'Tép Pure Red Line',
        nameEn: 'Pure Red Line Shrimp',
        shortDescriptionVi: 'Tép với đường màu đỏ thuần khiết, màu sắc sống động và bền vững.',
        shortDescriptionEn: 'Shrimp with pure red lines, vibrant and sustainable colors.',
        temperature: '20-28°C',
        tds: '120-200 ppm',
        gh: '4-10 dGH',
        lifespan: '1-2',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'tep-blue-diamond',
        category: 'shrimps',
        nameVi: 'Tép Blue Diamond',
        nameEn: 'Blue Diamond Shrimp',
        shortDescriptionVi: 'Tép cảnh với màu xanh kim cương lấp lánh, dễ nuôi cho người mới.',
        shortDescriptionEn: 'Diamond-blue colored shrimp with sparkling beauty, easy for beginners.',
        temperature: '20-26°C',
        tds: '150-300 ppm',
        gh: '4-8 dGH',
        lifespan: '1-2',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'tep-cam',
        category: 'shrimps',
        nameVi: 'Tép Cam',
        nameEn: 'Orange Shrimp',
        shortDescriptionVi: 'Tép màu cam rực rỡ, dễ nuôi và giá cả phải chăng.',
        shortDescriptionEn: 'Vibrant orange shrimp, easy to keep and affordable.',
        temperature: '18-25°C',
        tds: '150-350 ppm',
        gh: '3-15 dGH',
        lifespan: '1-1.5',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'tep-bloody-mary',
        category: 'shrimps',
        nameVi: 'Tép Bloody Mary',
        nameEn: 'Bloody Mary Shrimp',
        shortDescriptionVi: 'Tép cao cấp với màu đỏ thẫm và đầu trong suốt độc đáo.',
        shortDescriptionEn: 'Premium shrimp with deep red color and unique transparent head.',
        temperature: '20-24°C',
        tds: '150-250 ppm',
        gh: '4-8 dGH',
        lifespan: '1.5-2',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'tep-snow-ball',
        category: 'shrimps',
        nameVi: 'Tép Snow Ball',
        nameEn: 'Snow Ball Shrimp',
        shortDescriptionVi: 'Tép trắng tinh như tuyết, tạo điểm nhấn đẹp trong bể cây xanh.',
        shortDescriptionEn: 'Pure white snow-like shrimp, beautiful accent in planted tanks.',
        temperature: '18-26°C',
        tds: '150-350 ppm',
        gh: '4-12 dGH',
        lifespan: '1-2',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'tep-black-galaxy-fishbone-snowflake',
        category: 'shrimps',
        nameVi: 'Tép Black Galaxy Fishbone Snowflake',
        nameEn: 'Black Galaxy Fishbone Snowflake Shrimp',
        shortDescriptionVi: 'Tép lạnh cao cấp với họa tiết thiên hà đen và tuyết rơi.',
        shortDescriptionEn: 'Premium cold-water shrimp with black galaxy and snowflake patterns.',
        temperature: '20-24°C',
        tds: '90-150 ppm',
        gh: '3-6 dGH',
        lifespan: '2-3',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'tep-black-galaxy-boa',
        category: 'shrimps',
        nameVi: 'Tép Black Galaxy BOA',
        nameEn: 'Black Galaxy BOA Shrimp',
        shortDescriptionVi: 'Vua của các loại tép lạnh với vẻ đẹp tuyệt đỉnh và giá trị cực cao.',
        shortDescriptionEn: 'The king of cold-water shrimp with ultimate beauty and extreme value.',
        temperature: '18-22°C',
        tds: '80-120 ppm',
        gh: '2-5 dGH',
        lifespan: '3-4',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'tep-red-galaxy-tiger',
        category: 'shrimps',
        nameVi: 'Tép Red Galaxy Tiger',
        nameEn: 'Red Galaxy Tiger Shrimp',
        shortDescriptionVi: 'Tép lạnh với màu đỏ rực rỡ, họa tiết sọc hổ và chấm galaxy.',
        shortDescriptionEn: 'Cold-water shrimp with vibrant red, tiger stripes and galaxy spots.',
        temperature: '20-24°C',
        tds: '100-160 ppm',
        gh: '3-6 dGH',
        lifespan: '2-2.5',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    // Sample fishes products
    {
        id: 'ca-betta',
        category: 'fishes',
        nameVi: 'Cá Betta (Xiêm)',
        nameEn: 'Betta Fish (Siamese Fighter)',
        shortDescriptionVi: 'Cá Betta với màu sắc rực rỡ và dễ nuôi, phù hợp cho người mới bắt đầu.',
        shortDescriptionEn: 'Vibrant and easy-to-care Betta fish, perfect for beginners.',
        temperature: '24-28°C',
        tds: '150-300 ppm',
        gh: '5-19 dGH',
        lifespan: '2-3',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'ca-guppy',
        category: 'fishes',
        nameVi: 'Cá Guppy',
        nameEn: 'Guppy Fish',
        shortDescriptionVi: 'Cá Guppy nhỏ xinh với màu sắc đa dạng, sinh sản nhanh và dễ chăm sóc.',
        shortDescriptionEn: 'Small colorful Guppy fish, fast breeding and easy care.',
        temperature: '22-28°C',
        tds: '150-400 ppm',
        gh: '7-12 dGH',
        lifespan: '1-2',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    // Sample accessory products
    {
        id: 'may-loc-nuoc',
        category: 'accessory',
        nameVi: 'Máy Lọc Nước Mini',
        nameEn: 'Mini Water Filter',
        shortDescriptionVi: 'Máy lọc nước nhỏ gọn phù hợp cho bể nano, duy trì chất lượng nước tốt.',
        shortDescriptionEn: 'Compact water filter suitable for nano tanks, maintains good water quality.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '1-2',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'den-led-thuy-sinh',
        category: 'accessory',
        nameVi: 'Đèn LED Thủy Sinh',
        nameEn: 'LED Aquarium Light',
        shortDescriptionVi: 'Đèn LED chuyên dụng cho thủy sinh, hỗ trợ quang hợp và tăng màu sắc.',
        shortDescriptionEn: 'Specialized LED light for aquariums, supports photosynthesis and enhances colors.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '3-5',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    // New accessory products
    {
        id: 'loc-qs200',
        category: 'accessory',
        nameVi: 'Lọc QS200',
        nameEn: 'QS200 Filter',
        shortDescriptionVi: 'Combo lọc vi sinh cao cấp từ Qanvee, tích hợp công nghệ denitrate khử nitrat hiệu quả.',
        shortDescriptionEn: 'Premium biological filtration combo from Qanvee with advanced denitrate technology for effective nitrate removal.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '2-3',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'loc-thac-kaokui',
        category: 'accessory',
        nameVi: 'Lọc thác Kaokui',
        nameEn: 'Kaokui Waterfall Filter',
        shortDescriptionVi: 'Hệ thống lọc treo ngoài với thiết kế thác nước độc đáo, model KK-528 và KK-538.',
        shortDescriptionEn: 'Hang-on-back filtration system with unique waterfall design, models KK-528 and KK-538.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '2-3',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'keo-dan-reu-thuy-sinh',
        category: 'accessory',
        nameVi: 'Keo dán rêu thủy sinh',
        nameEn: 'Aquatic Moss Glue',
        shortDescriptionVi: 'Keo GUO Elephant Super Glue chuyên dụng cho việc dán rêu và cây thủy sinh, an toàn sinh học.',
        shortDescriptionEn: 'GUO Elephant Super Glue specially designed for attaching moss and aquatic plants, biologically safe.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '1-2',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'binh-co2-thuy-sinh',
        category: 'accessory',
        nameVi: 'Bình CO2 thủy sinh',
        nameEn: 'Aquatic CO2 Tank',
        shortDescriptionVi: 'Thiết bị cung cấp carbon dioxide cho cây thủy sinh, thúc đẩy quá trình quang hợp.',
        shortDescriptionEn: 'Carbon dioxide supply device for aquatic plants, promoting photosynthesis process.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '3-5',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'loc-vang-kaokui',
        category: 'accessory',
        nameVi: 'Lọc váng Kaokui',
        nameEn: 'Kaokui Surface Skimmer',
        shortDescriptionVi: 'Thiết bị KK-88 Surface Skimmer Mini chuyên loại bỏ váng dầu và tạp chất nổi.',
        shortDescriptionEn: 'KK-88 Surface Skimmer Mini device specialized in removing oil film and floating debris.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '2-3',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'den-neo-helios',
        category: 'accessory',
        nameVi: 'Đèn Neo-Helios',
        nameEn: 'Neo-Helios Light',
        shortDescriptionVi: 'Đèn LED RGB 3 in 1 cao cấp với công nghệ Solar Light, thiết kế phẳng hiện đại.',
        shortDescriptionEn: 'Premium RGB LED 3-in-1 light with Solar Light technology and modern flat design.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '5-7',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    },
    {
        id: 'men-vi-sinh-koika-bac',
        category: 'accessory',
        nameVi: 'Men vi sinh Koika-Bac',
        nameEn: 'Koika-Bac Microorganisms',
        shortDescriptionVi: 'Sản phẩm bổ sung men vi sinh chuyên dụng, giúp phân hủy chất thải và cân bằng sinh học.',
        shortDescriptionEn: 'Specialized probiotic supplement that helps decompose waste and maintain biological balance.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '1-2',
        images: ['placeholder1.png', 'placeholder2.png', 'placeholder3.png', 'placeholder4.png']
    }
];

// Collection product content is now loaded from files dynamically
// No embedded content needed - files are in collection/{lang}/{productId}.md

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

// Collection pagination and filter variables
let currentCollectionPage = 1;
let currentFilter = 'all';
const productsPerPage = 20;

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

    // Calculate pagination
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, totalProducts);
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

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
        paginationContainer.innerHTML = createPaginationHTML(page, totalPages, filter);
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
            ${product.category !== 'accessory' ? `
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
            ` : ''}
            <button class="view-details-btn" onclick="loadProduct('${product.id}')">
                ${t('collection.viewDetails', currentLanguage)}
            </button>
        </div>
    `;

    return card;
}

// Create pagination HTML
function createPaginationHTML(currentPage, totalPages, filter = 'all') {
    let paginationHTML = '<div class="pagination-controls">';

    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="displayCollectionProducts(${currentPage - 1}, '${filter}')">${t('collection.previous', currentLanguage)}</button>`;
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
        paginationHTML += `<button class="pagination-btn" onclick="displayCollectionProducts(${currentPage + 1}, '${filter}')">${t('collection.next', currentLanguage)}</button>`;
    }

    paginationHTML += '</div>';
    return paginationHTML;
}

// Filter collection products by category
function filterCollection(category) {
    currentFilter = category;
    currentCollectionPage = 1; // Reset to first page when filtering
    displayCollectionProducts(1, category);
}

// Load product details
async function loadProduct(productId) {
    console.log('=== loadProduct() called ===');
    console.log('productId:', productId);
    console.log('currentLanguage:', currentLanguage);
    
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
    const articleContent = document.getElementById('article-content');

    if (postsSection) postsSection.style.display = 'none';
    if (collectionSection) collectionSection.style.display = 'none';
    if (heroSection) heroSection.style.display = 'none';
    if (postContentElement) postContentElement.style.display = 'block';

    // Update URL
    const newUrl = `${window.location.pathname}?product=${productId}`;
    window.history.pushState({ productId }, '', newUrl);

    // Hiển thị loading
    const loadingText = t('post.loading', currentLanguage);
    articleContent.innerHTML = `<div class="loading">${loadingText}</div>`;

    try {
        // Load file Markdown từ thư mục collection/{category}/{lang}/
        const productFile = `collection/${product.category}/${currentLanguage}/${productId}.md`;
        console.log('Loading product file:', productFile);
        
        const response = await fetch(productFile);
        
        if (!response.ok) {
            throw new Error('Failed to load product');
        }
        
        const markdown = await response.text();
        
        // Render Markdown sang HTML
        if (typeof marked !== 'undefined') {
            const html = marked.parse(markdown);
            
            // Cập nhật nội dung sản phẩm
            const productName = getProductByLang(product, 'name', currentLanguage);
            
            articleContent.innerHTML = `
                <header>
                    <h1>${productName}</h1>
                </header>
                <hr>
                ${html}
            `;
            
            // Cập nhật meta tags cho SEO
            updateProductMetaTags(product, productName);
            
            // Cập nhật translations cho button back
            updateTranslations();
            
            // Scroll lên đầu trang
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            throw new Error('Marked.js is not loaded');
        }
    } catch (error) {
        console.error('Error loading product:', error);
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

// Function to update footer translations
function updateFooterTranslations() {
    console.log('updateFooterTranslations called');
    console.log('Current language:', currentLanguage);

    const hotline = t('footer.hotline', currentLanguage);
    const address = t('footer.address', currentLanguage);
    const representative = t('footer.representative', currentLanguage);
    const email = t('footer.email', currentLanguage);
    const payment = t('footer.payment', currentLanguage);

    console.log('Fetched translations:', { hotline, address, representative, email, payment });

    document.querySelector('[data-translate="footer.hotline"]').textContent = hotline;
    document.querySelector('[data-translate="footer.address"]').textContent = address;
    document.querySelector('[data-translate="footer.representative"]').textContent = representative;
    document.querySelector('[data-translate="footer.email"]').innerHTML = `<a href="mailto:hoangquoctu95@gmail.com">${email}</a>`;
    document.querySelector('[data-translate="footer.payment"]').textContent = payment;
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
    
    // Initialize search functionality
    console.log('Initializing search...');
    initializeSearch();
    
    // Initialize hamburger menu
    console.log('Initializing hamburger menu...');
    initializeHamburgerMenu();
    
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
    
    // Update collection filter dropdown options
    updateCollectionFilterOptions();
    
    console.log('Translations updated successfully');
}

// Update collection filter dropdown options with current language
function updateCollectionFilterOptions() {
    const filterSelect = document.getElementById('category-filter');
    if (!filterSelect) return;
    
    const currentValue = filterSelect.value;
    
    // Update option texts
    const options = filterSelect.querySelectorAll('option');
    options.forEach(option => {
        const key = option.getAttribute('data-translate');
        if (key) {
            option.textContent = t(key, currentLanguage);
        }
    });
    
    // Preserve current selection
    filterSelect.value = currentValue;
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

// Slideshow functionality
let currentSlideIndex = 0;
let slides = [];
let indicators = [];
let slideshowInterval;

function initSlideshowElements() {
    slides = document.querySelectorAll('.slide');
    indicators = document.querySelectorAll('.indicator');
}

function updateSlideshow() {
    // Hide all slides and deactivate all indicators
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (indicators[index]) {
            indicators[index].classList.remove('active');
        }
    });
    
    // Show current slide and activate indicator
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
}

function showNextSlide() {
    if (slides.length === 0) return;
    
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlideshow();
}

function showPrevSlide() {
    if (slides.length === 0) return;
    
    currentSlideIndex = currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
    updateSlideshow();
}

function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        currentSlideIndex = index;
        updateSlideshow();
        
        // Restart auto slideshow
        clearInterval(slideshowInterval);
        startAutoSlideshow();
    }
}

function changeSlide(direction) {
    if (direction === 1) {
        showNextSlide();
    } else {
        showPrevSlide();
    }
    
    // Restart auto slideshow
    clearInterval(slideshowInterval);
    startAutoSlideshow();
}

function startAutoSlideshow() {
    if (slides.length > 1) {
        // Start automatic slideshow with 3 second interval
        slideshowInterval = setInterval(showNextSlide, 3000);
    }
}

function initSlideshow() {
    initSlideshowElements();
    if (slides.length > 0) {
        updateSlideshow();
        startAutoSlideshow();
    }
}

// Initialize slideshow when DOM is ready
document.addEventListener('DOMContentLoaded', initSlideshow);

// Search functionality
let searchResults = [];
let isSearchActive = false;

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-search');
    
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
    const results = [];
    const lowercaseQuery = query.toLowerCase();
    
    posts.forEach(post => {
        const title = getPostByLang(post, 'title', currentLanguage).toLowerCase();
        const description = getPostByLang(post, 'description', currentLanguage).toLowerCase();
        const keywords = getPostByLang(post, 'keywords', currentLanguage).toLowerCase();
        
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
    const results = [];
    const lowercaseQuery = query.toLowerCase();
    
    collectionProducts.forEach((product, index) => {
        const name = getProductByLang(product, 'name', currentLanguage);
        const description = getProductByLang(product, 'shortDescription', currentLanguage);
        
        if (!name || !description) {
            console.warn(`Product ${index} missing name or description for language ${currentLanguage}:`, product);
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
                <i class="fas fa-search" style="font-size: 3rem; color: var(--muted-color); margin-bottom: 1rem;"></i>
                <p>${t('search.noResults', currentLanguage)} "<strong>${searchResults.query}</strong>"</p>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">${t('search.tryDifferentKeywords', currentLanguage)}</p>
            </div>
        `;
    } else {
        let html = `<div class="search-stats">${t('search.foundResults', currentLanguage).replace('{count}', totalResults).replace('{query}', searchResults.query)}</div>`;
        
        // Display collection results
        if (searchResults.collections.length > 0) {
            html += `
                <div class="search-results-section">
                    <h4><i class="fas fa-gem"></i> ${t('search.collectionResults', currentLanguage)} (${searchResults.collections.length})</h4>
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
                    <h4><i class="fas fa-newspaper"></i> ${t('search.postResults', currentLanguage)} (${searchResults.posts.length})</h4>
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
    const query = searchResults.query;
    
    if (type === 'post') {
        const title = getPostByLang(item, 'title', currentLanguage);
        const description = getPostByLang(item, 'description', currentLanguage);
        const highlightedTitle = highlightText(title, query);
        const highlightedDescription = highlightText(description, query);
        
        const date = new Date(item.date);
        const locale = currentLanguage === 'en' ? 'en-US' : 'vi-VN';
        const formattedDate = date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const matchFields = item.matchedFields.map(field => {
            return t('search.field.' + field, currentLanguage);
        }).join(', ');
        
        return `
            <div class="post-card" onclick="loadPost('${item.id}'); window.history.pushState({ postId: '${item.id}' }, '', '?post=${item.id}')">
                <h3>${highlightedTitle}</h3>
                <div class="post-date">📅 ${formattedDate}</div>
                <p class="post-description">${highlightedDescription}</p>
                <div class="search-match-info">
                    <small><i class="fas fa-tag"></i> ${t('search.matchIn', currentLanguage)}: ${matchFields}</small>
                </div>
            </div>
        `;
    } else if (type === 'collection') {
        const name = getProductByLang(item, 'name', currentLanguage);
        const description = getProductByLang(item, 'shortDescription', currentLanguage);
        const highlightedName = highlightText(name, query);
        const highlightedDescription = highlightText(description, query);
        
        const matchFields = item.matchedFields.map(field => {
            return t('search.field.' + field, currentLanguage);
        }).join(', ');
        
        return `
            <div class="product-card" onclick="loadProduct('${item.id}'); window.history.pushState({ productId: '${item.id}' }, '', '?product=${item.id}')">
                <div class="product-images">
                    <div class="main-image">
                        <img src="images/placeholder1.png" alt="${name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkto4buZbmcg4bupY2gg4bqhaDwvdGV4dD48L3N2Zz4='>
                    </div>
                    <div class="thumbnail-images">
                        ${item.images ? item.images.slice(0, 4).map((img, index) =>
                            `<img src="images/${img}" alt="${name} ${index + 1}" onerror="this.style.display='none'">`
                        ).join('') : ''}
                    </div>
                </div>
                <div class="product-info">
                    <h3>${highlightedName}</h3>
                    <p class="product-description">${highlightedDescription}</p>
                    ${item.category !== 'accessory' ? `
                    <div class="product-specs">
                        <div class="spec-item">
                            <span class="spec-label">${t('collection.temperature', currentLanguage)}:</span>
                            <span class="spec-value">${highlightText(item.temperature || '', query)}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">${t('collection.tds', currentLanguage)}:</span>
                            <span class="spec-value">${highlightText(item.tds || '', query)}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">${t('collection.gh', currentLanguage)}:</span>
                            <span class="spec-value">${highlightText(item.gh || '', query)}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">${t('collection.lifespan', currentLanguage)}:</span>
                            <span class="spec-value">${highlightText(item.lifespan || '', query)}</span>
                        </div>
                    </div>
                    ` : ''}
                    <button class="view-details-btn" onclick="loadProduct('${item.id}'); window.history.pushState({ productId: '${item.id}' }, '', '?product=${item.id}')">
                        ${t('collection.viewDetails', currentLanguage)}
                    </button>
                    <div class="search-match-info">
                        <small><i class="fas fa-tag"></i> ${t('search.matchIn', currentLanguage)}: ${matchFields}</small>
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

// Make functions globally available for onclick handlers
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;

// Translations for Color Aquatic Blog
// Multi-language support: Vietnamese (vi) and English (en)

const translations = {
    vi: {
        // Navigation
        nav: {
            home: 'Trang chủ',
            collection: 'Bộ sưu tập',
            posts: 'Bài viết',
            about: 'Giới thiệu'
        },
        
        // Hero Section
        hero: {
            title: 'Chào mừng đến với Color Aquatic',
            subtitle: 'Nơi chia sẻ kiến thức và kinh nghiệm về nuôi tép cảnh'
        },
        
        // Collection Section
        collection: {
            title: '🦐 Bộ sưu tập',
            viewDetails: 'Xem chi tiết',
            temperature: 'Nhiệt độ',
            tds: 'TDS',
            gh: 'GH',
            lifespan: 'Tuổi thọ (năm)',
            loading: 'Đang tải bộ sưu tập...',
            noProducts: 'Không có sản phẩm nào.',
            previous: 'Trước',
            next: 'Tiếp'
        },

        // Posts Section
        posts: {
            title: '📝 Bài viết mới nhất'
        },
        
        // Post Content
        post: {
            backButton: '← Quay lại trang chủ',
            loading: 'Đang tải bài viết...',
            error: '❌ Không thể tải bài viết. Vui lòng thử lại sau.',
            publishedOn: 'Ngày đăng:'
        },
        
        // About Section
        about: {
            title: 'Giới thiệu',
            content: 'Blog này được tạo ra để chia sẻ kiến thức, kinh nghiệm và niềm đam mê về tép cảnh. Từ những người mới bắt đầu đến những người chơi lâu năm, chúng tôi hy vọng sẽ mang đến những thông tin hữu ích cho cộng đồng yêu thích tép cảnh.'
        },
        
        // Footer
        footer: {
            copyright: '© 2024 Color Aquatic'
        },
        
        // Language Selector
        language: {
            label: 'Ngôn ngữ',
            vi: 'Tiếng Việt',
            en: 'English'
        }
    },
    
    en: {
        // Navigation
        nav: {
            home: 'Home',
            collection: 'Collection',
            posts: 'Posts',
            about: 'About'
        },
        
        // Hero Section
        hero: {
            title: 'Welcome to Color Aquatic',
            subtitle: 'A place to share knowledge and experience about keeping aquarium shrimp'
        },
        
        // Collection Section
        collection: {
            title: '🦐 Collection',
            viewDetails: 'View Details',
            temperature: 'Temperature',
            tds: 'TDS',
            gh: 'GH',
            lifespan: 'Lifespan (year)',
            loading: 'Loading collection...',
            noProducts: 'No products available.',
            previous: 'Previous',
            next: 'Next'
        },

        // Posts Section
        posts: {
            title: '📝 Latest Posts'
        },
        
        // Post Content
        post: {
            backButton: '← Back to Home',
            loading: 'Loading post...',
            error: '❌ Unable to load post. Please try again later.',
            publishedOn: 'Published on:'
        },
        
        // About Section
        about: {
            title: 'About',
            content: 'This blog was created to share knowledge, experience, and passion for aquarium shrimp. From beginners to experienced hobbyists, we hope to provide useful information for the aquarium shrimp community.'
        },
        
        // Footer
        footer: {
            copyright: '© 2024 Color Aquatic'
        },
        
        // Language Selector
        language: {
            label: 'Language',
            vi: 'Tiếng Việt',
            en: 'English'
        }
    }
};

// Function to get translation for a key
function t(key, lang = 'vi') {
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            console.warn(`Translation missing for key: ${key} in language: ${lang}`);
            return key;
        }
    }
    
    return value;
}

// Function to get current language from localStorage or default to Vietnamese
function getCurrentLanguage() {
    const lang = localStorage.getItem('blogLanguage') || 'vi';
    console.log('getCurrentLanguage() called, returning:', lang);
    return lang;
}

// Function to set language in localStorage
function setLanguage(lang) {
    console.log('setLanguage() called with:', lang);
    localStorage.setItem('blogLanguage', lang);
}

# Color Aquatic - Cấu trúc mã nguồn và hướng dẫn bảo trì

## Tổng quan 

Dự án đã được tái cấu trúc từ một file JavaScript lớn (1700+ dòng) thành kiến trúc modular để có thể dễ dàng bảo trì và mở rộng.

## Cấu trúc thư mục JavaScript

```
js/
├── main.js           # File chính điều phối tất cả modules
├── data.js           # Chứa dữ liệu posts và products
├── ui-helpers.js     # Các hàm utility cho UI (createProductCard, createPaginationHTML...)
├── language.js       # Quản lý đa ngôn ngữ (vi/en switching)
├── search.js         # Chức năng tìm kiếm
├── navigation.js     # Điều hướng và routing
└── translations.js   # Bảng dịch cho nhiều ngôn ngữ
```

## Mô tả chi tiết các module

### 1. main.js (File chính - 400 dòng)
**Chức năng**: Khởi tạo ứng dụng và điều phối các module khác
- Khởi tạo hamburger menu
- Hiển thị danh sách posts và products
- Lắng nghe DOM events
- Quản lý pagination

**Hàm quan trọng**:
- `displayCollectionProducts()` - Hiển thị danh sách sản phẩm
- `displayPostList()` - Hiển thị danh sách bài viết
- `displayPostDetail()` - Hiển thị chi tiết bài viết
- `displayProductDetail()` - Hiển thị chi tiết sản phẩm

### 2. data.js (Dữ liệu - 200 dòng)  
**Chức năng**: Chứa toàn bộ dữ liệu tĩnh
- `posts[]` - Mảng các bài viết blog
- `collectionProducts[]` - Mảng sản phẩm (tép, cá, phụ kiện, cây)

**Cách thêm dữ liệu mới**:
```javascript
// Thêm bài viết mới
posts.push({
    id: 'post-id',
    title: { vi: 'Tiêu đề VN', en: 'English Title' },
    date: '2024-01-01',
    description: { vi: 'Mô tả VN', en: 'English Description' },
    keywords: { vi: 'từ khóa', en: 'keywords' }
});

// Thêm sản phẩm mới  
collectionProducts.push({
    id: 'product-id',
    category: 'shrimps', // shrimps, fishes, accessory, plants
    name: { vi: 'Tên VN', en: 'English Name' },
    shortDescription: { vi: 'Mô tả ngắn VN', en: 'English Description' },
    temperature: '20-26°C',
    // ...các thuộc tính khác
});
```

### 3. ui-helpers.js (UI Utilities - 300 dòng)
**Chức năng**: Các hàm tiện ích tái sử dụng cho giao diện
- `createProductCard()` - Tạo card sản phẩm
- `createPostCard()` - Tạo card bài viết  
- `createPaginationHTML()` - Tạo pagination
- `updateMetaTags()` - Cập nhật meta SEO

### 4. language.js (Đa ngôn ngữ - 200 dòng)
**Chức năng**: Quản lý chuyển đổi ngôn ngữ vi/en
- `toggleLanguage()` - Chuyển đổi ngôn ngữ
- `getPostByLang()` - Lấy text theo ngôn ngữ cho posts
- `getProductByLang()` - Lấy text theo ngôn ngữ cho products
- `updatePageTexts()` - Cập nhật toàn bộ text trên trang

### 5. search.js (Tìm kiếm - 400 dòng)
**Chức năng**: Tìm kiếm thông minh
- Tìm kiếm trong posts và products 
- Highlighting kết quả
- Scoring theo mức độ khớp
- UI hiển thị kết quả

### 6. navigation.js (Điều hướng - 300 dòng)  
**Chức năng**: Quản lý routing và navigation
- Browser history management
- URL parameter handling  
- Deep linking support
- Back/Forward navigation

## Quy trình thêm tính năng mới

### 1. Thêm sản phẩm mới
1. Thêm object vào `collectionProducts[]` trong **data.js**
2. Tạo file markdown tương ứng: `collection/{category}/{lang}/{product-id}.md`
3. Thêm hình ảnh vào thư mục `images/`

### 2. Thêm bài viết mới  
1. Thêm object vào `posts[]` trong **data.js**
2. Tạo file markdown: `posts/{lang}/{post-id}.md`

### 3. Thêm ngôn ngữ mới
1. Cập nhật `translations.js`
2. Thêm logic trong `language.js`
3. Tạo files markdown tương ứng

### 4. Thêm category sản phẩm mới
1. Thêm vào filter dropdown trong HTML
2. Cập nhật logic filter trong **main.js**
3. Cập nhật cấu trúc thư mục markdown

## Cách debug và troubleshoot

### 1. Kiểm tra console logs
Mỗi module có log riêng để debug:
```
data.js loaded
ui-helpers.js loaded  
language.js loaded
search.js loaded
navigation.js loaded
main.js loaded - Refactored modular version
```

### 2. Kiểm tra loading order
Modules phải được load theo thứ tự trong index.html:
1. translations.js (cần trước tiên)
2. data.js (cần cho các module khác)  
3. ui-helpers.js
4. language.js
5. search.js  
6. navigation.js
7. main.js (cuối cùng)

### 3. Common issues
- **Lỗi function not defined**: Kiểm tra `window.FunctionName = functionName` trong module tương ứng
- **Ngôn ngữ không chuyển**: Kiểm tra translations.js và language.js 
- **Search không hoạt động**: Kiểm tra data.js có load đúng không
- **Navigation bị lỗi**: Kiểm tra URL parameters và history API

## Performance optimizations

- **Lazy loading**: Images sử dụng onerror fallback
- **Pagination**: Chỉ render items trong trang hiện tại
- **Debounce**: Search có delay 300ms để tránh spam
- **Modular loading**: Code được tách nhỏ, browser có thể cache riêng biệt

## Browser support

- Modern browsers (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Requires ES6+ support
- Uses fetch API, Promises, const/let

## Deployment checklist

1. ✅ Test tất cả tính năng trên local
2. ✅ Kiểm tra responsive design 
3. ✅ Validate HTML/CSS
4. ✅ Test trên 2-3 browsers khác nhau
5. ✅ Kiểm tra SEO meta tags
6. ✅ Compress images nếu cần
7. ✅ Minify JavaScript nếu production

## Backup và versioning  

- Khuyến nghị dùng Git để version control
- Regular backup của thư mục `collection/` và `posts/`

---

*Tài liệu này được tạo cùng với việc refactor mã nguồn vào tháng 12/2024*
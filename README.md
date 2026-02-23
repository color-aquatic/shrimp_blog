# Color Aquatic

Blog tĩnh về tép cảnh được xây dựng bằng HTML5, CSS3 với Pico.css và hỗ trợ viết bài bằng Markdown.

## Cấu trúc thư mục

```
shrimp_blog/
│
├── index.html          # Trang chủ với tìm kiếm và Google Maps
├── css/
│   └── style.css       # CSS tùy chỉnh với responsive design
├── js/
│   ├── main.js         # JavaScript xử lý Markdown, tìm kiếm, hamburger menu
│   └── translations.js # Hỗ trợ đa ngôn ngữ
├── posts/
│   ├── vi/             # Bài viết tiếng Việt
│   │   ├── tep-mau.md
│   │   ├── setup-be-tep.md
│   │   ├── tep-sulawesi.md
│   │   └── tep-lanh.md
│   └── en/             # Bài viết tiếng Anh
│       ├── tep-mau.md
│       ├── setup-be-tep.md
│       ├── tep-sulawesi.md
│       └── tep-lanh.md
├── collection/
│   ├── vi/             # Bộ sưu tập tiếng Việt
│   │   ├── tep-bluedream.md
│   │   └── tep-pure-red-line.md
│   └── en/             # Bộ sưu tập tiếng Anh
│       ├── tep-bluedream.md
│       └── tep-pure-red-line.md
├── images/             # Hình ảnh website
└── README.md
```

## Tính năng

- ✅ Cấu trúc SEO chuẩn với meta tags đầy đủ
- ✅ Responsive design với Pico.css
- ✅ Hỗ trợ viết bài bằng Markdown
- ✅ Tự động render Markdown sang HTML với Marked.js
- ✅ Navigation động giữa các bài viết
- ✅ UI/UX hiện đại và dễ sử dụng
- ✅ Hamburger menu responsive cho mobile
- ✅ Tính năng tìm kiếm thông minh cho bài viết và bộ sưu tập
- ✅ Hỗ trợ đa ngôn ngữ (Tiếng Việt/English)
- ✅ Google Maps tích hợp hiển thị vị trí showroom

## Cách sử dụng

### 1. Thêm bài viết mới

1. Tạo file `.md` mới trong thư mục `posts/`
2. Viết nội dung bằng Markdown
3. Thêm thông tin bài viết vào mảng `posts` trong file `js/main.js`:

```javascript
{
    id: 'ten-bai-viet',
    title: 'Tiêu đề bài viết',
    date: '2024-01-20',
    description: 'Mô tả ngắn về bài viết',
    file: 'posts/ten-bai-viet.md'
}
```

### 2. Chạy blog

Mở file `index.html` trong trình duyệt. Nếu gặp lỗi CORS khi load file Markdown, bạn có thể:

- Sử dụng local server (khuyến nghị):
  ```bash
  # Với Python
  python -m http.server 8000
  
  # Với Node.js (http-server)
  npx http-server
  
  # Với PHP
  php -S localhost:8000
  ```

- Hoặc sử dụng extension Live Server trong VS Code

### 3. Tùy chỉnh

- **CSS**: Chỉnh sửa file `css/style.css`
- **Cấu hình**: Chỉnh sửa file `js/main.js`
- **SEO**: Cập nhật meta tags trong `index.html`

## Thư viện và dịch vụ sử dụng

- **Pico.css**: https://picocss.com/ - CSS framework nhẹ và hiện đại
- **Marked.js**: https://marked.js.org/ - Thư viện render Markdown sang HTML
- **Font Awesome**: https://fontawesome.com/ - Icon library cho UI
- **Google Maps Embed API**: Hiển thị bản đồ tương tác cho vị trí showroom

## Lưu ý

- Blog này là static, không có backend
- Tất cả bài viết được lưu dưới dạng file `.md`
- Cần local server để tránh lỗi CORS khi load file Markdown
- Có thể deploy lên GitHub Pages, Netlify, Vercel, etc.

## License

MIT License

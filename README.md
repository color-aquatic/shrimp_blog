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

## Build production

### Cài dependencies

```bash
npm install
```

### Tạo bản build tối ưu

```bash
npm run build
```

Kết quả nằm trong thư mục `dist/` với các cải tiến:
- Minify HTML/CSS/JS
- Giữ nguyên cấu trúc markdown (`posts/`, `collection/`) để route hiện tại không đổi

## Local development không cần build

Nếu bạn chỉ cần chỉnh giao diện, JS, CSS hoặc nội dung Markdown tại local, dùng:

```bash
npm run dev
```

Server này phục vụ trực tiếp từ source root, không dùng `dist/`, nên bạn không phải chạy lại `npm run build` sau mỗi lần sửa.
Nó cũng tự động reload trình duyệt khi bạn thay đổi file HTML, CSS, JS, Markdown hoặc ảnh trong project.

Mở tại:

```text
http://localhost:3000/
```

Lưu ý:
- Chế độ này dùng URL dạng query string như `?lang=vi&post=tep-mau` cho local dev.
- Nếu bạn cần test đúng output production và URL đẹp `/vi/...`, vẫn dùng `npm run build` rồi `npm run serve`.

### Tối ưu ảnh

```bash
npm run optimize:images
```

Lệnh này tạo ảnh `.webp` và `.avif` trong `images/optimized/` để dùng khi deploy production.

## Deploy lên GitHub Pages

Project này là static site nên deploy GitHub Pages rất phù hợp và không cần Docker.

### 1. Tạo workflow deploy tự động

Đã có sẵn file workflow tại `.github/workflows/deploy-pages.yml`.
Mỗi lần push lên branch `main`, GitHub Actions sẽ:

- Cài dependencies (`npm ci`)
- Build project (`npm run build`)
- Deploy thư mục `dist/` lên GitHub Pages

### 2. Bật GitHub Pages trong repository

1. Vào repository trên GitHub
2. Vào **Settings** -> **Pages**
3. Ở mục **Build and deployment**, chọn **Source = GitHub Actions**

### 3. Push code để deploy

```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

Sau khi workflow chạy xong, site sẽ có URL dạng:

```text
https://<github-username>.github.io/<repo-name>/
```

### 4. Lưu ý quan trọng

- Đã chuyển favicon sang đường dẫn tương đối (`favicon.ico`) để tương thích khi deploy dưới repo path
- Nếu bạn dùng custom domain, cấu hình thêm file `CNAME` trong thư mục `dist/` hoặc workflow tùy nhu cầu

## Deploy lên AWS (S3 + CloudFront)

### 1. Build

```bash
npm run build
```

### 2. Deploy

```powershell
npm run deploy:aws -- -BucketName your-bucket-name -DistributionId E1234567890ABC -Region ap-southeast-1
```

Script deploy sẽ áp dụng cache headers:
- `index.html`: `no-cache, no-store, must-revalidate`
- `js/`, `css/`: `public, max-age=31536000, immutable`
- `images/`: `public, max-age=2592000`
- `posts/`, `collection/`: `public, max-age=300`

Có sẵn mẫu security headers policy tại `aws/cloudfront-response-headers-policy.json`.
Bạn có thể tạo policy bằng AWS CLI:

```bash
aws cloudfront create-response-headers-policy --response-headers-policy-config file://aws/cloudfront-response-headers-policy.json
```

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
- Khi deploy AWS, khuyến nghị dùng S3 private bucket + CloudFront OAC + ACM + Route53

## License

MIT License

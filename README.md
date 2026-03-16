# Tầm Quan Trọng Của Việc Cầu Nguyện - Báo Cáo Nghiên Cứu Chuyên Sâu

Một ứng dụng web được xây dựng với Next.js nhằm trình bày báo cáo nghiên cứu thần học chuyên sâu về tầm quan trọng của việc cầu nguyện trong đời sống đức tin Công giáo. Dự án kết hợp thẩm mỹ học thuật cổ điển với trải nghiệm người dùng hiện đại, tối ưu hóa cho cả việc nghiên cứu trên máy tính và đọc trên thiết bị di động.

## 🌟 Tính năng nổi bật

### 1. Trải nghiệm Đọc học thuật Cao cấp
- **Thiết kế Serif Cổ điển**: Sử dụng hệ phông chữ Lora và Fraunces mang đậm nét hàn lâm.
- **Drop Cap (Chữ hoa đầu đoạn)**: Tạo điểm nhấn nghệ thuật cho các phần quan trọng.
- **Chế độ Tập trung (Focus Mode)**: Loại bỏ các thành phần gây xao nhãng để người dùng chú tâm hoàn toàn vào nội dung bài viết.
- **Tiến trình Đọc**: Thanh tiến trình nằm trên cùng giúp người dùng xác định lượng nội dung đã đọc.

### 2. Tối ưu hóa Điều hướng (Responsive & Mobile-First)
- **Sticky Table of Contents**: Mục lục tự động bám dính bên trái trên giao diện desktop, giúp di chuyển nhanh giữa các chương.
- **Floating Mobile Controls**: Hệ thống phím điều khiển nổi ở góc dưới bên phải dành riêng cho di động, bao gồm:
    - Mục lục dạng Slide-over.
    - Kích hoạt nhanh thanh Tìm kiếm.
    - Chuyển đổi nhanh Chế độ Tập trung.
- **Tìm kiếm Nội dung**: Tích hợp công cụ tìm kiếm với khả năng highlight (tô màu) từ khóa ngay trong văn bản.

### 3. Công nghệ & Hiệu năng
- **Next.js 15 (App Router)**: Đảm bảo tốc độ tải trang cực nhanh và tối ưu SEO.
- **Tailwind CSS v4**: Sử dụng các tính năng mới nhất để tùy biến giao diện linh hoạt.
- **Framer Motion**: Các hiệu ứng Fade-in và chuyển động mượt mà khi cuộn trang.
- **Responsive Fluid Typography**: Sử dụng `clamp()` để phông chữ tự động co giãn tối ưu theo mọi kích thước màn hình.

## 🛠 Công nghệ sử dụng

- **Framework**: [Next.js](https://nextjs.org/)
- **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Fonts**: Google Fonts (Fraunces, Lora, Inter)

## 📁 Cấu trúc thư mục

```text
├── app/
│   ├── globals.css         # Cấu hình phong cách và biến giao diện (Tailwind v4)
│   ├── layout.tsx          # Cấu trúc gốc và cấu hình SEO
│   └── page.tsx            # Trang nội dung chính của báo cáo
├── components/
│   ├── TableOfContents.tsx # Mục lục thông minh
│   ├── FloatingControls.tsx # Phím điều khiển nổi cho mobile
│   ├── ArticleControls.tsx  # Thanh công cụ tìm kiếm và chế độ tập trung
│   ├── ReadingProgress.tsx  # Thanh tiến trình đọc
│   ├── ShareButtons.tsx     # Công cụ chia sẻ mạng xã hội
│   └── Citation.tsx         # Hệ thống trích dẫn học thuật
├── data/
│   └── content.json        # Dữ liệu nội dung nghiên cứu (Theology Report)
└── public/                 # Hình ảnh minh họa và tài nguyên tĩnh
```

## 🚀 Hướng dẫn chạy dự án

1. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

2. **Chạy ở chế độ phát triển (Development)**:
   ```bash
   npm run dev
   ```
   Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem kết quả.

3. **Xây dựng cho sản xuất (Production Build)**:
   ```bash
   npm run build
   npm start
   ```

## 📄 Nội dung Báo cáo

Báo cáo tập trung vào các chủ đề chính:
- Bản thể luận về cầu nguyện.
- Định hướng cứu cánh và sự kết hợp cùng Thiên Chúa.
- Lịch sử cứu độ qua các mô thể cầu nguyện.
- Chúa Giêsu Kitô là đỉnh cao của tâm nguyện.
- Các hình thái cầu nguyện trong truyền thống Công giáo.

---
© 2026 Báo Cáo Chuyên Sâu Về Tầm Quan Trọng Của Cầu Nguyện

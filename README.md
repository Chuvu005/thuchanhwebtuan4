# Bài tập Tuần 4: LTWNC - Quản lý State "Sản phẩm yêu thích" với Zustand Store

> **Môn học:** Lập trình Web Nâng Cao (LTWNC)  
> **Mã học phần:** RIPT1411-20261-01  
> **Chủ đề:** State Management trong React — Zustand Store & Advanced Context

---

## 📌 1. Yêu cầu bài tập

1. **Xây dựng tính năng "Sản phẩm yêu thích":** Thêm / bỏ một sản phẩm khỏi danh sách yêu thích (Favorites).
2. **Cài đặt State Management:** Lựa chọn **Zustand store riêng (`favoritesStore`)** *(kèm theo cả bản đối chứng Context nâng cao `FavoritesContext` + `useReducer` + `useMemo`)*.
3. **Đoạn nhận xét ngắn (5–7 dòng):** So sánh ưu/nhược điểm của Zustand so với nếu dùng Redux Toolkit.

---

## 📝 2. Đoạn nhận xét so sánh Zustand vs. Redux Toolkit (5–7 dòng nộp bài)

> **1. Cấu hình & Boilerplate:** Zustand khởi tạo cực kỳ tinh gọn, không cần cấu hình lồng nhiều lớp Provider, không cần định nghĩa action types hay file reducer tách rời như Redux Toolkit (RTK).  
> **2. Kích thước gói (Bundle Size):** Zustand siêu nhẹ (~1KB) so với RTK (~11KB kèm dependencies), tối ưu tốc độ tải và tiết kiệm tài nguyên ứng dụng web.  
> **3. Tối ưu Hiệu năng Render:** Zustand hỗ trợ atomic selectors chọn lọc state chính xác, chỉ re-render component khi dữ liệu đăng ký thực sự thay đổi mà không cần `useMemo`/`useCallback` thủ công.  
> **4. Đường cong học tập:** Zustand dùng cú pháp hook thuần túy rất tự nhiên với lập trình viên React, dễ tiếp cận hơn luồng Dispatch -> Action -> Reducer của Redux.  
> **5. Khi nào nên dùng RTK:** Redux Toolkit vẫn chiếm ưu thế trong các dự án quy mô doanh nghiệp lớn nhờ RTK Query mạnh mẽ và kiến trúc phân lớp chuẩn mực khắt khe.

---

## 🚀 3. Hướng dẫn chạy dự án

### Cài đặt thư viện:
```bash
npm install
```

### Khởi chạy máy chủ phát triển (Development):
```bash
npm run dev
```
Truy cập ứng dụng tại: [http://localhost:5173/](http://localhost:5173/)

### Kiểm tra Build Production:
```bash
npm run build
```

---

## 🛠️ 4. Kiến trúc mã nguồn

```
laptrinhweb/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Thanh điều hướng, đếm yêu thích, chuyển đổi State Engine
│   │   ├── Banner.jsx           # Hero banner thông tin môn học, mã lớp, thống kê
│   │   ├── ProductCard.jsx      # Thẻ sản phẩm, nút tim tương tác, hiệu ứng pháo hoa
│   │   ├── ProductList.jsx      # Lọc theo danh mục, tìm kiếm trực tiếp, sắp xếp giá/đánh giá
│   │   ├── FavoritesDrawer.jsx  # Bảng trượt danh sách yêu thích, tổng tiền, xóa tất cả
│   │   ├── ComparisonModal.jsx  # Bảng so sánh 5-7 dòng, bảng tiêu chí chi tiết, code mẫu
│   │   └── Toast.jsx            # Thông báo nổi (Toast notifications)
│   ├── store/
│   │   └── favoritesStore.js    # Zustand store với persist middleware (localStorage)
│   ├── context/
│   │   ├── FavoritesContext.jsx # Context nâng cao (useReducer + useMemo mini-Redux)
│   │   └── EngineContext.jsx    # Bộ chuyển đổi linh hoạt giữa Zustand và Context
│   ├── data/
│   │   └── products.js          # Dữ liệu sản phẩm công nghệ thực tế
│   ├── hooks/
│   │   └── useFavorites.js      # Unified hook thích ứng theo Engine
│   ├── index.css                # Hệ thống CSS hiện đại (Glassmorphism, Dark/Light mode)
│   ├── App.jsx                  # Root App component
│   └── main.jsx                 # Entry point
├── index.html                   # HTML với Google Fonts và SEO tag
└── package.json
```

---

## ✨ 5. Các tính năng nổi bật đã hoàn thiện

- [x] **Thêm / Bỏ yêu thích:** Nhấn icon trái tim trên card hoặc trong Drawer để thêm/xóa.
- [x] **Hiệu ứng trực quan:** Tim nảy phóng to (pop animation), hiệu ứng pháo hoa (confetti) khi thả tim, badge nhảy số trên header.
- [x] **Lưu trữ bền vững:** Tự động đồng bộ với `localStorage` qua middleware `persist` của Zustand.
- [x] **Side Drawer thông minh:** Hiển thị danh sách sản phẩm yêu thích, tổng số lượng, tổng giá trị bằng VNĐ, xóa từng món hoặc xóa tất cả.
- [x] **Chuyển đổi Engine linh hoạt:** Cho phép chuyển đổi thời gian thực giữa **Zustand Store** và **Context nâng cao** trên giao diện để so sánh hiệu năng.
- [x] **Hộp thoại so sánh chuẩn mực:** Tích hợp nút xem trực tiếp đoạn nhận xét 5-7 dòng và bảng so sánh chi tiết giữa Zustand và Redux Toolkit.

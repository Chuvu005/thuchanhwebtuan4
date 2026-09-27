import { useState } from 'react';
import { X, Check, Copy, BookOpen, Code2, Scale } from 'lucide-react';

export function ComparisonModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  if (!isOpen) return null;

  const comparisonParagraph = `1. Cấu hình & Boilerplate: Zustand khởi tạo cực kỳ tinh gọn, không cần cấu hình lồng nhiều lớp Provider, không cần định nghĩa action types hay file reducer tách rời như Redux Toolkit (RTK).
2. Kích thước gói (Bundle Size): Zustand siêu nhẹ (~1KB) so với RTK (~11KB kèm dependencies), tối ưu tốc độ tải và tiết kiệm tài nguyên ứng dụng.
3. Tối ưu Hiệu năng Render: Zustand hỗ trợ atomic selectors chọn lọc state chính xác, chỉ re-render component khi dữ liệu đăng ký thực sự thay đổi mà không cần useMemo/useCallback thủ công.
4. Đường cong học tập: Zustand dùng cú pháp hook thuần túy rất tự nhiên với lập trình viên React, dễ tiếp cận hơn luồng Dispatch -> Action -> Reducer của Redux.
5. Khi nào nên dùng RTK: Redux Toolkit vẫn chiếm ưu thế trong các dự án quy mô doanh nghiệp lớn nhờ RTK Query mạnh mẽ và kiến trúc phân lớp chuẩn mực khắt khe.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(comparisonParagraph);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(99, 102, 241, 0.2)',
                color: 'var(--brand-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Scale size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Nhận xét & So sánh LTWNC Tuần 4
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Zustand Store vs. Redux Toolkit (RIPT1411-20261-01)
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn-close-drawer"
            onClick={onClose}
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '0 24px',
            gap: '16px',
            background: 'var(--badge-bg)',
          }}
        >
          <button
            type="button"
            style={{
              padding: '12px 4px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'summary' ? '2px solid var(--brand-primary)' : '2px solid transparent',
              color: activeTab === 'summary' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onClick={() => setActiveTab('summary')}
          >
            <BookOpen size={15} />
            <span>Đoạn nhận xét (5-7 dòng theo đề bài)</span>
          </button>

          <button
            type="button"
            style={{
              padding: '12px 4px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'table' ? '2px solid var(--brand-primary)' : '2px solid transparent',
              color: activeTab === 'table' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onClick={() => setActiveTab('table')}
          >
            <Scale size={15} />
            <span>Bảng so sánh chi tiết</span>
          </button>

          <button
            type="button"
            style={{
              padding: '12px 4px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'code' ? '2px solid var(--brand-primary)' : '2px solid transparent',
              color: activeTab === 'code' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onClick={() => setActiveTab('code')}
          >
            <Code2 size={15} />
            <span>So sánh Mã nguồn</span>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {activeTab === 'summary' && (
            <div>
              <div className="comparison-highlight-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div className="comparison-highlight-title">
                    <span>Đoạn nhận xét nộp bài (5 dòng cô đọng chuẩn mực)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                      background: 'var(--badge-bg)',
                      border: '1px solid var(--border-subtle)',
                      color: copied ? 'var(--success)' : 'var(--text-primary)',
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copied ? 'Đã sao chép!' : 'Sao chép đoạn này'}</span>
                  </button>
                </div>

                <ul className="comparison-list">
                  <li className="comparison-item">
                    <strong>1. Cấu hình & Boilerplate:</strong> Zustand khởi tạo cực kỳ tinh gọn, không cần cấu hình lồng nhiều lớp Provider, không cần định nghĩa action types hay file reducer tách rời như Redux Toolkit (RTK).
                  </li>
                  <li className="comparison-item">
                    <strong>2. Kích thước gói (Bundle Size):</strong> Zustand siêu nhẹ (~1KB) so với RTK (~11KB kèm dependencies), tối ưu tốc độ tải và tiết kiệm tài nguyên ứng dụng.
                  </li>
                  <li className="comparison-item">
                    <strong>3. Tối ưu Hiệu năng Render:</strong> Zustand hỗ trợ atomic selectors chọn lọc state chính xác, chỉ re-render component khi dữ liệu đăng ký thực sự thay đổi mà không cần useMemo/useCallback thủ công.
                  </li>
                  <li className="comparison-item">
                    <strong>4. Đường cong học tập:</strong> Zustand dùng cú pháp hook thuần túy rất tự nhiên với lập trình viên React, dễ tiếp cận hơn luồng Dispatch -&gt; Action -&gt; Reducer của Redux.
                  </li>
                  <li className="comparison-item">
                    <strong>5. Khi nào nên dùng RTK:</strong> Redux Toolkit vẫn chiếm ưu thế trong các dự án quy mô doanh nghiệp lớn nhờ RTK Query mạnh mẽ và kiến trúc phân lớp chuẩn mực khắt khe.
                  </li>
                </ul>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                💡 <em>Kết luận:</em> Với tính năng quản lý danh sách yêu thích (Favorites) của một cửa hàng thương mại điện tử, <strong>Zustand là giải pháp tối ưu vượt trội</strong> về độ đơn giản, hiệu năng và thời gian hoàn thành so với việc phải dựng toàn bộ hệ thống Redux Toolkit cồng kềnh.
              </p>
            </div>
          )}

          {activeTab === 'table' && (
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Tiêu chí</th>
                    <th style={{ color: 'var(--brand-primary-light)' }}>Zustand (Lựa chọn)</th>
                    <th>Redux Toolkit (RTK)</th>
                    <th>Context API + useReducer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Cấu hình ban đầu</strong></td>
                    <td>Rất nhanh: 1 hàm <code>create()</code></td>
                    <td>Nhiều bước: <code>configureStore</code>, <code>createSlice</code>, <code>&lt;Provider&gt;</code></td>
                    <td>Vừa phải: Context, Provider, Reducer</td>
                  </tr>
                  <tr>
                    <td><strong>Dung lượng gói</strong></td>
                    <td>~1.1 KB (Siêu nhẹ)</td>
                    <td>~11 KB + Immer + Reselect</td>
                    <td>0 KB (Có sẵn trong React)</td>
                  </tr>
                  <tr>
                    <td><strong>Tối ưu Re-render</strong></td>
                    <td>Tự động qua Selector hook</td>
                    <td>Cần selector hook (useSelector + shallowEqual)</td>
                    <td>Dễ re-render thừa nếu không bọc kỹ useMemo</td>
                  </tr>
                  <tr>
                    <td><strong>Sử dụng ngoài React</strong></td>
                    <td>Có (Gọi trực tiếp qua <code>store.getState()</code>)</td>
                    <td>Có (qua store instance)</td>
                    <td>Không (Bắt buộc nằm trong component tree)</td>
                  </tr>
                  <tr>
                    <td><strong>Middleware / Persist</strong></td>
                    <td>Tích hợp sẵn middleware <code>persist</code> 1 dòng</td>
                    <td>Cần thư viện <code>redux-persist</code> bên ngoài</td>
                    <td>Tự code hiệu ứng phụ trong <code>useEffect</code></td>
                  </tr>
                  <tr>
                    <td><strong>Phù hợp nhất cho</strong></td>
                    <td>Ứng dụng vừa và nhỏ, tính năng module (Cart, Favs)</td>
                    <td>Dự án Enterprise, đội ngũ lớn, cần RTK Query</td>
                    <td>Global theme, auth state đơn giản</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'code' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--brand-primary-light)' }}>
                  Cách 1: Zustand Store (Chỉ 1 file duy nhất)
                </h4>
                <pre
                  style={{
                    background: 'var(--badge-bg)',
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    overflowX: 'auto',
                    border: '1px solid var(--border-subtle)',
                    lineHeight: 1.4,
                  }}
                >
{`import { create } from 'zustand';

export const useFavoritesStore = create((set, get) => ({
  favorites: [],
  toggleFavorite: (product) => {
    const list = get().favorites;
    const exists = list.some(item => item.id === product.id);
    set({
      favorites: exists 
        ? list.filter(item => item.id !== product.id)
        : [product, ...list]
    });
  }
}));

// Sử dụng trong Component:
const { favorites, toggleFavorite } = useFavoritesStore();`}
                </pre>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  Cách 2: Redux Toolkit (Cần nhiều file, Slice, Store, Provider)
                </h4>
                <pre
                  style={{
                    background: 'var(--badge-bg)',
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    overflowX: 'auto',
                    border: '1px solid var(--border-subtle)',
                    lineHeight: 1.4,
                  }}
                >
{`// 1. favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {
    toggleFavorite: (state, action) => { ... }
  }
});
// 2. store.js: configureStore({ reducer: { favorites: favoritesSlice.reducer } })
// 3. index.jsx: <Provider store={store}><App /></Provider>
// 4. Component: const dispatch = useDispatch(); useSelector(state => state.favorites.items);`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

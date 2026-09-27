import { useState } from 'react';
import { EngineProvider } from './context/EngineContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { ProductList } from './components/ProductList';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ComparisonModal } from './components/ComparisonModal';
import { Toast } from './components/Toast';
import { initialProducts } from './data/products';
import { CheckCircle2 } from 'lucide-react';

function MainApp() {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'add') => {
    const id = Date.now() + Math.random().toString();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <Header
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Hero Assignment Banner */}
      <main style={{ flex: 1 }}>
        <Banner totalCatalogItems={initialProducts.length} />

        {/* Product Catalog Grid */}
        <ProductList products={initialProducts} onToast={addToast} />
      </main>

      {/* Side Drawer: Danh sách yêu thích */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onToast={addToast}
      />

      {/* Modal: Nhận xét so sánh Zustand vs Redux Toolkit (5-7 dòng) */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

      {/* Floating Notifications */}
      <Toast toasts={toasts} />

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          padding: '36px 0 24px',
          marginTop: 'auto',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '4px' }}>
                LTWNC - Lập trình Web Nâng Cao
              </div>
              <p>Mã lớp học phần: <strong>RIPT1411-20261-01</strong> • Tuần 4: Quản lý trạng thái với Zustand</p>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--success)" />
                Zustand Store v5
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--brand-primary-light)" />
                Context + useReducer
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--heart-red)" />
                LocalStorage Persist
              </span>
            </div>
          </div>

          <div
            style={{
              paddingTop: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
            }}
          >
            <div>© 2026 TechVibe Store • Thiết kế chuẩn UI/UX hiện đại với Vanilla CSS</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span>React 19</span>
              <span>•</span>
              <span>Vite 8</span>
              <span>•</span>
              <span>Zustand</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <EngineProvider>
      <FavoritesProvider>
        <MainApp />
      </FavoritesProvider>
    </EngineProvider>
  );
}

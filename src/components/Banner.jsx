import { Heart, Zap, ShieldCheck, Layers, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

export function Banner({ totalCatalogItems }) {
  const { count, totalValue, engine } = useFavorites();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-card">
          <div className="hero-glow-blob" />
          
          <h1 className="hero-title">
            Tính năng Sản phẩm yêu thích <span style={{ color: 'var(--heart-red)' }}>❤️</span>
          </h1>
          <p className="hero-subtitle">
            Hệ thống quản lý State hiện đại áp dụng Zustand Store riêng biệt (hoặc Context nâng cao với useReducer & useMemo). Hỗ trợ thêm/bớt tức thì, lưu trữ cục bộ và tối ưu hiệu năng re-render.
          </p>

          <div className="hero-meta-row">
            <div className="meta-chip highlight">
              <Zap size={14} />
              <span>Engine: {engine === 'zustand' ? 'Zustand Store riêng (favoritesStore)' : 'Context nâng cao (useReducer + useMemo)'}</span>
            </div>

            <div className="meta-chip">
              <ShoppingBag size={14} />
              <span>Sản phẩm trong kho: <strong>{totalCatalogItems}</strong></span>
            </div>

            <div className="meta-chip">
              <Heart size={14} style={{ color: 'var(--heart-red)' }} />
              <span>Đang yêu thích: <strong>{count}</strong></span>
            </div>

            {count > 0 && (
              <div className="meta-chip" style={{ borderColor: 'rgba(56, 189, 248, 0.4)', color: 'var(--price-color)' }}>
                <Layers size={14} />
                <span>Giá trị yêu thích: <strong>{formatCurrency(totalValue)}</strong></span>
              </div>
            )}

            <div className="meta-chip">
              <ShieldCheck size={14} />
              <span>Persist LocalStorage: Tự động</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

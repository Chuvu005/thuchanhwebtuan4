import { Heart, X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

export function FavoritesDrawer({ isOpen, onClose, onToast }) {
  const { favorites, removeFavorite, clearFavorites, count, totalValue, engine } = useFavorites();

  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleRemove = (product) => {
    removeFavorite(product.id);
    onToast(`Đã xóa "${product.name}" khỏi danh sách yêu thích`, 'remove');
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách yêu thích không?')) {
      clearFavorites();
      onToast('Đã dọn sạch toàn bộ danh sách yêu thích', 'clear');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="drawer-backdrop" onClick={onClose} />

      {/* Drawer */}
      <aside className="favorites-drawer" aria-label="Danh sách sản phẩm yêu thích">
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-area">
            <Heart size={22} className="fill-rose-500 text-rose-500" style={{ color: 'var(--heart-red)' }} />
            <h2 className="drawer-title">
              Sản phẩm yêu thích
              <span className="favorite-badge">{count}</span>
            </h2>
          </div>

          <button
            type="button"
            className="btn-close-drawer"
            onClick={onClose}
            aria-label="Đóng bảng yêu thích"
          >
            <X size={18} />
          </button>
        </div>

        {/* Engine status indicator */}
        <div
          style={{
            padding: '8px 24px',
            background: 'var(--badge-bg)',
            borderBottom: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Quản lý bởi: <strong>{engine === 'zustand' ? 'Zustand Store (favoritesStore)' : 'Context nâng cao'}</strong></span>
          <span style={{ color: 'var(--success)', fontWeight: 600 }}>● Đã đồng bộ</span>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {favorites.length === 0 ? (
            <div className="drawer-empty">
              <div className="empty-heart-icon">
                <Heart size={36} />
              </div>
              <h3 className="empty-title">Chưa có sản phẩm yêu thích</h3>
              <p className="empty-desc">
                Nhấn vào biểu tượng trái tim trên bất kỳ sản phẩm nào để lưu lại danh sách quan tâm của bạn.
              </p>
              <button
                type="button"
                className="btn-discover"
                onClick={onClose}
              >
                Khám phá sản phẩm ngay
              </button>
            </div>
          ) : (
            favorites.map((item) => (
              <div key={item.id} className="favorite-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="fav-item-thumb"
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/${item.id}/200/200`;
                  }}
                />

                <div className="fav-item-info">
                  <div className="fav-item-cat">{item.category}</div>
                  <h4 className="fav-item-name" title={item.name}>
                    {item.name}
                  </h4>
                  <div className="fav-item-price">{formatCurrency(item.price)}</div>
                </div>

                <button
                  type="button"
                  className="btn-remove-fav"
                  onClick={() => handleRemove(item)}
                  title="Xóa khỏi yêu thích"
                  aria-label={`Xóa ${item.name} khỏi yêu thích`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favorites.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-summary-row">
              <span>Số lượng món đồ:</span>
              <strong>{count} sản phẩm</strong>
            </div>

            <div className="drawer-summary-row total">
              <span>Tổng giá trị ước tính:</span>
              <span style={{ color: 'var(--price-color)' }}>{formatCurrency(totalValue)}</span>
            </div>

            <div className="drawer-actions-row">
              <button
                type="button"
                className="btn-clear-all"
                onClick={handleClearAll}
              >
                <Trash2 size={15} />
                <span>Xóa tất cả</span>
              </button>

              <button
                type="button"
                className="btn-checkout"
                onClick={() => {
                  alert(`Đã chuyển ${count} sản phẩm yêu thích sang giỏ hàng!`);
                  onClose();
                }}
              >
                <span>Chuyển vào giỏ</span>
                <ArrowRight size={15} style={{ display: 'inline', marginLeft: '6px' }} />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

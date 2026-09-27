import { useState } from 'react';
import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFavorites } from '../hooks/useFavorites';

export function ProductCard({ product, onToast }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(product.id);
  const [animating, setAnimating] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setAnimating(true);

    const added = toggleFavorite(product);

    if (added) {
      // Confetti burst effect
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { x, y },
          colors: ['#f43f5e', '#ec4899', '#a855f7', '#6366f1'],
          ticks: 200,
        });
      } catch (err) {
        // Fallback if canvas is unavailable
      }

      onToast(`Đã thêm "${product.name}" vào danh sách yêu thích ❤️`, 'add');
    } else {
      onToast(`Đã xóa "${product.name}" khỏi danh sách yêu thích`, 'remove');
    }

    setTimeout(() => setAnimating(false), 400);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <article className="product-card" id={`product-${product.id}`}>
      {/* Image & Badges */}
      <div className="card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            // High-reliability tech placeholder fallback if network blocks Unsplash
            e.currentTarget.src = `https://picsum.photos/seed/${product.id}/600/400`;
          }}
        />

        {product.badge && <span className="card-badge">{product.badge}</span>}

        {/* Nút Trái Tim Yêu Thích Nổi Bật */}
        <button
          type="button"
          className={`card-heart-btn ${active ? 'is-active' : ''} ${animating ? 'animate-pop' : ''}`}
          onClick={handleToggle}
          title={active ? 'Bỏ thích sản phẩm này' : 'Thêm vào danh sách yêu thích'}
          aria-label={active ? 'Bỏ thích sản phẩm' : 'Thêm vào yêu thích'}
        >
          <Heart
            size={20}
            className={active ? 'fill-rose-500 text-rose-500' : ''}
            style={{
              fill: active ? 'var(--heart-red)' : 'none',
              stroke: active ? 'var(--heart-red)' : 'currentColor',
            }}
          />
        </button>
      </div>

      {/* Content */}
      <div className="card-content">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title" title={product.name}>
          {product.name}
        </h3>
        <p className="card-description">{product.description}</p>

        {/* Rating */}
        <div className="card-rating-row">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span><strong>{product.rating}</strong> ({product.reviewCount} đánh giá)</span>
        </div>

        {/* Footer with Price & Quick Action */}
        <div className="card-footer">
          <div className="price-block">
            <span className="price-current">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="price-original">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>

          <button
            type="button"
            className="btn-card-action"
            onClick={handleToggle}
            style={
              active
                ? {
                    background: 'var(--heart-bg)',
                    color: 'var(--heart-red)',
                    borderColor: 'rgba(244, 63, 94, 0.4)',
                  }
                : {}
            }
          >
            {active ? (
              <>
                <Check size={14} />
                <span>Đã thích</span>
              </>
            ) : (
              <>
                <Heart size={14} />
                <span>Yêu thích</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

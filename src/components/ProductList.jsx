import { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { categories } from '../data/products';

export function ProductList({ products, onToast }) {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        const matchesCategory =
          selectedCategory === 'Tất cả' || prod.category === selectedCategory;
        const matchesSearch =
          prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('Tất cả');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <section className="container">
      {/* Thanh lọc & tìm kiếm */}
      <div className="filter-bar">
        {/* Category Tabs */}
        <div className="category-tabs" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="search-sort-group">
          {/* Ô tìm kiếm */}
          <div className="search-input-wrapper">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm sản phẩm theo tên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchQuery('')}
                title="Xóa tìm kiếm"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sắp xếp */}
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sắp xếp sản phẩm"
          >
            <option value="default">Mới nhất</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="rating-desc">Đánh giá cao nhất</option>
            <option value="name-asc">Tên A - Z</option>
          </select>
        </div>
      </div>

      {/* Hiển thị số lượng kết quả */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Hiển thị <strong>{filteredProducts.length}</strong> trên tổng số <strong>{products.length}</strong> sản phẩm
          {selectedCategory !== 'Tất cả' && ` trong danh mục "${selectedCategory}"`}
          {searchQuery && ` cho từ khóa "${searchQuery}"`}
        </p>

        {(selectedCategory !== 'Tất cả' || searchQuery || sortBy !== 'default') && (
          <button
            type="button"
            onClick={handleResetFilters}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--brand-primary-light)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <RefreshCw size={13} />
            <span>Đặt lại bộ lọc</span>
          </button>
        )}
      </div>

      {/* Danh sách Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} onToast={onToast} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '60px',
          }}
        >
          <SlidersHorizontal size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Không tìm thấy sản phẩm phù hợp</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Vui lòng thử từ khóa khác hoặc xóa bộ lọc danh mục hiện tại.
          </p>
          <button
            type="button"
            className="btn-discover"
            onClick={handleResetFilters}
          >
            Xem toàn bộ sản phẩm
          </button>
        </div>
      )}
    </section>
  );
}

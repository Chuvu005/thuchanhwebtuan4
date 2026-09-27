import { useState, useEffect } from 'react';
import { Heart, Sparkles, BookOpen, Sun, Moon, Cpu } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useEngine } from '../context/EngineContext';

export function Header({ onOpenFavorites, onOpenComparison }) {
  const { count, engine } = useFavorites();
  const { setEngine } = useEngine();
  const [theme, setTheme] = useState('dark');
  const [isBumping, setIsBumping] = useState(false);

  // Trigger bounce animation when favorite count changes
  useEffect(() => {
    if (count > 0) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Brand / Logo */}
        <div className="logo-area">
          <div className="logo-icon">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="logo-text">TechVibe Store</div>
            <div className="course-tag">LTWNC • RIPT1411-20261-01</div>
          </div>
        </div>

        {/* State Engine Toggle & Comparison Trigger */}
        <div className="header-actions">
          {/* Switch State Engine */}
          <div className="engine-toggle-box" title="Chọn phương thức quản lý State theo đề bài">
            <button
              type="button"
              className={`engine-btn ${engine === 'zustand' ? 'active' : ''}`}
              onClick={() => setEngine('zustand')}
            >
              <Cpu size={14} />
              <span>Zustand Store</span>
            </button>
            <button
              type="button"
              className={`engine-btn ${engine === 'context' ? 'active' : ''}`}
              onClick={() => setEngine('context')}
            >
              <Sparkles size={14} />
              <span>Context nâng cao</span>
            </button>
          </div>

          {/* Button mở nhận xét so sánh RTK */}
          <button
            type="button"
            className="btn-comparison"
            onClick={onOpenComparison}
            title="Đọc nhận xét 5-7 dòng so sánh Zustand với Redux Toolkit"
          >
            <BookOpen size={15} />
            <span>So sánh Redux</span>
          </button>

          {/* Nút Danh sách yêu thích với Badge số lượng */}
          <button
            type="button"
            className={`btn-favorite-trigger ${isBumping ? 'animate-badge' : ''}`}
            onClick={onOpenFavorites}
            aria-label="Xem danh sách yêu thích"
          >
            <Heart size={18} className={count > 0 ? 'fill-rose-500 text-rose-500' : ''} />
            <span>Yêu thích</span>
            <span className={`favorite-badge ${isBumping ? 'animate-pop' : ''}`}>
              {count}
            </span>
          </button>

          {/* Nút đổi Theme Dark/Light */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title="Chuyển chế độ sáng/tối"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}

import { createContext, useContext, useReducer, useMemo, useEffect } from 'react';

// Khởi tạo Context
const FavoritesContext = createContext(null);

// Khởi tạo Action types
const ACTIONS = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  CLEAR_FAVORITES: 'CLEAR_FAVORITES',
  SET_INITIAL: 'SET_INITIAL',
};

// Reducer xử lý theo mô hình Mini-Redux
function favoritesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_INITIAL:
      return { ...state, favorites: action.payload };

    case ACTIONS.ADD_FAVORITE: {
      const exists = state.favorites.some((item) => item.id === action.payload.id);
      if (exists) return state;
      return {
        ...state,
        favorites: [action.payload, ...state.favorites],
      };
    }

    case ACTIONS.REMOVE_FAVORITE: {
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload),
      };
    }

    case ACTIONS.TOGGLE_FAVORITE: {
      const exists = state.favorites.some((item) => item.id === action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favorites],
      };
    }

    case ACTIONS.CLEAR_FAVORITES:
      return {
        ...state,
        favorites: [],
      };

    default:
      return state;
  }
}

const STORAGE_KEY = 'ltwnc-context-favorites';

export function FavoritesProvider({ children }) {
  // Đọc dữ liệu từ localStorage lúc ban đầu
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] }, (initial) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { favorites: JSON.parse(saved) } : initial;
    } catch {
      return initial;
    }
  });

  // Tự động đồng bộ vào localStorage khi favorites thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
    } catch (e) {
      console.error('Không thể lưu favorites vào localStorage', e);
    }
  }, [state.favorites]);

  // Các hàm thao tác (Actions)
  const addFavorite = (product) => {
    dispatch({ type: ACTIONS.ADD_FAVORITE, payload: product });
  };

  const removeFavorite = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: productId });
  };

  const toggleFavorite = (product) => {
    const isExisted = state.favorites.some((item) => item.id === product.id);
    dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: product });
    return !isExisted; // true nếu vừa thêm, false nếu vừa bỏ
  };

  const clearFavorites = () => {
    dispatch({ type: ACTIONS.CLEAR_FAVORITES });
  };

  const isFavorite = (productId) => {
    return state.favorites.some((item) => item.id === productId);
  };

  // Dùng useMemo tối ưu hóa render cho consumers, tránh tạo object mới khi state không đổi
  const contextValue = useMemo(() => {
    return {
      favorites: state.favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      clearFavorites,
      isFavorite,
      count: state.favorites.length,
      totalValue: state.favorites.reduce((sum, item) => sum + (item.price || 0), 0),
    };
  }, [state.favorites]);

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook để sử dụng FavoritesContext an toàn
export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext phải được dùng bên trong FavoritesProvider');
  }
  return context;
}

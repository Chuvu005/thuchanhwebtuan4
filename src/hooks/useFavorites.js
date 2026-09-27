import { useFavoritesStore } from '../store/favoritesStore';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useEngine } from '../context/EngineContext';

/**
 * Hook tổng hợp useFavorites:
 * Cho phép chuyển đổi linh hoạt giữa Zustand Store và Context nâng cao
 * theo tuỳ chọn của người dùng trong bài tập LTWNC Tuần 4.
 */
export function useFavorites() {
  const { engine } = useEngine();

  const zustandStore = useFavoritesStore();
  const contextStore = useFavoritesContext();

  if (engine === 'context') {
    return {
      favorites: contextStore.favorites,
      addFavorite: contextStore.addFavorite,
      removeFavorite: contextStore.removeFavorite,
      toggleFavorite: contextStore.toggleFavorite,
      clearFavorites: contextStore.clearFavorites,
      isFavorite: contextStore.isFavorite,
      count: contextStore.count,
      totalValue: contextStore.totalValue,
      engine: 'context',
    };
  }

  return {
    favorites: zustandStore.favorites,
    addFavorite: zustandStore.addFavorite,
    removeFavorite: zustandStore.removeFavorite,
    toggleFavorite: zustandStore.toggleFavorite,
    clearFavorites: zustandStore.clearFavorites,
    isFavorite: zustandStore.isFavorite,
    count: zustandStore.favorites.length,
    totalValue: zustandStore.getTotalValue(),
    engine: 'zustand',
  };
}

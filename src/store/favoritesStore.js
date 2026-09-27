import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Zustand Store: favoritesStore
 * Quản lý danh sách sản phẩm yêu thích (Favorites)
 * Sử dụng Zustand v5 kèm middleware persist để tự động lưu vào localStorage.
 */
export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      // State: Danh sách sản phẩm yêu thích
      favorites: [],

      // Action: Thêm sản phẩm vào danh sách yêu thích
      addFavorite: (product) => {
        const currentList = get().favorites;
        if (!currentList.some((item) => item.id === product.id)) {
          set({ favorites: [product, ...currentList] });
        }
      },

      // Action: Xóa 1 sản phẩm khỏi danh sách yêu thích theo ID
      removeFavorite: (productId) => {
        set({
          favorites: get().favorites.filter((item) => item.id !== productId),
        });
      },

      // Action: Thêm hoặc bỏ sản phẩm (Toggle)
      // Trả về true nếu vừa thêm, false nếu vừa bỏ
      toggleFavorite: (product) => {
        const currentList = get().favorites;
        const isExisted = currentList.some((item) => item.id === product.id);

        if (isExisted) {
          set({
            favorites: currentList.filter((item) => item.id !== product.id),
          });
          return false; // Đã bỏ khỏi yêu thích
        } else {
          set({
            favorites: [product, ...currentList],
          });
          return true; // Đã thêm vào yêu thích
        }
      },

      // Action: Xóa toàn bộ danh sách yêu thích
      clearFavorites: () => {
        set({ favorites: [] });
      },

      // Helper: Kiểm tra một sản phẩm có nằm trong danh sách yêu thích không
      isFavorite: (productId) => {
        return get().favorites.some((item) => item.id === productId);
      },

      // Computed selector: Tổng số lượng yêu thích
      getFavoriteCount: () => {
        return get().favorites.length;
      },

      // Computed selector: Tổng giá trị các món hàng yêu thích
      getTotalValue: () => {
        return get().favorites.reduce((sum, item) => sum + (item.price || 0), 0);
      },
    }),
    {
      name: 'ltwnc-zustand-favorites', // key trong localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

import { create } from 'zustand';

type WishlistProductProps = {
  id: string;
  productImg: string;
  productName: string;
  price: string;
  isFavorited: boolean;
};

type WishListState = {
  wishListItems: WishlistProductProps[];
  addItemToWishList: (item: WishlistProductProps) => void;
  removeItemFromWishList: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
};
export const useWishListStore = create<WishListState>((set) => ({
  wishListItems: [],

  // This is now your main "Heart Icon" handler
  addItemToWishList: (item: WishlistProductProps) => {
    set((state) => {
      const isAlreadyInWishList = state.wishListItems.some(
        (wishlistItem) => wishlistItem.id === item.id,
      );

      if (isAlreadyInWishList) {
        // TOGGLE OFF: If it's already there, remove it
        return {
          wishListItems: state.wishListItems.filter((i) => i.id !== item.id),
        };
      } else {
        // TOGGLE ON: If it's not there, add it and ensure it's marked favorited
        return {
          wishListItems: [
            ...state.wishListItems,
            { ...item, isFavorited: true },
          ],
        };
      }
    });
  },

  removeItemFromWishList: (productId: string) => {
    set((state) => ({
      wishListItems: state.wishListItems.filter(
        (item) => item.id !== productId,
      ),
    }));
  },

  // Note: We don't really need toggleFavorite anymore because
  // addItemToWishList handles the add/remove logic perfectly.
  toggleFavorite: (productId: string) => {
    set((state) => ({
      wishListItems: state.wishListItems.map((item) =>
        item.id === productId
          ? { ...item, isFavorited: !item.isFavorited }
          : item,
      ),
    }));
  },
}));

export default useWishListStore;

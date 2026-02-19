import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type cartItemsType = {
  id: string;
  productImg: string;
  productName: string;

  price: number;
  itemCount: number;
};

type CartState = {
  cartItems: cartItemsType[];
  addToCart: (item: cartItemsType) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (item) =>
        set((state) => {
          const alreadyInCart = state.cartItems.some(
            (cartItem) => cartItem.id === item.id,
          );
          if (alreadyInCart) return state;
          return { cartItems: [...state.cartItems, { ...item, itemCount: 1 }] };
        }),
      increaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, itemCount: item.itemCount + 1 } : item,
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? { ...item, itemCount: Math.max(1, item.itemCount - 1) }
              : item,
          ),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'shopping-cart-storage', // unique name for the storage key
      storage: createJSONStorage(() => AsyncStorage), // tell Zustand to use AsyncStorage
    },
  ),
);

import { create } from 'zustand';

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

const MockData = [
  {
    id: '0',
    imgUrl: 'url/0',
    productName: 'Leather Tote',
    variantName: 'Cream White',
    price: 120.0,
    itemCount: 0,
  },
  {
    id: '1',
    imgUrl: 'url/1',
    productName: 'Cotton Crew Tee',
    variantName: 'Premium White',
    price: 35.0,
    itemCount: 0,
  },
  {
    id: '2',
    imgUrl: 'url/2',
    productName: 'Ceramic Mug',
    variantName: 'Matte Black',
    price: 120.0,
    itemCount: 0,
  },
];

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const alreadyInCart = state.cartItems.some(
        (cartItem) => cartItem.id === item.id,
      );

      if (alreadyInCart) {
        return state;
      }

      return {
        cartItems: [...state.cartItems, item],
      };
    }),
  increaseQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.itemCount || 0) + 1 }
          : item,
      ),
    })),
  decreaseQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.itemCount || 0) - 1 }
          : item,
      ),
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

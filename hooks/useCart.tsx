import { create } from 'zustand';

type cartItemsType = {
  id: string;
  imgUrl: string;
  productName: string;
  variantName: string;
  price: number;
  itemCount: number;
};

type CartState = {
  cartItems: cartItemsType[];
  addToCart: (item: cartItemsType) => void;
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
    itemCount: 10,
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
  cartItems: MockData,
  addToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

import { create } from "zustand";
import { CartStoreStateType, CartStoreActionsType } from "@/types";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>(
  (set) => ({
    cart: [],
    addToCart: (product) =>
      set((state) => ({ cart: [...state.cart, product] })),
    removeFromCart: (product) =>
      set((state) => ({ cart: state.cart.filter((p) => p.id !== product.id) })),
    clearCart: () => set({ cart: [] }),
  })
);

export default useCartStore;

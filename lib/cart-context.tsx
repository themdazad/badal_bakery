"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";

export interface CartItem {
  cartId: string; // unique per add-to-cart action
  slug: string;
  name: string;
  emoji: string;
  image: string;
  priceLabel: string;
  options: { label: string; value: string | number; unit?: string }[];
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

type Action =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; cartId: string }
  | { type: "UPDATE_QTY"; cartId: string; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "HYDRATE"; items: CartItem[] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, action.item], isDrawerOpen: true };
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.cartId !== action.cartId) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.cartId ? { ...i, quantity: Math.max(1, action.qty) } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN_DRAWER":
      return { ...state, isDrawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isDrawerOpen: false };
    case "HYDRATE":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, "cartId">) => void;
  removeItem: (cartId: string) => void;
  updateQty: (cartId: string, qty: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isDrawerOpen: false });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("badalbakery_cart");
      if (saved) {
        dispatch({ type: "HYDRATE", items: JSON.parse(saved) });
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("badalbakery_cart", JSON.stringify(state.items));
    }
  }, [state.items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "cartId">) => {
    const cartId = `${item.slug}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    dispatch({ type: "ADD", item: { ...item, cartId } });
  }, []);

  const removeItem = useCallback((cartId: string) => dispatch({ type: "REMOVE", cartId }), []);
  const updateQty = useCallback((cartId: string, qty: number) => dispatch({ type: "UPDATE_QTY", cartId, qty }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openDrawer = useCallback(() => dispatch({ type: "OPEN_DRAWER" }), []);
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), []);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, totalItems, isDrawerOpen: state.isDrawerOpen, addItem, removeItem, updateQty, clearCart, openDrawer, closeDrawer }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

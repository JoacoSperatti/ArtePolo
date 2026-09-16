import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/mockData';

export interface CartItem {
  id: string; // Unique ID for cart item (important for custom items)
  product: Product;
  quantity: number;
  customizations?: {
    material?: string;
    color?: string;
    engraving?: string;
    notes?: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // If it's a non-custom item, check if it already exists
      if (!newItem.product.isCustom) {
        const existing = prev.find(item => item.product.id === newItem.product.id);
        if (existing) {
          return prev.map(item =>
            item.product.id === newItem.product.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        }
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

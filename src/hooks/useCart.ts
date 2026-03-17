import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Pizza } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (pizzaId: string) => void;
  updateQuantity: (pizzaId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (pizza: Pizza) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === pizza.id);
      if (existing) {
        return prev.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...pizza, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${pizza.name} has been added to your order.`,
    });
  };

  const removeFromCart = (pizzaId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== pizzaId));
  };

  const updateQuantity = (pizzaId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(pizzaId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === pizzaId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

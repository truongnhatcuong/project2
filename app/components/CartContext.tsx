"use client";

import React, { createContext, useState, useContext } from "react";

interface CartItem {
  addedAt: any;
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  selected: boolean;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  toggleSelect: (id: number) => void;
  toggleSelectItem: (id: number) => void;
  toggleSelectAllItems: (select: boolean) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex > -1) {
        const updatedItem = {
          ...prevCart[existingItemIndex],
          quantity: prevCart[existingItemIndex].quantity + item.quantity,
        };
        // Tạo một giỏ hàng mới, đưa sản phẩm cập nhật lên đầu danh sách
        const updatedCart = [
          updatedItem,
          ...prevCart.filter((cartItem, index) => index !== existingItemIndex),
        ];
        return updatedCart;
      }

      // Nếu sản phẩm không có trong giỏ hàng thì thêm mới
      return [item, ...prevCart];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const toggleSelect = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectItem = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAllItems = (selectAll: boolean) => {
    setCart((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        selected: selectAll,
      }))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotalQuantity,
        getTotalPrice,
        toggleSelect,
        toggleSelectItem,
        toggleSelectAllItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

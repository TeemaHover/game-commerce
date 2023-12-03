// CartContext.js
"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {
      // If the item is already in the cart, update the quantity
      setCartItems((prevItems) => {
        return prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      });
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem._id !== item._id)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

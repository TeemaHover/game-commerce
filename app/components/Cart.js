// components/Cart.js
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/cartContext";

const Cart = () => {
  const router = useRouter();
  const { cartItems, removeFromCart } = useCart();

  if (!cartItems) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.productId}>
              <p>{item.productName}</p>
              <p>${item.productPrice}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;

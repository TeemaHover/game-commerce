// components/Cart.js
"use client";
import React from "react";
import { useCart } from "../../context/cartContext";
import Navbar from "@/app/components/Navbar";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();

  const { cartItems, removeFromCart, addToCart } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    router.push("/");
    return null;
  }
  if (!cartItems) {
    return <div>Loading...</div>;
  }

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  const handleAdd = (item) => {
    addToCart(item);
  };
  const handleOrder = async () => {
    try {
      await axios.post("/api/orders/create", { username: user, cartItems });

      console.log("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-40 my-10">
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div>
            <table className="min-w-full bg-slate-500 rounded-3xl border-gray-300 dark:bg-gray-800 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Product Name
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Price
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Quantity
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item._id}
                    className="odd:bg-bg-slate-300 odd:dark:bg-gray-900 even:bg-slate-600 even:dark:bg-gray-800  dark:border-gray-700"
                  >
                    <td className="px-6 py-4 text-center">{item.name}</td>
                    <td className="px-6 py-4 text-center">${item.price}</td>
                    <td className="px-6 py-4 text-center">{item.quantity}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleRemove(item)}>
                        <AiOutlineDelete />
                      </button>
                      <button onClick={() => handleAdd(item)}>
                        <AiOutlineShoppingCart />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <button
                onClick={handleOrder}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;

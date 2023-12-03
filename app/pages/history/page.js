// components/OrderHistory.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/Navbar";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  useEffect(() => {
    if (!orderHistory.length && user) {
      fetchOrderHistory();
    }
  }, [user]);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`/api/orders/history/${user.username}`);
      setOrderHistory(response.data);
    } catch (error) {
      console.error("Error fetching order history: This error is her");
      //   console.error("Error fetching order history:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-40 my-10">
        <h1>Order History</h1>
        {orderHistory.length > 0 ? (
          <table className="min-w-full bg-slate-500 rounded-3xl border-gray-300 dark:bg-gray-800 dark:border-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                  Games
                </th>
                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="odd:bg-bg-slate-300 odd:dark:bg-gray-900 even:bg-slate-600 even:dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 text-center">
                      {/* Map over the games within the order */}
                      {order.cartItems.map((game) => (
                        <div key={game._id}>{game.name}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {new Date(order.orderDate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      $
                      {order.cartItems.reduce(
                        (total, game) => total + game.price * game.quantity,
                        0
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No order history available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

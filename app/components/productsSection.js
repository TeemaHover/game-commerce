"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./cards";
import { useCart } from "../context/cartContext";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const { cartItems } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/products/get");
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleAddToCart = (productItem) => {
    console.log("product: ", productItem);
    addToCart(productItem);
    console.log("cartItems: ", cartItems);
  };

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="flex flex-wrap">
          {products && products.length > 0 ? (
            products.map((product) => (
              <li key={product._id} className="basis-1/3">
                <Cards product={product} addToCart={handleAddToCart} />
              </li>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </ul>
      )}
    </div>
  );
};
export default ProductsPage;

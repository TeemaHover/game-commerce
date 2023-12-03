"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./cards";
import { useCart } from "../context/cartContext";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchYear, setSearchYear] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const { addToCart } = useCart();
  const { cartItems } = useCart();

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

  useEffect(() => {
    if (!products.length) {
      fetchData();
    }
  }, []);

  const handleAddToCart = (productItem) => {
    console.log("product: ", productItem);
    addToCart(productItem);
    console.log("cartItems: ", cartItems);
  };

  const handleYearChange = (e) => {
    setSearchYear(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchYear = !searchYear || product.year === searchYear;
    const matchCategory =
      !searchCategory || product.category === searchCategory;
    const matchMinPrice = !minPrice || product.price >= parseFloat(minPrice);
    const matchMaxPrice = !maxPrice || product.price <= parseFloat(maxPrice);

    return matchYear && matchCategory && matchMinPrice && matchMaxPrice;
  });

  const uniqueYears = Array.from(
    new Set(products.map((product) => product.year))
  );
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return (
    <div>
      <h1>Products</h1>
      <div className="flex ">
        <div className="flex items-center mx-5 my-5">
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            value={searchYear}
            onChange={handleYearChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="">All Years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={searchCategory}
            onChange={handleCategoryChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center mx-5 my-5">
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Enter Min Price"
            className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          />
        </div>
        <div className="flex items-center mx-5 my-5">
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Enter Max Price"
            className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="grid gap-x-8 gap-y-4 grid-cols-3">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product._id}>
                <Cards product={product} addToCart={handleAddToCart} />
              </li>
            ))
          ) : (
            <p>No products available for the selected criteria.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;

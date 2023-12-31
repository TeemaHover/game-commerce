import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    year: 2023,
    category: "",
    description: "",
    image: "",
    // Add other properties as needed
  });

  useEffect(() => {
    // Fetch all products when the component mounts
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("/api/products/all");

        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error("Failed to fetch products:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    setEditProduct(productToEdit);
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleEditSubmit = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `/api/products/edit/${updatedProduct._id}`,
        updatedProduct
      );

      if (response.status === 200) {
        // Update the products state with the edited product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        // Close the edit modal
        setEditProduct(null);
      } else {
        console.error("Failed to update product:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/products/add", newProduct);

      if (response.status === 200) {
        // Successfully added to the database
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setAddProductModalOpen(false);
      } else {
        console.error("Failed to add product:", response.data.error);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (deletedProduct) => {
    try {
      const response = await axios.delete(
        `/api/products/delete/${deletedProduct}`
      );

      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== deletedProduct)
        );
      } else {
        console.error("Failed to delete product:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    console.log(`Delete product with ID: ${deletedProduct}`);
  };

  return (
    <div>
      <h1>Product Management</h1>
      <div className="">
        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <div>
            <table className="min-w-min bg-slate-300 rounded-3xl border-gray-300 dark:bg-gray-800 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Product Image
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Name
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Price
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Year
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Category
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Description
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="odd:dark:bg-gray-500 even:bg-slate-500 even:dark:bg-gray-500 dark:border-gray-700 even:text-white"
                  >
                    <td className="px-6 py-4 text-center">{product.image}</td>
                    <td className="px-6 py-4 text-center">{product.name}</td>
                    <td className="px-6 py-4 text-center">${product.price}</td>
                    <td className="px-6 py-4 text-center">{product.year}</td>
                    <td className="px-6 py-4 text-center">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editProduct && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="bg-white p-8 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
                  {/* Your edit form or fields go here */}
                  {/* For simplicity, let's assume your product has 'name', 'price', 'year', 'category', and 'description' properties */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditSubmit(editProduct);
                    }}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Image
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={editProduct.image}
                        onChange={(e) =>
                          setEditProduct((prevProduct) => ({
                            ...prevProduct,
                            image: e.target.value,
                          }))
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editProduct.name}
                        onChange={(e) =>
                          setEditProduct((prevProduct) => ({
                            ...prevProduct,
                            name: e.target.value,
                          }))
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={editProduct.price}
                        onChange={(e) =>
                          setEditProduct((prevProduct) => ({
                            ...prevProduct,
                            price: e.target.value,
                          }))
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Year
                      </label>
                      <input
                        type="text"
                        id="year"
                        name="year"
                        value={editProduct.year}
                        onChange={(e) =>
                          setEditProduct((prevProduct) => ({
                            ...prevProduct,
                            year: e.target.value,
                          }))
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        value={editProduct.category}
                        onChange={(e) =>
                          setEditProduct((prevProduct) => ({
                            ...prevProduct,
                            category: e.target.value,
                          }))
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={editProduct.description}
                        onChange={(e) =>
                          setEditProduct((prevProduct) => ({
                            ...prevProduct,
                            description: e.target.value,
                          }))
                        }
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    {/* Repeat similar blocks for other fields */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setEditProduct(null)}
                        className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setAddProductModalOpen(true);
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
        {addProductModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
              <form onSubmit={handleAddSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={newProduct.image}
                    onChange={(e) =>
                      setNewProduct((prevProduct) => ({
                        ...prevProduct,
                        image: e.target.value,
                      }))
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct((prevProduct) => ({
                        ...prevProduct,
                        name: e.target.value,
                      }))
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct((prevProduct) => ({
                        ...prevProduct,
                        price: parseFloat(e.target.value),
                      }))
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={newProduct.year}
                    onChange={(e) =>
                      setNewProduct((prevProduct) => ({
                        ...prevProduct,
                        year: parseInt(e.target.value, 10),
                      }))
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct((prevProduct) => ({
                        ...prevProduct,
                        category: e.target.value,
                      }))
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct((prevProduct) => ({
                        ...prevProduct,
                        description: e.target.value,
                      }))
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setAddProductModalOpen(false)}
                    className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsAdmin;

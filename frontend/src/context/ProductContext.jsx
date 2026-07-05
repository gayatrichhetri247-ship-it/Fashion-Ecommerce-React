import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}/products`);

        const formattedProducts = response.data.products.map((item) => ({
          ...item,
          id: item._id,
          category: item.category?.toLowerCase() || "uncategorized",
        }));

        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  // Add Product
  const addProduct = async (productData) => {
    try {
      const response = await axios.post(
        `${API_URL}/products/create`,
        productData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const product = response.data.product;

      setProducts((prev) => [
        ...prev,
        {
          ...product,
          id: product._id,
          category: product.category?.toLowerCase() || "uncategorized",
        },
      ]);

      return response.data;
    } catch (err) {
      console.error("Failed to create product:", err.response?.data || err);
      throw err;
    }
  };

  // Delete Product
  const removeProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        withCredentials: true,
      });

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (err) {
      console.error("Failed to delete product:", err.response?.data || err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }

  return context;
};
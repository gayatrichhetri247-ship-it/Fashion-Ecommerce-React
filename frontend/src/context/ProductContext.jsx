import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend URL from .env
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}/api/products`);

        const formattedProducts = response.data.map((item) => ({
          ...item,
          id: String(item._id || item.id),
          category: item.category?.toLowerCase() || "uncategorized",
        }));

        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products from database:", err);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  // Add product
  const addProduct = async (productData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/products`,
        productData
      );

      const newProduct = {
        ...response.data,
        id: String(response.data._id || response.data.id),
        category: response.data.category?.toLowerCase() || "uncategorized",
      };

      setProducts((prev) => [...prev, newProduct]);
    } catch (err) {
      console.error("Error adding product to database:", err);
      throw err;
    }
  };

  // Delete product
  const removeProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);

      setProducts((prev) =>
        prev.filter((p) => String(p.id) !== String(id))
      );
    } catch (err) {
      console.error("Error removing product from database:", err);
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
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
};
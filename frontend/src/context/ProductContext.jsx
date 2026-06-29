import { createContext, useContext, useEffect, useState } from "react";
// axios is used here as an example, you can use native fetch if preferred
import axios from "axios"; 

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch data from backend database on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Replace this URL with your actual backend API endpoint
        const response = await axios.get("http://localhost:9000/api/products");
        
        // Ensure data formatting matches your application needs
        const formattedProducts = response.data.map((item) => ({
          ...item,
          id: String(item._id || item.id), // Handles MongoDB _id or relational id strings smoothly
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
  }, []);

  // 2. Add product to database
  const addProduct = async (productData) => {
    try {
      const response = await axios.post("http://localhost:9000/api/products", productData);
      
      const newProduct = {
        ...response.data,
        id: String(response.data._id || response.data.id),
        category: response.data.category?.toLowerCase() || "uncategorized",
      };

      setProducts((prev) => [...prev, newProduct]);
    } catch (err) {
      console.error("Error adding product to database:", err);
    }
  };

  // 3. Delete product from database
  const removeProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/products/${id}`);
      
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (err) {
      console.error("Error removing product from database:", err);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, addProduct, removeProduct }}>
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
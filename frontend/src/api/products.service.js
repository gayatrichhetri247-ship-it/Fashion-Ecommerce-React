import api from "./apiInstance";

export const addproduct = async (data) => {
  try {
    const res = await api.post("/products/create", data);
    console.log("Add product Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to create product:", error.response?.data || error.message);
    throw error;
  }
};
export const getproducts = async () => {
  try {
    const res = await api.get("/products");
    console.log("Get products Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch products:", error.response?.data || error.message);
    throw error;
  }
};
export const deleteproduct = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch products:", error.response?.data || error.message);
    throw error;
  }
};
export const editproduct = async (id, data) => {
  try {
    const res = await api.patch(`/products/${id}`,data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch products:", error.response?.data || error.message);
    throw error;
  }
};
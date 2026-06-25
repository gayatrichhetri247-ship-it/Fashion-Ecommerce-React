import api from "./apiInstance"

export const createOrder = async(data) =>{
     try {
    const res = await api.post("/orders/create", data);
    console.log("Create Order Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to create order:", error.response?.data || error.message);
    throw error;
  }
};

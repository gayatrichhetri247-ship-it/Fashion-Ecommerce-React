
import productModel from "../src/models/products.model.js";
import uploadOnCloudinary from "../src/utils/cloudinary.js";
import { success } from "./order.controller.js";


export const createproduct = async (req, res) => {
  try {
    const { name, description, price, oldPrice, category, ratings, reviewsCount } = req.body;

    let url = null;
    if (req.file) {
      const res = await uploadOnCloudinary(req.file.path);
      url = res.secure_url;
    }

    const product = await productModel.create({
      name,
      description,
      price,
      oldPrice,
      category,
      ratings,
      reviewsCount,
      photo: url,
    });
    res.status(201).json({
      message: "product created",
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const getproduct = async (req, res) => {
  try {
    const products = await productModel.find();

    if (products.length === 0) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const deleteproduct = async (req, res) => {
  try {
    const id = req.params.id;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "product deleted",
      success: true,
    });
  } catch {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const editproduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    const { name, description, price } = req.body;

    let url = product.photo || null;
    if (req.file) {
      const response = await uploadOnCloudinary(req.file.path);
      url = response.secure_url;
    }
    const updatedproduct = await productModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
      photo: url,
    },{new:true});
    res.status(200).json({
      message: "product Edited",
      success: true,
      product: updatedproduct,
    });
  } catch {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

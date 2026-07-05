import productModel from "../src/models/products.model.js";
import uploadOnCloudinary from "../src/utils/cloudinary.js";
import { success } from "./order.controller.js";

import fs from "fs";

export const createproduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    console.log("req.file:", req.file);

    if (req.file) {
      console.log("File exists:", fs.existsSync(req.file.path));
      console.log("File path:", req.file.path);
    }

    let url = null;

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);

      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Cloudinary upload failed",
        });
      }

      url = result.secure_url;
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
      success: true,
      message: "product created",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getproducts = async (req, res) => {
  try {
    const products = await productModel.find();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteproduct = async (req, res) => {
  try {
    const id = req.params.id;
    await productModel.findByIdAndDelete(id);
    return res.status(200).json({
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

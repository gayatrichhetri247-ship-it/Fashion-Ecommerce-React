import productModel from "../src/models/products.model.js";
import uploadOnCloudinary from "../src/utils/cloudinary.js";
import fs from "fs";

// CREATE PRODUCT
export const createproduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      oldPrice,
      category,
      ratings,
      reviewsCount,
    } = req.body;

    let url = null;

    if (req.file) {
      console.log("File exists:", fs.existsSync(req.file.path));
      console.log("File path:", req.file.path);

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

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
export const getproduct = async (req, res) => {
  try {
    const products = await productModel.find();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await productModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// EDIT PRODUCT
export const editproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      name,
      description,
      price,
      oldPrice,
      category,
      ratings,
      reviewsCount,
    } = req.body;

    let url = product.photo;

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);

      if (result) {
        url = result.secure_url;
      }
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        oldPrice,
        category,
        ratings,
        reviewsCount,
        photo: url,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
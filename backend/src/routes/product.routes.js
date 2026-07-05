import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  createproduct,
  getproduct,
  editproduct,
  deleteproduct,
} from "../../controllers/products.controller.js";
import {
  varifyToken,
  isAdmin,
} from "../middlewares/auth.middleware.js";

const productRoutes = express.Router();

productRoutes.post("/create", upload.single("photo"), createproduct);

productRoutes.get("/", getproduct);

productRoutes.patch(
  "/:id",
  varifyToken,
  isAdmin,
  upload.single("photo"),
  editproduct
);

productRoutes.delete(
  "/:id",
  varifyToken,
  isAdmin,
  deleteproduct
);

export default productRoutes;
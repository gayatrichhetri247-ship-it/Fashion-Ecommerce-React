import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { createproduct, deleteproduct, editproduct, getproduct } from "../../controllers/products.controller.js";
import { isAdmin, varifyToken } from "../middlewares/auth.middleware.js";

const productRoutes = express.Router();

productRoutes.route("/create").post(upload.single("photo"), createproduct);
productRoutes.route("/").get(getproduct);
productRoutes.route("/:id").delete(varifyToken, isAdmin, deleteproduct);
productRoutes.route("/:id").patch(varifyToken, isAdmin, upload.single('photo'), editproduct);


export default productRoutes;
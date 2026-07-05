import express from "express"
import userRoutes from "./src/routes/user.router.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import orderRoutes from "./src/routes/order.routes.js";
import productRoutes from "./src/routes/product.routes.js";
const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));
app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

export default app;

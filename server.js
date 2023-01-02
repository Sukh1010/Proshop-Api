import express from "express";
import colors from "colors";
import cors from "cors";
import connectDB from "./config/db.js";
import products from "./routes/ProductRoute.js";
import users from "./routes/UserRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/errorHandler.js";
import carts from "./routes/CartRoute.js";
import orders from "./routes/OrderRoute.js";

import dotenv from "dotenv";
dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/cart", carts);
app.use("/api/orders", orders);

app.use(notFound);
app.use(errorHandler);

let Port = process.env.PORT || 8080;
app.listen(
  Port,
  console.log(`server is running on port ${Port}`.blue.underline)
);

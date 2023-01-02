import { Router } from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controller/orderController.js";
import { adminAuth } from "../middlewares/authMiddleware.js";
const routes = Router();

routes.get("/", getOrders);
routes.get("/:_id", getOrder);
routes.post("/", createOrder);
routes.put("/:_id", adminAuth, updateOrder);
routes.delete("/:_id", adminAuth, deleteOrder);

export default routes;

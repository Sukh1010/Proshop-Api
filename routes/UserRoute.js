import { Router } from "express";
import {
  getUsers,
  getUserById,
  UserLogin,
  UserRegister,
  updateUser,
  updateAdmin,
  deleteUser,
} from "../controller/UserController.js";

import { adminAuth, userAuth } from "../middlewares/authMiddleware.js";
const routes = Router();

routes.get("/", adminAuth, getUsers);
routes.get("/:_id", adminAuth, getUserById);
routes.post("/login", UserLogin);
routes.post("/register", UserRegister);
routes.put("/", userAuth, updateUser);
routes.put("/admin/:_id", adminAuth, updateAdmin);
routes.delete("/:_id", adminAuth, deleteUser);

export default routes;

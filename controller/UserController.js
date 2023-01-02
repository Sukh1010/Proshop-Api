import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});
//admin token then find

const getUserById = asyncHandler(async (req, res, next) => {
  try {
    let { _id } = req.params;
    const user = await User.find({ _id });
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});
const UserLogin = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("email is invalid");
    let check = await bcrypt.compare(password, user.password);
    if (!check) throw new Error("password is incorrect");
    else
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
  } catch (error) {
    next(error);
  }
});

const UserRegister = asyncHandler(async (req, res, next) => {
  try {
    const { email: userEmail, password } = req.body;
    const existUser = await User.findOne({ email: userEmail });
    if (existUser) throw new Error("email already exists");
    req.body.password = await bcrypt.hash(password, 10);
    const { _id, name, email, isAdmin } = await User.create(req.body);
    res.status(200).send({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    });
  } catch (error) {
    next(error);
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  try {
    //by token not id
    const { _id } = req.user;
    const data = req.body;
    const { name, email, isAdmin } = await User.findByIdAndUpdate(
      { _id },
      { ...data },
      { new: true }
    );
    res.status(200).send({
      status: "data is updated",
      name,
      email,
      isAdmin,
    });
  } catch (error) {
    next(error);
  }
});
//user token first then update

const updateAdmin = asyncHandler(async (req, res, next) => {
  try {
    //by token not id
    const { _id } = req.params;
    const data = req.body;
    const { name, email, isAdmin } = await User.findByIdAndUpdate(
      { _id },
      { ...data },
      { new: true }
    );
    res.status(200).send({ _id, name, email, isAdmin });
  } catch (error) {
    next(error);
  }
});
const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = await User.findByIdAndRemove({ _id });
    res.status(200).send(result);
    // if (result.deletedCount === 1) {
    //   let users = await User.find();
    // } else throw new Error("something went wrong! try again");
  } catch (error) {
    next(error);
  }
});
//admin token
export {
  getUsers,
  getUserById,
  UserLogin,
  UserRegister,
  updateUser,
  updateAdmin,
  deleteUser,
};

import Cart from "../models/CartModel.js";
import asyncHandler from "express-async-handler";

const getUserCart = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    const result = await Cart.findOne({ user });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

const createUserCart = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    const result = await Cart.create({ user, items: [] });
    res.status(200).send({ success: true });
  } catch (error) {
    next(error);
  }
});
//first user id and then create items in cart:http://localhost:8080/cart/63a2f403228b1fd77a05e6db

const addCartItem = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    const { product } = req.body;
    const existItem = await Cart.updateOne(
      { user, "items._id": product._id },
      { $set: { "items.$.qty": product.qty } }
    );
    if (existItem.matchedCount != 1) {
      const result = await Cart.updateOne(
        { user },
        { $push: { items: product } }
      );
      if (result.modifiedCount === 0) throw new Error("item not added to cart");
    }

    let data = await Cart.findOne({ user });
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const updateQty = asyncHandler(async (req, res, next) => {
  try {
    //token
    const { user } = req.params;
    const { _id, qty } = req.body;
    const result = await Cart.updateOne(
      { user, "items._id": _id },
      { $set: { "items.$.qty": qty } }
    );
    if (result.modifiedCount === 0) throw new Error("qty didn't update");
    let data = await Cart.findOne({ user });
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const deleteCartItem = asyncHandler(async (req, res, next) => {
  try {
    const { user, _id } = req.params;
    const result = await Cart.updateOne(
      { user },
      { $pull: { items: { _id } } }
    );
    if (result.deleteCount === 0) throw new Error("item didn't deleted");
    let data = await Cart.findOne({ user });
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const clearCart = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    // console.log("user", user);
    const result = await Cart.updateOne({ user }, { $set: { items: [] } });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export {
  getUserCart,
  createUserCart,
  addCartItem,
  updateQty,
  deleteCartItem,
  clearCart,
};

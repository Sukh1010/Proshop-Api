import Product from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    let { _id } = req.params;
    const product = await Product.findOne({ _id });
    res.status(200).send(product);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const result = await Product.create(data);
    res.status(200).send(result);
    // if (result) {
    //   const products = await Product.find();
    // } else throw new Error("Product not update!");
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const result = await Product.findByIdAndUpdate({ _id }, data, {
      new: true,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await Product.findByIdAndRemove({ _id });
    res.status(200).send(result);
    // if (result.deletedCount === 1) {
    //   const products = await Product.find();
    // } else throw new Error("product not deleted! or no product found");
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

const createReview = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const { reviews } = await Product.findById(_id);
    const newReviews = [...reviews, data];
    const rating =
      reviews.length !== 0
        ? newReviews.reduce((acc, i) => acc + i.rating, 0) / newReviews.length
        : data.rating;
    const result = await Product.findByIdAndUpdate(
      { _id },
      {
        $set: { ratings: rating.toFixed(1), numReviews: newReviews.length },
        $push: { reviews: data },
      },
      { new: true }
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
};

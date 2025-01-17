import express from "express";
import ProductModel from "../../models/products/index.js";

const { Router } = express;

const productsRouter = new Router();

productsRouter.get("/", async (req, res) => {
  const products = await ProductModel.find({});
  res.status(200).send({ products });
});

productsRouter.get("/:id", async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) return res.status(404).send({ message: "not found" });
  res.status(200).send({ product });
});

productsRouter.delete("/:id", async (req, res) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).send({ message: "not found" });
  res.status(204).send();
});

productsRouter.post("/", async (req, res) => {
  try {
    const { description, price } = req.body;

    if (!description || !price) throw new Error("Invalid data");

    const product = new ProductModel({ description, price });
    await product.save();

    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default productsRouter;

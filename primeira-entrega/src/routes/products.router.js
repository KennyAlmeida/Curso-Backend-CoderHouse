const express = require("express");
const { v4: uuidv4 } = require("uuid");

const productsRouter = express.Router();

const productsDB = [];

productsRouter.get("/", (req, res) => {
  const { limit } = req.query;
  const limitedProducts = limit
    ? productsDB.slice(0, parseInt(limit, 10))
    : productsDB;
  res.json(limitedProducts);
});

productsRouter.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const product = productsDB.find((p) => p.id === pid);
  if (!product) {
    res.status(404).json({ error: "Produto não encontrado" });
  } else {
    res.json(product);
  }
});

productsRouter.post("/", (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !stock ||
    !category ||
    !thumbnails
  ) {
    res.status(400).json({ error: "Todos os campos são obrigatórios" });
    return;
  }

  const id = uuidv4();
  const status = true;

  const newProduct = {
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  productsDB.push(newProduct);
  res.status(201).json(newProduct);
});

productsRouter.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const updatedProductData = req.body;

  const productIndex = productsDB.findIndex((p) => p.id === pid);
  if (productIndex === -1) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }

  if (updatedProductData.id) {
    delete updatedProductData.id;
  }

  const updatedProduct = { ...productsDB[productIndex], ...updatedProductData };
  productsDB[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

productsRouter.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  const productIndex = productsDB.findIndex((p) => p.id === pid);
  if (productIndex === -1) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }

  productsDB.splice(productIndex, 1);
  res.json({ message: "Produto removido com sucesso" });
});

module.exports = productsRouter;

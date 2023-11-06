const express = require("express");
const { v4: uuidv4 } = require("uuid");

const cartsRouter = express.Router();

const cartsDB = [];

cartsRouter.post("/", (req, res) => {
  const id = uuidv4();
  const products = [];
  const newCart = {
    id,
    products,
  };

  cartsDB.push(newCart);
  res.status(201).json(newCart);
});

cartsRouter.get("/:cid", (req, res) => {
  const { cid } = req.params;
  const cart = cartsDB.find((c) => c.id === cid);
  if (!cart) {
    res.status(404).json({ error: "Carrinho não encontrado" });
    return;
  }

  res.json(cart.products);
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const { quantidade } = req.body;

  const cart = cartsDB.find((c) => c.id === cid);
  if (!cart) {
    res.status(404).json({ error: "Carrinho não encontrado" });
    return;
  }

  const product = productsDB.find((p) => p.id === pid);
  if (!product) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }

  const existingProduct = cart.products.find((p) => p.id === pid);

  if (existingProduct) {
    existingProduct.quantidade += quantidade;
  } else {
    cart.products.push({
      id: pid,
      quantidade,
    });
  }

  res.status(201).json(cart);
});

module.exports = cartsRouter;

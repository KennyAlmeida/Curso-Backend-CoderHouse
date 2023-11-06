const express = require("express");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid"); // Para gerar IDs únicos

const app = express();
app.use(express.json());

// Roteador para gerenciamento de produtos
const productsRouter = express.Router();
app.use("/api/products", productsRouter);

// Roteador para o carrinho
const cartsRouter = express.Router();
app.use("/api/carts", cartsRouter);

// Banco de dados de produtos
let productsDB = [];

// Banco de dados de carrinhos
let cartsDB = [];

// Rota para listar todos os produtos
productsRouter.get("/", (req, res) => {
  const { limit } = req.query;
  const limitedProducts = limit
    ? productsDB.slice(0, parseInt(limit, 10))
    : productsDB;
  res.json(limitedProducts);
});

// Rota para buscar um produto pelo ID
productsRouter.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const product = productsDB.find((p) => p.id === pid);
  if (!product) {
    res.status(404).json({ error: "Produto não encontrado" });
  } else {
    res.json(product);
  }
});

// Rota para adicionar um novo produto
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

// Rota para atualizar um produto pelo ID
productsRouter.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const updatedProductData = req.body;

  const productIndex = productsDB.findIndex((p) => p.id === pid);
  if (productIndex === -1) {
    res.status(404).json({ error: "Produto não encontrado" });
    return;
  }

  // Não atualize o ID
  if (updatedProductData.id) {
    delete updatedProductData.id;
  }

  const updatedProduct = { ...productsDB[productIndex], ...updatedProductData };
  productsDB[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// Rota para deletar um produto pelo ID
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

// Rota para criar um novo carrinho
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

// Rota para listar os produtos no carrinho pelo carrinho ID
cartsRouter.get("/:cid", (req, res) => {
  const { cid } = req.params;
  const cart = cartsDB.find((c) => c.id === cid);
  if (!cart) {
    res.status(404).json({ error: "Carrinho não encontrado" });
    return;
  }

  res.json(cart.products);
});

// Rota para adicionar um produto ao carrinho
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

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const ProductManager = require("./Desafio-02.js");

const app = express();
const port = 3000;

app.use(cors());

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await ProductManager.getAllProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await ProductManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Produto não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express em execução na porta ${port}`);
});

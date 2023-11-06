const express = require("express");
const { v4: uuidv4 } = require("uuid");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

const app = express();
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

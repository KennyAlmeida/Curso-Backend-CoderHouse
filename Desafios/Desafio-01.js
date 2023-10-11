class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      console.error("O código do produto já existe.");
      return;
    }

    product.id = this.productIdCounter++;
    this.products.push(product);
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.error("Produto não encontrado.");
    }
  }
}

const productManager = new ProductManager();

productManager.addProduct({
  title: "Produto 1",
  description: "Descrição do Produto 1",
  price: 19.99,
  thumbnail: "produto1.jpg",
  code: "P1",
  stock: 10,
});

productManager.addProduct({
  title: "Produto 2",
  description: "Descrição do Produto 2",
  price: 29.99,
  thumbnail: "produto2.jpg",
  code: "P2",
  stock: 5,
});

console.log(productManager.getProductById(1)); // Deve exibir o produto com ID 1
console.log(productManager.getProductById(3)); // Deve exibir "Produto não encontrado"

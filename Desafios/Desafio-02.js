const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProducts();

    const newProduct = {
      id: products.length + 1,
      ...product,
    };

    products.push(newProduct);
    this.saveProducts(products);
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find((product) => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);

    if (index !== -1) {
      updatedProduct.id = id;
      products[index] = updatedProduct;
      this.saveProducts(products);
      return true;
    } else {
      return false;
    }
  }

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter((product) => product.id !== id);
    this.saveProducts(products);
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }
}

module.exports = ProductManager;

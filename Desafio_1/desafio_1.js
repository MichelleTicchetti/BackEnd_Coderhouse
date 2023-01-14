class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock, id = 0) {
    let product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: id || 0,
    };

    const exists = this.products.some(
      (element) => element.code === product.code
    );

    if (exists) {
      console.log("Product already exists");
    } else {
      if (this.products.length === 0) {
        product["id"] = 1;
      } else {
        product["id"] = this.products[this.products.length - 1]["id"] + 1;
      }

      this.products.push(product);
      console.log("Product added");
    }
  }

  getProducts() {
    console.log(this.products);
    return this.products;
  }

  getProductById(id) {
    let product = this.products.find((element) => element.id === id);

    if (product != null) {
      console.log(product);
      return product;
    } else {
      ("Not found");
    }
  }
}

const manager = new ProductManager();
manager.addProduct(
  "pelota",
  "pelota del mundial",
  5000,
  "sin imagen",
  "abc123",
  2500
);
manager.addProduct(
  "camiseta",
  "camiseta selección",
  20000,
  "sin imagen",
  "abc987",
  500
);
manager.addProduct(
  "botines",
  "botines de Messi",
  30000,
  "sin imagen",
  "abc485",
  150
);
manager.getProducts();
manager.getProductById(2);

const ProductManager = require("./productManager");

const product1 = {
  title: "pelota",
  description: "pelota del mundial",
  price: 5000,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 2500,
};

const product2 = {
  title: "camiseta",
  description: "camiseta selección",
  price: 20000,
  thumbnail: "sin imagen",
  code: "abc987",
  stock: 500,
};

const product3 = {
  title: "botines",
  description: "botines de Messi",
  price: 30000,
  thumbnail: "sin imagen",
  code: "abc485",
  stock: 150,
};

const newProduct = {
  title: "camiseta 3 estrellas",
  description: "nueva camiseta de la selección",
  price: 20500,
  thumbnail: "sin imagen",
  code: "abc584",
  stock: 300,
};

const manager = new ProductManager("products.json");

const agregarProductos = async () => {
  try {
    await manager.addProduct(product1);
    await manager.addProduct(product2);
    await manager.addProduct(product3);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProducto = async () => {
  try {
    await manager.deleteProductById(2);
  } catch (error) {
    console.log(error);
  }
};

const actualizarProducto = async () => {
  try {
    await manager.updateProduct(1, newProduct);
  } catch (error) {
    console.log(error);
  }
};

const eliminarTodosProductos = async () => {
  try {
    await manager.getProducts();
    await manager.deleteAllProducts();
    await manager.getProducts();
  } catch (error) {
    console.log(error);
  }
};

agregarProductos();
// eliminarProducto();
// actualizarProducto();
// eliminarTodosProductos();

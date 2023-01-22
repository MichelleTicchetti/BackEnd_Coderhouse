const express = require("express");
const ProductManager = require("./productManager");

const app = express();
const PORT = 8080;

//configuración del servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto: ${PORT}`);
});

//si tenemos un error
server.on("error", (error) =>
  console.log(`Error en servidor: ${error.message}`)
);

const manager = new ProductManager("products.json");

app.get("/products", async (req, res) => {
  let products = await manager.getProducts();
  const limit = req.query.limit;
  let result = products;

  if (limit) {
    result = products.slice(0, limit);
  }

  res.send(result);
});

app.get("/products/:id", async (req, res) => {
  let idProduct = req.params.id;
  let product = await manager.getProductById(idProduct);

  if (!product) {
    return res.send({ error: "Producto no encontrado" });
  }

  res.send({ product });
});

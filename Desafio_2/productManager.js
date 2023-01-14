const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  //Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID
  async updateProduct(id, content) {
    try {
      const products = await this.getProducts();
      const targetProduct = await this.getProductById(id);
      const productUpdated = { ...targetProduct, ...content };

      if (targetProduct) {
        const updatedList = products.map((obj) => {
          if (obj.id === productUpdated.id) {
            return productUpdated;
          } else {
            return obj;
          }
        });
        await fs.promises.writeFile(
          `./${this.path}`,
          JSON.stringify(updatedList)
        );
        return updatedList;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
  async addProduct(product) {
    try {
      const data = await fs.promises.readFile(`./${this.path}`, "utf-8");
      const products = JSON.parse(data);
      let idNewProduct = 1;

      if (products.length >= 1) {
        let indexLastProduct = products.length - 1;
        let idLastProduct = products[indexLastProduct].id;
        idNewProduct = idLastProduct + 1;
      }

      const newProduct = { id: idNewProduct, ...product };
      products.push(newProduct);

      await fs.promises.writeFile(`./${this.path}`, JSON.stringify(products));
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  // Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
  async getProducts() {
    try {
      const data = await fs.promises.readFile(`./${this.path}`, "utf-8");
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  // Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(`./${this.path}`, "utf-8");
      const products = JSON.parse(data);
      const product = products.find((product) => product.id === id);

      if (product) {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
  async deleteProductById(id) {
    try {
      const data = await fs.promises.readFile(`./${this.path}`, "utf-8");
      const products = JSON.parse(data);
      const newProducts = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(
        `./${this.path}`,
        JSON.stringify(newProducts)
      );
      return newProducts;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllProducts() {
    try {
      await fs.promises.writeFile(`./${this.path}`, []);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductManager;

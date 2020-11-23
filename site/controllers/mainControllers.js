const path = require("path");
const getPath = (filePath) => {
  return path.resolve(__dirname, filePath);
};

const mainControllers = {
  inicio: (req, res) => {
    res.render("index");
  },
  galeria_productos: (req, res) => {
    res.render("galeria-productos");
  },
  ficha_producto: (req, res) => {
    res.render("ficha-producto");
  },
  cart: (req, res) => {
    res.render("carrito");
  },
  login: (req, res) => {
    res.render("login");
  },
  registro: (req, res) => {
    res.render("register");
  },

  notFound: (req, res) => {
    res.send("404");
  },
};

module.exports = mainControllers;

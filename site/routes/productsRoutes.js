const express = require("express");
const routes = express.Router();

const mainControllers = require("../controllers/mainControllers");

routes.get("/categoria/:subcategoria?", mainControllers.galeria_productos);
routes.get("/producto/:id-producto", mainControllers.ficha_producto);

module.exports = routes;

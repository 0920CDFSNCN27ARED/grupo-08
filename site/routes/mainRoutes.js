const express = require("express");
const routes = express.Router();

// Controllers
const mainControllers = require("../controllers/mainControllers")

routes.get("/", mainControllers.inicio);
routes.get("/galeria", mainControllers.galeria_productos)
routes.get("/ficha", mainControllers.ficha_producto)

routes.get("*", mainControllers.notFound);


module.exports = routes;
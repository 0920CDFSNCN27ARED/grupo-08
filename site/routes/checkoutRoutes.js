const express = require("express");
const routes = express.Router();

const mainControllers = require("../controllers/mainControllers");

routes.get("/carrito", mainControllers.cart);

module.exports = routes;

const express = require("express");
const routes = express.Router();

// Controllers
const mainControllers = require("../controllers/mainControllers");

routes.get("/", mainControllers.inicio);

routes.get("/login", mainControllers.login);
routes.get("/register", mainControllers.registro);

routes.get("*", mainControllers.notFound);

module.exports = routes;

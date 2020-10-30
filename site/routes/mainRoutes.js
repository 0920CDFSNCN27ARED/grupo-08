const express = require("express");
const routes = express.Router();

// Controllers
const mainControllers = require("../controllers/mainControllers")

routes.get("/", mainControllers.inicio);
routes.get("/leandro", mainControllers.inicio);
routes.get("*", mainControllers.notFound);

module.exports = routes;
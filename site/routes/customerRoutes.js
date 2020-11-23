const express = require("express");
const routes = express.Router();

const mainControllers = require("../controllers/mainControllers");

routes.get("/login", mainControllers.login);
routes.get("/registro", mainControllers.registro);

module.exports = routes;

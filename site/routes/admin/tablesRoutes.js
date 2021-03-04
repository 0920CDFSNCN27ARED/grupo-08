const express = require('express');
const routes = express.Router();
const tablitasControllers = require('../../controllers/admin/tablitasControllers');

// Tabla de talles
routes.get('/todas', tablitasControllers.getAll);

module.exports = routes;

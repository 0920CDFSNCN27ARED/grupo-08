const express = require('express');
const routes = express.Router();

const handleUploadImage = require('../../helpers/handleUploadImage');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, handleUploadImage(req, file));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

// Validations
const validations = require('../../middlewares/validations/admin.customer.validations');

// Controllers
const customerController = require('../../controllers/api/customerControllers');
const productControllers = require('../../controllers/api/productControllers');

// ROUTES --> Customer
routes.get('/customers', customerController.getAll);

routes.post('/customers/create', validations.create, customerController.create);

routes.get('/customers/:id', customerController.getOne);
routes.put('/customers/:id/edit', customerController.update);
routes.delete('/customers/:id/delete', customerController.delete);

// ROUTES --> Products
routes.get('/products', productControllers.getAll);

routes.get('/products/create', productControllers.create);
routes.post('/products/created', upload.any(), productControllers.created);
// Necesito crear un metodo para cargar imagenes al producto

routes.get('/products/:id', productControllers.getOne);
routes.put('/products/:id/edit', upload.any(), productControllers.update);
routes.delete('/products/:id/delete', productControllers.delete);

module.exports = routes;

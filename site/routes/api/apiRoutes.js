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
const categoryController = require('../../controllers/api/categoryController');
const brandController = require('../../controllers/api/brandController');

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

// ROUTES --> Categories
routes.get('/categories', categoryController.getAll);

routes.post('/categories/create', upload.any(), categoryController.create);

routes.get('/categories/:id', categoryController.getOne);
routes.put('/categories/:id/edit', upload.any(), categoryController.update);
routes.delete('/categories/:id/delete', categoryController.delete);

// ROUTES --> Brands
routes.get('/brands', brandController.getAll);

routes.post('/brands/create', upload.any(), brandController.create);

routes.get('/brands/:id', brandController.getOne);
routes.put('/brands/:id/edit', upload.any(), brandController.update);
routes.delete('/brands/:id/delete', brandController.delete);

module.exports = routes;

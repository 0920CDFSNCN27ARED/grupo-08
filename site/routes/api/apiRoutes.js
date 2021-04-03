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
const customerControllers = require('../../controllers/api/customerControllers');
const productControllers = require('../../controllers/api/productControllers');
const categoryControllers = require('../../controllers/api/categoryControllers');
const brandControllers = require('../../controllers/api/brandControllers');
const colorControllers = require('../../controllers/api/colorControllers');

// ROUTES --> Customer
routes.get('/customers', customerControllers.getAll);

routes.post('/customers/create', validations.create, customerControllers.create);

routes.get('/customers/:id', customerControllers.getOne);
routes.put('/customers/:id/edit', customerControllers.update);
routes.delete('/customers/:id/delete', customerControllers.delete);

// ROUTES --> Products
routes.get('/products', productControllers.getAll);

routes.get('/products/create', productControllers.create);
routes.post('/products/created', upload.any(), productControllers.created);
// Necesito crear un metodo para cargar imagenes al producto

routes.get('/products/:id', productControllers.getOne);
routes.put('/products/:id/edit', upload.any(), productControllers.update);
routes.delete('/products/:id/delete', productControllers.delete);

// ROUTES --> Categories
routes.get('/categories', categoryControllers.getAll);

routes.post('/categories/create', upload.any(), categoryControllers.create);

routes.get('/categories/:id', categoryControllers.getOne);
routes.put('/categories/:id/edit', upload.any(), categoryControllers.update);
routes.delete('/categories/:id/delete', categoryControllers.delete);

// ROUTES --> Brands
routes.get('/brands', brandControllers.getAll);

routes.post('/brands/create', upload.any(), brandControllers.create);

routes.get('/brands/:id', brandControllers.getOne);
routes.put('/brands/:id/edit', upload.any(), brandControllers.update);
routes.delete('/brands/:id/delete', brandControllers.delete);

// ROUTES --> Colors
routes.get('/colors', colorControllers.getAll);

routes.post('/colors/create', upload.any(), colorControllers.create);

routes.get('/colors/:id', colorControllers.getOne);
routes.put('/colors/:id/edit', upload.any(), colorControllers.update);
routes.delete('/colors/:id/delete', colorControllers.delete);

module.exports = routes;
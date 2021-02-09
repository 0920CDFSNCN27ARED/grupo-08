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

// Controller
const productsControllers = require('../../controllers/admin/productsControllers');
const categoriesControllers = require('../../controllers/admin/categoriesControllers');

// Productos
routes.get('/productos', productsControllers.getAll);
routes.get('/productos/crear', productsControllers.create);
routes.post('/productos/crear', upload.any(), productsControllers.created);

routes.get('/productos/:id', productsControllers.getOne);
routes.put('/productos/:id/update', upload.any(), productsControllers.update);

routes.delete('/productos/:id/delete', productsControllers.delete);

// Categorias
routes.get('/categorias', categoriesControllers.getAll);
routes.post('/categorias/crear', upload.any(), categoriesControllers.create);

routes.get('/categorias/:id', categoriesControllers.getOne);
routes.put('/categorias/:id/update', upload.any(), categoriesControllers.update);

routes.delete('/categorias/:id/delete', categoriesControllers.delete);


module.exports = routes;

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
const catalogControllers = require('../../controllers/admin/catalogControllers');

// Routes
routes.get('/productos', catalogControllers.getAll);
routes.get('/productos/crear', catalogControllers.create);
routes.post('/productos/crear', upload.any(), catalogControllers.created);

routes.get('/productos/:id', catalogControllers.getOne);
routes.put('/productos/:id/update', upload.any(), catalogControllers.update);

routes.delete('/productos/:id/delete', catalogControllers.delete);

module.exports = routes;

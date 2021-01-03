const express = require('express');
const routes = express.Router();

const productControllers = require('../controllers/productControllers');

//const multer = require("multer"); // en el archivo de rutas requiero multer
//const path = require("path"); // requerir el modulo path para despues poder extraer la extencion del archivo que se suba

/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname)) // aca le agrego la extencion del archivo original al nuevo nombre del archivo usando path.extname
    }
});
*/

routes.get('/categoria/:categoria/:subcategoria?', productControllers.gallery);
routes.get('/producto/create', productControllers.showCreate);
routes.post('/producto/', /* upload.any("images"), */ productControllers.create);
routes.get('/producto/:id_producto', productControllers.details);

routes.get('/producto/:id_producto/edit', productControllers.showEdit);
routes.put('/producto/:id_producto', /* upload.any("images"), */ productControllers.edit);
routes.delete('/producto/:id_producto', productControllers.delete);

module.exports = routes;

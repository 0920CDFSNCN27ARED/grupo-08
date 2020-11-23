const path = require('path');
const getPath = (filePath) => {
    return path.resolve(__dirname, filePath);
};

const productControllers = {
    gallery: (req, res) => {
        res.sendFile(getPath('../views/galeria-productos.html'));
    },

    details: (req, res) => {
        res.sendFile(getPath('../views/ficha-producto.html'));
    },
};

module.exports = productControllers;

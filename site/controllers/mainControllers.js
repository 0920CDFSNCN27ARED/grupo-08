const path = require("path")
const getPath = (filePath) => {
    return path.resolve(__dirname, filePath);
}

const mainControllers = {
    inicio: (req, res) => {
        res.sendFile(getPath("../views/index.html"));
    },
    galeria_productos: (req, res) => {
        res.sendFile(getPath('../views/galeria-productos.html'));
    },
    ficha_producto: (req, res) => {
        res.sendFile(getPath('../views/ficha-producto.html'));
    },

    notFound: (req, res) => {
        res.send("404");
    },
}

module.exports = mainControllers;
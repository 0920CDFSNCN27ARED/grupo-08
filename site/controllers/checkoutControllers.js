const path = require('path');
const getPath = (filePath) => {
    return path.resolve(__dirname, filePath);
};

const checkoutControllers = {
    cart: (req, res) => {
        res.sendFile(getPath('../views/carrito.html'));
    },
};

module.exports = checkoutControllers;

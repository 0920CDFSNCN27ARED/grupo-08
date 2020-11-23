const path = require('path');
const getPath = (filePath) => {
    return path.resolve(__dirname, filePath);
};

const checkoutControllers = {
    cart: (req, res) => {
        res.render('cart');
    },
};

module.exports = checkoutControllers;

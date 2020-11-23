const path = require('path');
const getPath = (filePath) => {
    return path.resolve(__dirname, filePath);
};

const customerControllers = {
    login: (req, res) => {
        res.render('login');
    },

    register: (req, res) => {
        res.render('register');
    },
};

module.exports = customerControllers;

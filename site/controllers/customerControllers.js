const path = require('path');
const getPath = (filePath) => {
    return path.resolve(__dirname, filePath);
};

const customerControllers = {
    login: (req, res) => {
        res.sendFile(getPath('../views/login.html'));
    },

    register: (req, res) => {
        res.sendFile(getPath('../views/register.html'));
    },
};

module.exports = customerControllers;

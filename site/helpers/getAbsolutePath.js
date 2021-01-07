const path = require('path');

const getAbsolutePath = (filePath) => {
    return path.join(__dirname, filePath);
};

module.exports = getAbsolutePath;

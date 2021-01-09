const path = require('path');

const getAbsolutePath = (filePath) => {
    return path.resolve(__dirname, filePath);
};

module.exports = getAbsolutePath;

const fs = require('fs');
const path = require('path');
const getAbsolutePath = require('./getAbsolutePath');

const readJsonFile = (filePath) => {
    const data = fs.readFileSync(getAbsolutePath(filePath));
    return JSON.parse(data);
};

module.exports = readJsonFile;

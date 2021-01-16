const fs = require('fs');
const path = require('path');
const getAbsolutePath = require('./getAbsolutePath');

const writeJsonFile = (data, filePath) => {
    const dataJSON = JSON.stringify(data, null, 2);
    fs.writeFileSync(getAbsolutePath(filePath), dataJSON);
};

module.exports = writeJsonFile;

const fs = require('fs');
const path = require('path');
const getAbsolutePath = require('./getAbsolutePath');

const jsonFile = {
    read: filePath => {
        const data = fs.readFileSync(getAbsolutePath(filePath));

        return JSON.parse(data);
    },

    write: (data, filePath) => {
        const dataJSON = JSON.stringify(data, null, 2);
        fs.writeFileSync(getAbsolutePath(filePath), dataJSON);

        return;
    }
};

module.exports = jsonFile;
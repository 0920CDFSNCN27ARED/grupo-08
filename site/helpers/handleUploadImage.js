const fs = require('fs-extra');

const path = require('path');
const getAbsolutePath = require('./getAbsolutePath');

// HAY UN BUG DONDE SI SE SUBEN ARCHIVOS
// CON EL MISMO NOMBRE PISA EL ANTERIOR

function handleUploadImage(req, file) {
    console.log('\n\n\n\n dsadsadsdsadsds \n\n\n\n ');
    /* 
        Las imagenes se van a guardar dentro del directorio catalog/products
        que a su vez se va a guardar dentro de los directorios llamados
        igual que los dos primeros caracteres del nombre del archivo

        Si el archivo se llama pepitos.jpg su ruta sera
        ./catalog/products/p/e/
    */
    let fileName, basePath, finalPath;

    fileName = file.originalname;
    basePath = getAbsolutePath('../public/images/catalog/products');
    finalPath = basePath + '/' + fileName[0] + '/' + fileName[1];

    fs.ensureDirSync(finalPath, (err) => {
        if (err) throw err;
    });

    return finalPath;
}

module.exports = handleUploadImage;

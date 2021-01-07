const fs = require('fs-extra');

const path = require('path');
const getAbsolutePath = require('./getAbsolutePath');

// HAY UN BUG DONDE SI SE SUBEN ARCHIVOS
// CON EL MISMO NOMBRE PISA EL ANTERIOR

function handleUploadImage(req, file) {
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

    //console.log(fileName);
    // Valido si existe el directorio, si no, lo creo
    /* fs.ensureDir(finalPath)
        .then(() => {
            console.log('Creado');
        })
        .catch((err) => {
            console.log('DIR :: el error es: ' + err);
        }); */

    // Tengo que usar ensureDirSync porque multer busca
    // El directorio antes de que termine de crearlo
    fs.ensureDirSync(finalPath, (err) => {
        if (err) throw err;

        console.log('Creado');
    });

    return finalPath;
}

module.exports = handleUploadImage;

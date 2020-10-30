/*
    [x] - Levantar servidor 
        -- [] - Express
    [] - Crear rutas
        -- [] - Crear modulos de rutas
        -- [] - Crear controlador de rutas
    [] - Crear directorios
        -- [] - Archivos estaticos
    [] - Crear vistas
*/

const express = require("express");
const app = express();

app.listen(3000, function(){
    console.log("Escuchando el puerto 3000");
})

/*
    [x] - Levantar servidor 
        -- [x] - Express
    [x] - Crear rutas
        -- [x] - Crear modulos de rutas
        -- [x] - Crear controlador de rutas
    [x] - Crear directorios
        -- [x] - Archivos estaticos
    [x] - Crear vistas
*/

const express = require("express");
const app = express();

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Escuchando el puerto "+ PORT);
});

const staticFiles = express.static("public");

// Rutas
const mainRoutes = require("./routes/mainRoutes");

app.use(staticFiles)
app.use(mainRoutes)
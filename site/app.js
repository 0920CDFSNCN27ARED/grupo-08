/*
    [x] - Levantar servidor 
        -- [x] - Express
    [x] - Crear rutas
        -- [] - Crear modulos de rutas
        -- [] - Crear controlador de rutas
    [] - Crear directorios
        -- [] - Archivos estaticos
    [] - Crear vistas
*/

const express = require("express");
const app = express();

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Escuchando el puerto "+ PORT);
});

app.get("/", (req, res) => {
    res.send("cualquier cosa");
});

app.get("*", (req, res) => {
    res.send("404");
});

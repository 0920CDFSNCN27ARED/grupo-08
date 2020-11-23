const express = require("express");
const app = express();

const PORT = 3000;
app.listen(PORT, () => console.log("Escuchando el puerto " + PORT));

// Archivos estaticos
const staticFiles = express.static("public");
app.use(staticFiles);

// Cargar rutas
const mainRoutes = require("./routes/mainRoutes");
const productsRoutes = require("./routes/productsRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

// Middlewares

// CORS

// Levantar rutas

app.use("/catalogo", productsRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/", mainRoutes);

const express = require('express');
const app = express();

const PORT = 3000;
app.listen(PORT, () => console.log('Escuchando el puerto ' + PORT));

// Configuraciones express
app.set('view engine', 'ejs');

// Archivos estaticos
const staticFiles = express.static('public');
app.use(staticFiles);

// Cargar rutas
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const customerRoutes = require('./routes/customerRoutes');

// Middlewares

// CORS

// Levantar rutas

app.use('/catalogo', productRoutes);
app.use('/cliente', customerRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/', mainRoutes);

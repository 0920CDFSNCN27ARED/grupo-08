const express = require('express');
const methodOverride = require('method-override');

// SETTINGS
const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log('Escuchando el puerto ' + PORT));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Load Routes
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const customerRoutes = require('./routes/customerRoutes');

// Admin
const adminRoutes = require('./routes/admin/adminRoutes');

// Routes
app.use('/', mainRoutes);
app.use('/c', productRoutes);
app.use('/clientes', customerRoutes);
app.use('/checkout', checkoutRoutes);

// Admin
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    res.render('pages/not_found');
});

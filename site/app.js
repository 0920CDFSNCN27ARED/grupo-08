const express = require('express');
const methodOverride = require('method-override');
const opn = require('open');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const getCategories = require('./middlewares/categories/getAllCategories');

// SETTINGS
const app = express();
const PORT = 3000;

// prettier-ignore
app.listen(PORT, () => {
        console.log('Escuchando el puerto ' + PORT)

        /* opn('http://192.168.0.101:3000/admin/c/categorias', {
            background: true,
            app: ['google chrome'],
        }) */
    }
);
app.set('view engine', 'ejs');

// Views functions
app.locals._exists = (item) => (item !== undefined ? true : false);

// Middlewares
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    session({
        secret: 'metronomyRocks',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser());

app.use((req, res, next) => {
    req.session.adminId = 1;
    res.locals.curAdmin = {
        id: 1,
        first_name: 'Leandro',
        last_name: 'Muzzupappa',
        email: 'lnmuzzupappa@gmail.com',
        username: 'lm',
        password: '$2b$12$FbDdOYvqQODfm7zDyEPmleoJS1xREoBhk.RreEL9nRlEH3V0B2pJ.',
        created_at: 1612756807152,
        last_login_date: 1613574676213,
        status: 'activo',
        permissions: 'administrador',
    };

    next();
});

// Load Routes
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const customerRoutes = require('./routes/customerRoutes');

// Admin
const adminRoutes = require('./routes/admin/adminRoutes');

// Routes
app.use('/', getCategories, mainRoutes);
app.use('/c', productRoutes);
app.use('/clientes', customerRoutes);
app.use('/checkout', checkoutRoutes);

// Admin
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    res.render('pages/not_found');
});

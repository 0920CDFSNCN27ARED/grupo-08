const express = require('express');
const methodOverride = require('method-override');
const opn = require('open');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const getCategories = require('./middlewares/categories/getAllCategories');

const withCookiesAuth = require('./middlewares/auth/withCookiesAuth');
const withAuth = require('./middlewares/auth/withAuth');
const withAdminAuth = require('./middlewares/auth/withAdminAuth');
const productsInCart = require('./middlewares/checkout/productsInCart');

// SETTINGS
const app = express();
const PORT = 3001;

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
app.use(cors('*'));
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

app.use(withCookiesAuth);
app.use(productsInCart);

app.use((req, res, next) => {
    console.log('app md fin \n\n');

    function deleteDataCustomer() {
        delete req.session.customer;
        res.clearCookie('cookieCustomer');
    }
    function deleteDataAdmin() {
        delete req.session.adminUser;
        res.clearCookie('cookieAdminUser');
    }

    //deleteDataCustomer();
    //deleteDataAdmin();

    console.log('customer session: ', req.session.customer);
    console.log('customer cookie: ', req.cookies.cookieCustomer);
    console.log('--------');
    console.log('admin session: ', req.session.adminUser);
    console.log('admin cookie: ', req.cookies.cookieAdminUser);

    console.log('app md fin \n\n');

    next();
});

// Load Routes
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const customerRoutes = require('./routes/customerRoutes');
const apiRoutes = require('./routes/api/apiRoutes');

// Admin
const adminRoutes = require('./routes/admin/adminRoutes');

// Routes
app.use('/', getCategories, mainRoutes);
app.use('/c', productRoutes);
app.use('/clientes', withAuth, customerRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/api/v1', apiRoutes);

// Admin
app.use('/admin', withAdminAuth, adminRoutes);

app.use((req, res, next) => {
    res.render('pages/not_found');
});

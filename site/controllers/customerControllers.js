const jsonFile = require('../helpers/jsonFile');
const bcrypt = require('bcrypt');
const handleCreateId = require('../helpers/handleCreateId');


const customerControllers = {
    login: (req, res) => {
        res.render('pages/login');
    },
    logged: (req, res) => {
        const errors = [];
        const { email, password } = req.body;

        const allCustomers = jsonFile.read('../db/customers.json');
        const customer = allCustomers.find(customer => {
            return (
                customer.email === email &&
                bcrypt.compareSync(password, customer.password)
            )
        });

        if(!customer) {
            errors.push('Credenciales incorrectas');
            res.render('pages/login', {errors})
            return;
        }

        allCustomers.forEach(_customer => {
            if(_customer.id == customer.id) {
                customer.last_login_date = Date.now();
            }
        });
        jsonFile.write(allCustomers, '../db/customers.json');
        req.session.customer = customer.id;

        return res.redirect('/clientes/mi-cuenta');
    },
    logout: (req, res) => {
        console.log('se cerro la sesion de: ' + req.session.customer);
        delete req.session.customer;

        return res.redirect('/');
    },

    register: (req, res) => {
        res.render('pages/register');
    },
    registered: (req, res) => {
        const errors = [];
        let {
            first_name,
            last_name,
            email,
            email_confirm,
            password,
            password_confirm,
            dob,
            user_gender,
        } = req.body;

        if(password !== password_confirm) {
            errors.push('Las contraseñas no son iguales')
            res.render('admin/pages/user/register.ejs', {errors});
        }

        if(email !== email_confirm) {
            errors.push('Los emails no son iguales')
            res.render('admin/pages/user/register.ejs', {errors});
        }

        const allCustomers = jsonFile.read('../db/customers.json');
        allCustomers.forEach(customer => {
            if(customer.email === email) errors.push('El email ya esta registrado')
            // Agregar validaciones varias aca
        });

        if(errors.length > 0) {
            res.render('admin/pages/user/register.ejs', {errors})
            return;
        }

        const customer = {
            id: handleCreateId(allCustomers),
            status: 1,
            newsletter: 0,
            first_name: first_name,
            last_name: last_name,
            email: email,
            email_verified: 0,
            dob: dob,
            gender: user_gender,
            password: bcrypt.hashSync(password, 12),
            joined_newsletters: 0,
            phone: '',
            shipment_address: {
                dni: '',
                first_name: '',
                last_name: '',
                pais: '',
                provincia: '',
                ciudad: '',
                codigo_posta: '',

            },
            orders: {},
            cart: {},
            wishlist: {},
            created_at: Date.now(),
            last_login_date: '',
        }

        allCustomers.push(customer);
        jsonFile.write(allCustomers, '../db/customers.json');
        req.session.customer = customer.id;

        return res.redirect('/clientes/mi-cuenta')
    },

    recover: (req, res) => {
        res.render('pages/recover');
    },

    account: (req, res) => {
        console.log(req.session.customer);

        res.render('pages/customer');
    }
};

module.exports = customerControllers;

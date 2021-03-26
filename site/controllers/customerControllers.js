const bcrypt = require('bcrypt');
const db = require('../database/models');

const customerControllers = {
    login: (req, res) => {
        return res.render('pages/login');
    },
    logged: async (req, res) => {
        const errors = [];
        const { email, password, persist } = req.body;

        const customer = await db.Customer.findOne({ where: { email: email } });

        if (customer === null) {
            errors.push('Credenciales incorrectas');
            return res.render('pages/login', { errors });
        }

        if (!bcrypt.compareSync(password, customer.dataValues.userPassword)) {
            errors.push('Credenciales incorrectas');
            return res.render('pages/login', { errors });
        }

        if (persist) {
            let days = 30;

            res.cookie('cookieCustomer', customer.dataValues.id, {
                maxAge: days * 24 * 60 * 60 * 1000,
            });

            /* 
                Para Lean C!
                Que hace esto   -> days * 24 * 60 * 60 * 1000

                                -> dias * horas * minutos * segundos * milisegundos
                
                El tiempo de las cookies se calcula en milisegundos, por lo que
                tenemos que calcular el tiempo de expiracion de la cookie en ms.

                1 dia tiene 86400 segundos -> 24 * 60 * 60
                1 segundo son 1000 milisegundos

                Entonces 1 dia en ms seria -> 24 * 60 * 60 * 1000

                Y si quiero setear una cookie por x cantidad de dias
                hay que hacer n_dias * 24 * 60 * 60 * 1000
                
                Saludos,
                Lenny M :)
            */
        }

        req.session.customer = customer.dataValues.id;
        return res.redirect(301, '/clientes/mi-cuenta');
    },
    logout: (req, res) => {
        delete req.session.customer;
        res.clearCookie('cookieCustomer');
        delete req.session.productsInCart;

        delete req.session.customer;
        res.clearCookie('cookieCustomer');
        delete req.session.productsInCart;

        return res.redirect(301, '/');
    },

    register: (req, res) => {
        res.render('pages/register');
    },
    registered: async (req, res) => {
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

        if (password !== password_confirm) {
            errors.push('Las contraseñas no son iguales');
            return res.render('pages/register', { errors });
        }

        if (email !== email_confirm) {
            errors.push('Los emails no son iguales');
            return res.render('pages/register', { errors });
        }

        const customer = await db.Customer.findOne({ where: { email: email } });

        if (customer) {
            errors.push('El email ya se encuentra registrado');
            return res.render('pages/register', { errors });
        }

        if (errors.length > 0) {
            console.log(errors);
            return res.render('pages/register', { errors });
        }

        try {
            const newCustomer = await db.Customer.create({
                isActive: 1,
                firstName: first_name,
                lastName: last_name,
                email: email,
                emailVerified: 0,
                userPassword: bcrypt.hashSync(password, 12),
                dob: dob,
                gender: user_gender,
            });

            req.session.customer = newCustomer.dataValues.id;
            return res.redirect(200, '/clientes/mi-cuenta');
        } catch (err) {
            console.log('Hubo un error al crear un rol');
            console.log('\n\n' + err + '\n\n');
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(500, '/clientes/registro');
        }
    },

    recover: (req, res) => {
        //res.render('pages/recover');
        res.redirect(301, '/clientes/login');
    },

    account: (req, res) => {
        res.render('pages/customer');
    },
};

module.exports = customerControllers;

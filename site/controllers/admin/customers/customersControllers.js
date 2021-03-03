const bcrypt = require('bcrypt');
const moment = require('moment');
const db = require('../../../database/models');

const customersControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const customer = await db.Customer.findOne({
                where: {
                    id: id,
                },
            });

            delete customer.dataValues.userPassword;
            customer.dataValues.dob = moment(customer.dataValues.dob).format('YYYY-MM-DD');

            return res.render('admin/pages/customers/customers-create', {
                customer: customer.dataValues,
            });
        } catch (err) {
            console.log('Hubo un error al traer el cliente', err);
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            //res.redirect(500, '/admin/employees/crear-rol');
        }
    },
    getAll: async (req, res) => {
        try {
            const allCustomers = await db.Customer.findAll();
            return res.render('admin/pages/customers/customers-list', { allCustomers });
        } catch (err) {
            console.log('Hubo un error al traer los clientes \n\n', err);
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            return res.redirect(301, '/admin/clientes');
        }
    },
    create: (req, res) => {
        return res.render('admin/pages/customers/customers-create');
    },
    created: async (req, res) => {
        const errors = [];
        const { isActive, firstName, lastName, email, userPassword, dob, gender } = req.body;

        try {
            const customer = await db.Customer.create({
                isActive,
                firstName,
                lastName,
                email,
                emailVerified: 0,
                userPassword: bcrypt.hashSync(userPassword, 12),
                dob,
                gender,
            });

            if (customer) {
                console.log('entro al try');
                //return res.redirect(301, '/admin/clientes');
            }
        } catch (err) {
            errors.push('Hubo un error al crear el cliente.');
            console.log('controller', errors);

            return res.render('admin/pages/customers/customers-create', { errors });
        }
    },
    update: async (req, res) => {
        const { id, isActive, firstName, lastName, email, userPassword, dob, gender } = req.body;

        let uCustomerData =
            userPassword.length > 2
                ? {
                      id,
                      isActive,
                      firstName,
                      lastName,
                      email,
                      userPassword: bcrypt.hashSync(userPassword, 12),
                      dob,
                      gender,
                  }
                : { id, isActive, firstName, lastName, email, dob, gender };

        try {
            await db.Customer.update(uCustomerData, {
                where: {
                    id: id,
                },
            });

            return res.redirect(301, `/admin/clientes/${id}`);
        } catch (error) {
            console.log('Hubo un error al actualizar el cliente');
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(500, `/admin/clientes/${id}`);
        }
    },
    delete: async (req, res) => {
        let { id } = req.params;

        try {
            await db.Customer.destroy({
                where: {
                    id: id,
                },
            });

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al borrar un cliente', err);
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            return res.redirect(301, '/admin/clientes');
        }
    },
};

module.exports = customersControllers;

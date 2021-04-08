const bcrypt = require('bcrypt');
const moment = require('moment');
const db = require('../../database/models');
const { validationResult } = require('express-validator');

const errRes = (err) => ({
    status: 500,
    error: String(err),
});

const customerControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            let customer = await db.Customer.findOne({
                where: {
                    id: id,
                },
            });

            customer = customer.dataValues;

            delete customer.userPassword;
            customer.dob = moment(customer.dob).format('YYYY-MM-DD');

            return res.send({
                status: 200,
                statusText: 'OK',
                customer,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    getAll: async (req, res) => {
        try {
            let allCustomers = await db.Customer.findAll();

            allCustomers = allCustomers.map((customer) => {
                customer = customer.dataValues;
                delete customer.userPassword;

                return customer;
            });

            return res.send({
                status: 200,
                statusText: 'OK',
                count: allCustomers.length,
                customers: allCustomers,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    create: async (req, res) => {
        const {
            isActive,
            firstName,
            lastName,
            email,
            emailConfirm,
            userPassword,
            userPasswordConfirm,
            dob,
            gender,
        } = req.body;

        const evErrors = validationResult(req);

        if (!evErrors.isEmpty()) {
            return res.send({
                status: 400,
                error: evErrors,
            });
        }

        if (email !== emailConfirm) {
            return res.send({
                status: 400,
                error: 'Los emails deben ser iguales',
            });
        }

        if (userPassword !== userPasswordConfirm) {
            return res.send({
                status: 400,
                error: 'Las contraseñas deben ser iguales',
            });
        }

        try {
            let customer = await db.Customer.create({
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
                customer = customer.dataValues;
                delete customer.userPassword;

                return res.send({
                    status: 201,
                    statusText: 'Created',
                    customer: customer.dataValues,
                });
            }
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    update: async (req, res) => {
        const { id, isActive, firstName, lastName, email, userPassword, dob, gender } = req.body;

        const evErrors = validationResult(req);

        if (!evErrors.isEmpty()) {
            return res.send({
                status: 400,
                error: evErrors,
            });
        }

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

        console.log(uCustomerData);

        try {
            await db.Customer.update(uCustomerData, {
                where: {
                    id: id,
                },
            });

            return res.send({
                status: 204,
                statusText: 'No Content',
            });
        } catch (err) {
            return res.send(errRes(err));
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

            return res.send({
                status: 204,
                statusText: 'No Content',
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    cartData: async (req, res) => {
        const { id } = req.params;

        let customer = await db.Customer.findOne({
            where: {
                id: id,
            },
        });
        let allProducts = await db.Product.findAll();

        customer = customer.dataValues;

        let customerCart = customer.inCart == null ? [] : JSON.parse(customer.inCart);
        let cartQty = customerCart.reduce((accum, product) => {
            return product.qty + accum;
        }, 0);

        let cartTotal = 0;
        customerCart.forEach((pCart) => {
            allProducts.forEach((product) => {
                if (product.id == pCart.pid) {
                    cartTotal = cartTotal + product.productPrice * pCart.qty;
                }
            });
        });

        return res.send({
            status: 200,
            statusText: 'OK',
            data: {
                cartQty,
                cartTotal,
                algo: 'entre',
            },
        });
    },
};

module.exports = customerControllers;

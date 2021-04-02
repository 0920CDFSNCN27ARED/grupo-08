const db = require('../../database/models');

module.exports = async (req, res, next) => {
    if (!req.session.productsInCart) {
        req.session.productsInCart = [];
    }

    if (req.session.customer) {
        let customer = await db.Customer.findOne({
            where: {
                id: req.session.customer,
            },
        });

        customer = customer.dataValues;

        let customerCart = customer.inCart == null ? [] : JSON.parse(customer.inCart);
        let customerCartNavCounter = customerCart.reduce((accum, product) => {
            return product.qty + accum;
        }, 0);

        res.locals.customerCartNavCounter = customerCartNavCounter;
        req.session.productsInCart = customerCart;
    }

    next();
};

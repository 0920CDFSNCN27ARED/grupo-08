const db = require('../../database/models');

async function withCookiesAuth(req, res, next) {
    // Eventualmente hay que validar en ambos si la propiedad
    // isActive esta en 0 o en 1 para re validar si
    // es un usuario activo o inactivo

    if (req.cookies.cookieCustomer) {
        const customer = await db.Customer.findOne({
            where: { id: req.cookies.cookieCustomer },
        });

        if (customer) {
            req.session.customer = customer.dataValues.id;
        } else {
            delete req.session.customer;
            res.clearCookie('cookieCustomer');
        }
    }

    if (req.cookies.cookieAdminUser) {
        // Tengo que comentar esto porque de momento sigue
        // funcionando con la db en json

        /* const adminUser = await db.AdminUser.findOne({
            where: { id: req.cookies.cookieAdmin },
        });

        if (adminUser) {
            req.session.adminUser = adminUser.dataValues.id;
        } else {
            delete req.session.adminUser;
            res.clearCookie('cookieAdmin');
        }
        */

        req.session.adminUser = req.cookies.cookieAdminUser;
    }

    next();
}

module.exports = withCookiesAuth;

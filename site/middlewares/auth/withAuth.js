const jsonFile = require('../../helpers/jsonFile');
const db = require('../../database/models');

function withAuth(req, res, next) {
    const curURL = req.originalUrl;

    // Si el usuario NO esta en la session
    // y si esta intentando acceder al panel del cliente
    if (!req.session.customer && curURL.indexOf('clientes/mi-cuenta') > -1) {
        delete req.session.customer;
        res.clearCookie('cookieCustomer');

        return res.redirect(301, '/clientes/login');
    }

    // Si el usuario existe en al sesion
    // y si esta intentando loguearse en /clientes/login o /clientes/register
    if (
        req.session.customer &&
        (curURL.indexOf('/clientes/login') > -1 || curURL.indexOf('/clientes/registro') > -1)
    ) {
        return res.redirect(301, '/clientes/mi-cuenta');
    }

    console.log('Withauth MD');
    next();
}

module.exports = withAuth;

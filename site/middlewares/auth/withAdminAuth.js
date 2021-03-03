const jsonFile = require('../../helpers/jsonFile');

function withAdminAuth(req, res, next) {
    const curURL = req.originalUrl;

    /* 
        Si no esta en la sesion y entra a admin/user/login
        si no esta en la sesion y entra a otra parte del admin
        Si tiene sesion y entra en admin/user/login
    */

    if (!req.session.adminUser && curURL.indexOf('/admin/user/login') > -1) {
        next();
        return res.end();
    }

    if (!req.session.adminUser && curURL.indexOf('/admin') > -1) {
        return res.redirect(301, '/admin/user/login');
    }

    if (
        req.session.adminUser &&
        (curURL.indexOf('/admin/user/login') > -1 || curURL.indexOf('/admin/user/register') > -1)
    ) {
        return res.redirect(301, '/admin');
    }

    console.log('Paso por adminAuth MD');
    next();
}

module.exports = withAdminAuth;

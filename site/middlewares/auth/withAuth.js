const jsonFile = require("../../helpers/jsonFile");

function withAuth (req, res, next) {
    const customerSession = req.session.customerID;
    const customerCookies = 
        (req.cookies !== undefined && req.cookies.customerRememberMe)
            ? req.cookies.customerRememberMe
            : undefined;
    const customerLogged = (customerSession || customerCookies) ? true : false;

    if(!customerLogged) return res.redirect(301, '/clientes/login');

    const allCustomers = jsonFile.read('../db/customers.json');
    const curCustomer = allCustomers.find(customer => (customer.id == customerSession || customer.id == customerCookies));

    if(curCustomer === undefined) {
        delete req.session.customerID;
        return res.redirect(301, '/clientes/login');
    }

    req.session.customerID = curCustomer.id;
    res.locals.curCustomer = curCustomer;

    next();
}

module.exports = withAuth;
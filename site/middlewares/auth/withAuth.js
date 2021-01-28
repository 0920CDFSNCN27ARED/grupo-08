const jsonFile = require("../../helpers/jsonFile");

function withAuth (req, res, next) {
    if(!req.session.customer) return res.redirect('/clientes/login');

    const id = req.session.customer;
    const allCustomers = jsonFile.read('../db/customers.json');

    const loggedCustomer = allCustomers.find(customer => customer.id == id);

    if(!loggedCustomer) (
        delete req.session.customer,
        next()
    )

    req.session.customerData = loggedCustomer;
    next();
}

module.exports = withAuth;
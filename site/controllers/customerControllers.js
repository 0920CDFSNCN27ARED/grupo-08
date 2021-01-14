const customerControllers = {
    login: (req, res) => {
        res.render('pages/login');
    },

    register: (req, res) => {
        res.render('pages/register');
    },
    recover: (req, res) => {
        res.render('pages/recover');
    },
};

module.exports = customerControllers;

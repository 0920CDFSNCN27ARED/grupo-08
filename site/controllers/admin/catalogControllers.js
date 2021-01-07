const catalogControllers = {
    getAll: (req, res, next) => {
        res.render('admin/pages/products-list');
    },
    create: (req, res) => {
        res.render('admin/pages/products-create');
    },
    created: (req, res) => {
        /* console.log(1);
        console.log(req); */

        console.log('fin');
        console.log('----------------------------');
    },
};

module.exports = catalogControllers;

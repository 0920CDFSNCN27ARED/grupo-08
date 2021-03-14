const jsonFile = require('../helpers/jsonFile');
const returnCategoriesFormated = require('../helpers/returnCategoriesFormated');
const db = require('../database/models');

const mainControllers = {
    index: async (req, res) => {
        res.render('pages/index');
    },

    notFound: (req, res) => {
        res.send('404');
    },
};

module.exports = mainControllers;

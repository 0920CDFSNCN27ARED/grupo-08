const readJsonFile = require('../helpers/readJsonFile');
const returnCategoriesFormated = require('../helpers/returnCategoriesFormated');

const mainControllers = {
    index: (req, res) => {
        const allCategories = readJsonFile('../db/categories.json');

        res.render('pages/index', {
            categories: returnCategoriesFormated.asHTMLfront(allCategories, '/c/categoria'),
        });
    },

    notFound: (req, res) => {
        res.send('404');
    },
};

module.exports = mainControllers;

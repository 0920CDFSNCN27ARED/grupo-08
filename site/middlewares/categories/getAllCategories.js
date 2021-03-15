const db = require('../../database/models');
const returnCategoriesFormated = require('../../helpers/returnCategoriesFormated');

module.exports = async (req, res, next) => {
    const categories = await db.Category.findAll();
    const allCategories = categories.map((cat) => cat.dataValues);

    const formatedCategories = returnCategoriesFormated.asHTMLfront(allCategories, '/c/categoria');

    res.locals.formatedCategories = formatedCategories;

    next();
};

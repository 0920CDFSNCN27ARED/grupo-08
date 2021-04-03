const returnCategoriesFormated = require('../../helpers/returnCategoriesFormated');
const db = require('../../database/models');

const errRes = (err) => ({
    status: 500,
    error: String(err),
});

const categoriesControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            let category = await db.Category.findOne({
                where: { id: id },
            });

            if (!category) {
                return res.send({
                    status: 404,
                    statusText: 'Not Found',
                });
            }

            let allProducts = await db.Product.findAll({
                include: ['sizeTable', 'color', 'brand'],
            });

            let productsInCategory = allProducts.filter((product) => {
                let pCategories = product.dataValues.categories.split(',');

                if (pCategories.indexOf(id) > -1) {
                    return product;
                }
            });

            return res.send({
                status: 200,
                statusText: 'OK',
                category,
                productsCount: productsInCategory.length,
                products: productsInCategory,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    getAll: async (req, res) => {
        try {
            const brands = await db.Brand.findAll();

            return res.send({
                status: 200,
                statusText: 'OK',
                count: brands.length,
                brands,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    create: async (req, res) => {
        const {
            status,
            showMenu,
            categoryName,
            pageTitle,
            metaDescription,
            metaKeywords,
            imagenes,
        } = req.body;

        try {
            const category = await db.Category.create({
                isActive: Number(status),
                showMenu: Number(showMenu),
                categoryName: categoryName,
                pageTitle: pageTitle,
                metaDescription: metaDescription,
                metaKeyWords: metaKeywords,
                parentCategory: '0',
                subCategories: '',
            });

            return res.send({
                status: 201,
                statusText: 'Created',
                category: category,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    update: async (req, res) => {
        const {
            id,
            status,
            showMenu,
            categoryName,
            pageTitle,
            metaDescription,
            metaKeywords,
            imagenes,
        } = req.body;

        try {
            await db.Category.update(
                {
                    id: id,
                    isActive: Number(status),
                    showMenu: Number(showMenu),
                    categoryName: categoryName,
                    pageTitle: pageTitle,
                    metaDescription: metaDescription,
                    metaKeyWords: metaKeywords,
                },
                {
                    where: { id: id },
                }
            );

            return res.send({
                status: 204,
                statusText: 'No Content',
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    delete: async (req, res) => {
        let { id } = req.params;

        try {
            let allProducts = await db.Product.findAll();

            let hasProducts = allProducts.filter((prod) => {
                let pCategoriesIds = prod.dataValues.categories.split(',');

                if (pCategoriesIds.indexOf(id) > -1) {
                    return prod;
                }
            });

            if (hasProducts && hasProducts.length == 0) {
                await db.Category.destroy({
                    where: {
                        id: id,
                    },
                });
                return res.send({
                    status: 204,
                    statusText: 'No Content',
                });
            } else {
                return res.send({
                    status: 406,
                    statusText: 'Not Acceptable',
                    message: 'Can not remove the current category because it has products in it',
                });
            }
        } catch (err) {
            return res.send(errRes(err));
        }
    },
};

module.exports = categoriesControllers;

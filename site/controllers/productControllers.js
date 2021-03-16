const formatString = require('../helpers/formatString');
const jsonFile = require('../helpers/jsonFile');
const returnCategoriesFormated = require('../helpers/returnCategoriesFormated');
const db = require('../database/models');

const productControllers = {
    gallery: async (req, res) => {
        const _catName = req.params.categoria;

        try {
            let category = await db.Category.findOne({
                where: {
                    categoryName: _catName,
                },
            });

            if (category === undefined) {
                return res.send({ status: 404, msg: 'categoria no encontrada' });
            }
            category = category.dataValues;
            category.__pageTitle = category.pageTitle;

            let catID = category.id;

            let products = await db.Product.findAll({
                where: { categories: catID },
            });

            products = products.map((product) => product.dataValues);

            return res.render('pages/products_gallery', {
                category,
                products,
            });
        } catch (err) {
            console.log('Hubo un error al traer la categoria --> ', err);
            return res.redirect(301, '/');
        }
    },

    details: async (req, res) => {
        const { pname, sku } = req.params;

        /* const allCategories = jsonFile.read('../db/categories.json');
        const allProducts = jsonFile.read('../db/products.json');

        // Loopeo todos los productos y los asigno a una variable
        let productToShow = allProducts.find((prod) => prod.sku_visible == sku);

        if (productToShow === undefined) res.send({ status: 404, msg: 'Producto no encontrado' });

        res.render('pages/product_details', {
            categories: returnCategoriesFormated.asHTMLfront(allCategories, '/c/categoria'),
            product: productToShow,
        }); */

        try {
            let product = await db.Product.findOne({
                where: {
                    sku: sku,
                },
            });

            if (product === undefined || formatString(product.dataValues.productName) !== pname) {
                return res.redirect(301, '/');
            }

            product = product.dataValues;

            res.render('pages/product_details', {
                product,
            });
        } catch (err) {
            console.log('Hubo un error al traer el producto ' + pname, err);
            return res.redirect(301, '/');
        }
    },
};

module.exports = productControllers;

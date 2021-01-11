const formatString = require('../helpers/formatString');
const readJsonFile = require('../helpers/readJsonFile');
const returnCategoriesFormated = require('../helpers/returnCategoriesFormated');

const productControllers = {
    gallery: (req, res) => {
        const _catName = req.params.categoria;

        const allCategories = readJsonFile('../db/categories.json');
        const allProducts = readJsonFile('../db/products.json');

        const _catObj = allCategories.find((cat) => {
            if (formatString(cat.name) == _catName) {
                return cat;
            }
        });

        // Si no encuentra la categoria devuelvo 404
        if (_catObj === undefined) res.send({ status: 404, msg: 'Categoria no encontrada' });

        // Busco todos los productos que contengan la categoria
        let productsToShow = [];

        // Loopeo todos los productos y los asigno a una variable
        allProducts.forEach((prods) => {
            prods.categorias.forEach((cat) => {
                if (cat == _catObj.id) {
                    productsToShow.push(prods);
                }
            });
        });

        res.render('pages/products_gallery', {
            categories: returnCategoriesFormated.asHTMLfront(allCategories, '/c/categoria'),
            category: _catObj,
            products: productsToShow,
        });
    },

    details: (req, res) => {
        const { sku } = req.params;

        const allCategories = readJsonFile('../db/categories.json');
        const allProducts = readJsonFile('../db/products.json');

        // Loopeo todos los productos y los asigno a una variable
        let productToShow = allProducts.find((prod) => prod.sku_visible == sku);

        if (productToShow === undefined) res.send({ status: 404, msg: 'Producto no encontrado' });

        res.render('pages/product_details', {
            categories: returnCategoriesFormated.asHTMLfront(allCategories, '/c/categoria'),
            product: productToShow,
        });
    },
};

module.exports = productControllers;

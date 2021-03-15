const jsonFile = require('../../helpers/jsonFile');
const db = require('../../database/models');
const stringToArray = require('../../helpers/stringToArray');

const productsControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            // Busco el id en los productos
            let product = await db.Product.findOne({
                where: {
                    id: id,
                },
            });

            if (product == undefined) {
                return res.status(400).send({
                    msg: 'El producto no ha sido encontrado',
                });
            }

            const sizeTables = await db.SizeTable.findAll();
            const brands = await db.Brand.findAll();
            const colors = await db.Color.findAll();
            const categories = await db.Category.findAll();

            const allSizeTables = sizeTables.map((table) => ({
                name: table.dataValues.tableName,
                value: table.dataValues.id,
                sizes: table.dataValues.sizes,
            }));

            const allBrands = brands.map((brand) => ({
                name: brand.dataValues.brandName,
                value: brand.dataValues.id,
            }));
            const allColors = colors.map((color) => ({
                name: color.dataValues.colorName,
                value: color.dataValues.id,
            }));
            const allCategories = categories.map((category) => category.dataValues);

            return res.render('admin/pages/products/products-create', {
                product,
                categories: allCategories,
                sizeTables: allSizeTables,
                brands: allBrands,
                colors: allColors,
            });
        } catch (err) {
            console.log('Hubo un error al traer un producto o las categorias', err);
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(500, 'admin/pages/products');
        }
    },
    getAll: async (req, res) => {
        try {
            const allProducts = await db.Product.findAll();
            const handleTotalStock = (arr) => {
                return arr.reduce((a, b) => {
                    [a, b] = [parseInt(a), parseInt(b)];
                    return a + b;
                });
            };

            function handleProductsArr(arr) {
                const handledProducts = [];
                arr.forEach((prod) => {
                    handledProducts.push({
                        image: prod.images,
                        id: prod.id,
                        sku: prod.sku,
                        name: prod.productName,
                        price: prod.productPrice,
                        special_price: prod.productPriceSpecial,
                        stock: 1,
                        status: prod.isActive,
                    });
                });

                return handledProducts;
            }

            return res.render('admin/pages/products/products-list', {
                products: handleProductsArr(allProducts),
            });
        } catch (err) {
            console.log('Hubo un error al traer los productos', err);
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(500, 'admin/pages/products');
        }
    },
    create: async (req, res) => {
        try {
            const sizeTables = await db.SizeTable.findAll();
            const brands = await db.Brand.findAll();
            const colors = await db.Color.findAll();
            const categories = await db.Category.findAll();

            const allSizeTables = sizeTables.map((table) => ({
                name: table.dataValues.tableName,
                value: table.dataValues.id,
                sizes: table.dataValues.sizes,
            }));

            const allBrands = brands.map((brand) => ({
                name: brand.dataValues.brandName,
                value: brand.dataValues.id,
            }));
            const allColors = colors.map((color) => ({
                name: color.dataValues.colorName,
                value: color.dataValues.id,
            }));
            const allCategories = categories.map((category) => category.dataValues);

            return res.render('admin/pages/products/products-create', {
                categories: allCategories,
                sizeTables: allSizeTables,
                brands: allBrands,
                colors: allColors,
            });

            //
        } catch (err) {
            console.log('Hubo un error al traer un producto o las categorias', err);
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(500, 'admin/pages/products');
        }
    },
    created: async (req, res) => {
        const handleImages = (obj) => {
            let arrImagesNames = [];

            let images = obj;
            images.forEach((image) => {
                let originalName = image.originalname;
                arrImagesNames.push(`/${originalName[0]}/${originalName[1]}/${originalName}`);
            });

            return arrImagesNames.join(', ');
        };

        let {
            isActive,
            sizeTableId,
            brandId,
            productName,
            sku,
            productPrice,
            productPriceSpecial,
            productPriceSpecialFrom,
            productPriceSpecialTo,
            shortDescription,
            composition,
            care,
            colorId,
            stock,
            categories,
        } = req.body;

        stock = stock.join(',');

        if (typeof categories == 'object' || typeof categories == 'array')
            categories = categories.join(',');

        if (typeof productPriceSpecial == 'string' && productPriceSpecial === '')
            productPriceSpecial = null;

        let images = handleImages(req.files);

        try {
            db.Product.create({
                sizeTableId,
                brandId,
                colorId,
                isActive,
                productName,
                sku,
                productPrice,
                productPriceSpecial,
                productPriceSpecialFrom,
                productPriceSpecialTo,
                shortDescription,
                composition,
                care,
                stock,
                categories,
                images,
            });

            return res.send({
                status: 200,
                msg: 'ok',
            });
        } catch (err) {
            console.log('Hubo un error de base de datos', err);

            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';

            res.send({
                status: 301,
                statusText: 'error',
                msg: err,
            });
        }
    },
    update: async (req, res) => {
        const handleImages = (obj) => {
            let arrImagesNames = [];

            let images = obj;
            images.forEach((image) => {
                let originalName = image.originalname;
                arrImagesNames.push(`/${originalName[0]}/${originalName[1]}/${originalName}`);
            });

            return arrImagesNames.join(', ');
        };

        let {
            id,
            isActive,
            sizeTableId,
            brandId,
            productName,
            sku,
            productPrice,
            productPriceSpecial,
            productPriceSpecialFrom,
            productPriceSpecialTo,
            shortDescription,
            composition,
            care,
            colorId,
            stock,
            categories,
        } = req.body;

        stock = stock.join(',');

        if (typeof categories == 'object' || typeof categories == 'array')
            categories = categories.join(',');

        if (typeof productPriceSpecial == 'string' && productPriceSpecial === '')
            productPriceSpecial = null;

        let images = handleImages(req.files);

        try {
            await db.Product.update(
                {
                    id,
                    isActive,
                    sizeTableId,
                    brandId,
                    productName,
                    sku,
                    productPrice,
                    productPriceSpecial,
                    productPriceSpecialFrom,
                    productPriceSpecialTo,
                    shortDescription,
                    composition,
                    care,
                    colorId,
                    stock,
                    categories,
                },
                {
                    where: { id: id },
                }
            );

            return res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al actualizar la marca --> ', err);
            return res.redirect('/admin/?error_al_actualizar_marca_' + id);
        }
    },
    delete: async (req, res) => {
        let { id } = req.params;

        try {
            await db.Product.destroy({
                where: {
                    id: id,
                },
            });
            res.send({ status: 200 });
        } catch (err) {
            console.log('Hubo un error al borrar el producto --> ', err);
            return res.redirect('/admin/?error_al_borrar_producto_' + id);
        }
    },
};

module.exports = productsControllers;

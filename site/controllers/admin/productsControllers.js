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
            const allSizeTables = await db.SizeTable.findAll();
            const allCategories = await db.Category.findAll();

            product.categories = stringToArray(product.categories);

            return res.render('admin/pages/products/products-create', {
                product,
                categories: allCategories,
                sizeTables: allSizeTables,
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
            console.log(allProducts);

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
            const allCategories = await db.Category.findAll();
            const allSizeTables = await db.SizeTable.findAll();
            const allColors = await db.Color.findAll();
            console.log(allColors);

            const sizeTablesFormated = [];
            allSizeTables.forEach((table) => {
                const tableArr = {
                    name: table.dataValues.tableName,
                    value: table.dataValues.id,
                };
                sizeTablesFormated.push(tableArr);
            });

            allCategories.forEach((category) => {
                category.dataValues.subCategories = stringToArray(
                    category.dataValues.subCategories
                );
            });

            return res.render('admin/pages/products/products-create', {
                categories: allCategories,
                sizeTables: sizeTablesFormated,
            });
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
                console.log(`/${originalName[0]}/${originalName[1]}/${originalName}`);
                arrImagesNames.push(`/${originalName[0]}/${originalName[1]}/${originalName}`);
            });

            return arrImagesNames;
        };

        try {
            console.log(req.body);
            db.Product.create({
                sizeTableId: req.body.sizeTableId ? req.body.sizeTableId : '',
                brandId: req.body.brandId ? req.body.brandId : 99,
                colorId: req.body.colorId ? req.body.colorId : 99,
                isActive: req.body.isActive ? req.body.isActive : '',
                productName: req.body.productName ? req.body.productName : '',
                sku: req.body.sku ? req.body.sku : '',
                productPrice: req.body.productPrice ? req.body.productPrice : '',
                productPriceSpecial: req.body.productPriceSpecial
                    ? req.body.productPriceSpecial
                    : '',
                productsGroup: req.body.productsGroup ? req.body.productsGroup : '',
                productPriceSpecialFrom: req.body.productPriceSpecialFrom
                    ? req.body.productPriceSpecialFrom
                    : '',
                productPriceSpecialTo: req.body.productPriceSpecialTo
                    ? req.body.productPriceSpecialTo
                    : '',
                shortDescription: req.body.shortDescription ? req.body.shortDescription : '',
                composition: req.body.composition ? req.body.composition : '',
                care: req.body.care ? req.body.care : '',
                images: req.body.images ? req.body.images : '',
                stock: req.body.stock ? req.body.stock : '',
                categories: req.body.categories ? req.body.categories : '',
            });
            console.log('fin del try');
            /* return res.send({
                status: 200,
                msg: 'ok',
            }); */
        } catch (err) {
            console.log('Hubo un error de base de datos', err);

            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            //res.redirect(500, 'admin/pages/products');

            /* res.send({
                status: 500,
                statusText: 'error',
                msg: err,
            }); */

            console.log('fin del catch');
        }
    },
    update: (req, res) => {
        let allProducts = jsonFile.read('../db/products.json');
        let {
            id,
            status,
            tipo_de_producto,
            tabla_de_talles,
            marca,
            product_name,
            sku_visible,
            product_price,
            product_price_special,
            product_price_special_desde,
            product_price_special_hasta,
            descripcion_corta,
            composicion,
            cuidado,
            agregar_color,
            stock_talles,
            categorias,
        } = req.body;

        allProducts.forEach((prod, i) => {
            if (prod.id == id) {
                prod.status = prod.status == status ? prod.status : status;
                prod.tipo_de_producto =
                    prod.tipo_de_producto == tipo_de_producto
                        ? prod.tipo_de_producto
                        : tipo_de_producto;
                prod.tabla_de_talles =
                    prod.tabla_de_talles == tabla_de_talles
                        ? prod.tabla_de_talles
                        : tabla_de_talles;
                prod.marca = prod.marca == marca ? prod.marca : marca;
                prod.product_name =
                    prod.product_name == product_name ? prod.product_name : product_name;
                prod.sku_visible = prod.sku_visible == sku_visible ? prod.sku_visible : sku_visible;
                prod.product_price =
                    prod.product_price == product_price ? prod.product_price : product_price;
                prod.product_price_special =
                    prod.product_price_special == product_price_special
                        ? prod.product_price_special
                        : product_price_special;
                prod.product_price_special_desde =
                    prod.product_price_special_desde == product_price_special_desde
                        ? prod.product_price_special_desde
                        : product_price_special_desde;
                prod.product_price_special_hasta =
                    prod.product_price_special_hasta == product_price_special_hasta
                        ? prod.product_price_special_hasta
                        : product_price_special_hasta;
                prod.descripcion_corta =
                    prod.descripcion_corta == descripcion_corta
                        ? prod.descripcion_corta
                        : descripcion_corta;
                prod.composicion = prod.composicion == composicion ? prod.composicion : composicion;
                prod.cuidado = prod.cuidado == cuidado ? prod.cuidado : cuidado;
                prod.color = prod.color == agregar_color ? prod.color : agregar_color;
                prod.stock_talles =
                    prod.stock_talles == stock_talles ? prod.stock_talles : stock_talles;
                prod.categorias = prod.categorias == categorias ? prod.categorias : [...categorias];
            }
        });

        jsonFile.write(allProducts, '../db/products.json');
        res.send({
            status: 200,
        });
    },
    delete: (req, res) => {
        let { id } = req.params;
        let allProducts = jsonFile.read('../db/products.json');
        let productsUpdated = allProducts.filter((prod, i) => prod.id != id);

        jsonFile.write(productsUpdated, '../db/products.json');
        res.send({
            status: 200,
        });
    },
};

module.exports = productsControllers;

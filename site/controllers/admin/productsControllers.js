const jsonFile = require('../../helpers/jsonFile');
const db = require('../../database/models');
const stringToArray = require('../../helpers/stringToArray');

const productsControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const allCategories = await db.Category.findAll();

            // Busco el id en los productos
            let product = await db.Producto.findOne({
                where: {
                    id: id,
                },
            });

            if (product == undefined) {
                return res.status(400).send({
                    msg: 'El producto no ha sido encontrado',
                });
            }

            product.categories = stringToArray(product.categories);
            console.log(allCategories);

            return res.render('admin/pages/products/products-create', {
                product,
                categories: allCategories,
            });
        } catch (err) {
            console.log('Hubo un error al traer un producto o las categorias');
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
                        image: prod.imagenes[0],
                        id: prod.id,
                        sku: prod.sku_visible,
                        name: prod.product_name,
                        price: prod.product_price,
                        special_price: prod.product_price_special,
                        stock: handleTotalStock(prod.stock_talles),
                        status: prod.status,
                    });
                });

                return handledProducts;
            }

            return res.render('admin/pages/products/products-list', {
                products: handleProductsArr(allProducts),
            });
        } catch (err) {
            console.log('Hubo un error al traer los productos');
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(500, 'admin/pages/products');
        }
    },
    create: async (req, res) => {
        try {
            const allCategories = await db.Category.findAll();
            const allSizeTables = await db.SizeTable.findAll();

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
        console.log(req.body);
        console.log('\n\n');
        console.log(req.files);
        console.log('\n\n');
        return;
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
            db.Product.create({
                sizeTableId: req.body.tabla_de_talles ? req.body.tabla_de_talles : '',
                brandId: req.body.marca ? req.body.marca : '',
                colorId: req.body.agregar_color ? req.body.agregar_color : '',
                isActive: req.body.status ? req.body.status : '',
                productName: req.body.product_name ? req.body.product_name : '',
                sku: req.body.sku_visible ? req.body.sku_visible : '',
                productPrice: req.body.product_price ? req.body.product_price : 0,
                productPriceSpecial: req.body.product_price_special
                    ? req.body.product_price_special
                    : 0,

                tipo_de_producto: req.body.tipo_de_producto ? req.body.tipo_de_producto : '',

                product_price_special_desde: req.body.product_price_special_desde
                    ? req.body.product_price_special_desde
                    : '',
                product_price_special_hasta: req.body.product_price_special_hasta
                    ? req.body.product_price_special_hasta
                    : '',
                descripcion_corta: req.body.descripcion_corta ? req.body.descripcion_corta : '',
                composicion: req.body.composicion ? req.body.composicion : '',
                cuidado: req.body.cuidado ? req.body.cuidado : '',

                stock_talles: req.body.stock_talles ? req.body.stock_talles : [],
                categorias: req.body.categorias ? [...req.body.categorias] : [],
                imagenes: handleImages(req.files) ? handleImages(req.files) : [],
            });
        } catch (err) {
            console.log('Hubo un error de base de datos');
            res.locals.queryErr = 'Hubo un problema! Por favor refresca la página';
            res.redirect(500, 'admin/pages/products');
        }

        const product = {
            id: Date.now(),
            status: req.body.status ? req.body.status : '',
            tipo_de_producto: req.body.tipo_de_producto ? req.body.tipo_de_producto : '',
            tabla_de_talles: req.body.tabla_de_talles ? req.body.tabla_de_talles : '',
            marca: req.body.marca ? req.body.marca : '',
            product_name: req.body.product_name ? req.body.product_name : '',
            sku_visible: req.body.sku_visible ? req.body.sku_visible : '',
            product_price: req.body.product_price ? req.body.product_price : 0,
            product_price_special: req.body.product_price_special
                ? req.body.product_price_special
                : 0,
            product_price_special_desde: req.body.product_price_special_desde
                ? req.body.product_price_special_desde
                : '',
            product_price_special_hasta: req.body.product_price_special_hasta
                ? req.body.product_price_special_hasta
                : '',
            descripcion_corta: req.body.descripcion_corta ? req.body.descripcion_corta : '',
            composicion: req.body.composicion ? req.body.composicion : '',
            cuidado: req.body.cuidado ? req.body.cuidado : '',
            color: req.body.agregar_color ? req.body.agregar_color : '',
            stock_talles: req.body.stock_talles ? req.body.stock_talles : [],
            categorias: req.body.categorias ? [...req.body.categorias] : [],
            imagenes: handleImages(req.files) ? handleImages(req.files) : [],
        };

        /* let mockProd = {
            id: Date.now(),
            status: 'habilitado',
            tipo_de_producto: 'remeras',
            tabla_de_talles: 'tabla_talles_xxs_al_xxl',
            marca: 'zara',
            product_name: 'Remera hombre mickey',
            sku_visible: 'zara-remeras-remera_hombre_mickey',
            product_price: '22',
            product_price_special: '11',
            product_price_special_desde: '2021:01:10 00:00:00',
            product_price_special_hasta: '2021:01:18 23:59:59',
            descripcion_corta: 'Esto es una descripcion corta',
            composicion: 'Esta es la composicion',
            cuidado: 'Estos son los cuidados a tener',
            agregar_color: '',
            stock_talles: ['3', '2', '0', '2', '2', '0', '2']
            categorias: ['Eshop', 'coleccionss21', 'remeras'],
            imagenes: handleImages(req.files),
        }; */

        // Traigo los productos
        const allProducts = jsonFile.read('../db/products.json');

        // pusheo el producto
        allProducts.push(product);

        // Guardo todos los productos
        jsonFile.write(allProducts, '../db/products.json');
        //res.redirect(200, '/');
        res.send({ status: 200 });
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
        res.send({ status: 200 });
    },
    delete: (req, res) => {
        let { id } = req.params;
        let allProducts = jsonFile.read('../db/products.json');
        let productsUpdated = allProducts.filter((prod, i) => prod.id != id);

        jsonFile.write(productsUpdated, '../db/products.json');
        res.send({ status: 200 });
    },
};

module.exports = productsControllers;

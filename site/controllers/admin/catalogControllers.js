const writeJsonFile = require('../../helpers/writeJsonFile');
const readJsonFile = require('../../helpers/readJsonFile');

const catalogControllers = {
    getAll: (req, res, next) => {
        res.render('admin/pages/products-list');
    },
    create: (req, res) => {
        res.render('admin/pages/products-create');
    },
    created: (req, res) => {
        console.log('==========================================');
        console.log('==========================================');

        const handleImages = (obj) => {
            let arrImagesNames = [];

            let images = obj;
            images.forEach((image) => {
                let originalName = image.originalname;
                arrImagesNames.push(`/${originalName[0]}/${originalName[1]}/${originalName}`);
            });

            return arrImagesNames;
        };

        const product = {
            is_active: req.body.is_active ? req.body.is_active : '',
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
            stock_talles: req.body.stock_talle ? req.body.stock_talle : [],
            categorias: req.body.categorias ? req.body.categorias : [],
            imagenes: handleImages(req.files) ? handleImages(req.files) : [],
        };

        /* let mockProd = {
            id: Date.now(),
            is_active: 'habilitado',
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
            categorias: ['Eshop', 'coleccionss21', 'remeras'],
            imagenes: handleImages(req.files),
        }; */

        // Traigo los productos
        const allProducts = readJsonFile('../db/producs.json');

        // pusheo el producto
        allProducts.push(product);

        // Guardo todos los productos
        writeJsonFile(allProducts, '../db/producs.json');
        //res.redirect(200, '/');
        res.send({ status: 200 });
    },
};

module.exports = catalogControllers;

const writeJsonFile = require('../../helpers/writeJsonFile');
const readJsonFile = require('../../helpers/readJsonFile');

const catalogControllers = {
    getOne: (req, res) => {
        const { id } = req.params;

        // Busco el id en los productos
        let product, allProducts;
        allProducts = readJsonFile('../db/producs.json');
        product = allProducts.find((prod) => prod.id == id);

        if (product == undefined) {
            return res.status(400).send({
                msg: 'El producto no ha sido encontrado',
            });
        }

        res.render('admin/pages/products-create', { product });
    },
    getAll: (req, res) => {
        const allProducts = readJsonFile('../db/producs.json');
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

        res.render('admin/pages/products-list', { products: handleProductsArr(allProducts) });
    },
    create: (req, res) => {
        res.render('admin/pages/products-create');
    },
    created: (req, res) => {
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
            categorias: req.body.categorias ? req.body.categorias : [],
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
        const allProducts = readJsonFile('../db/producs.json');

        // pusheo el producto
        allProducts.push(product);

        // Guardo todos los productos
        writeJsonFile(allProducts, '../db/producs.json');
        //res.redirect(200, '/');
        res.send({ status: 200 });
    },
    update: (req, res) => {
        let allProducts = readJsonFile('../db/producs.json');
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
                prod.categorias = prod.categorias == categorias ? prod.categorias : categorias;
            }
        });

        writeJsonFile(allProducts, '../db/producs.json');
        res.send({ status: 200 });
    },
    delete: (req, res) => {
        let { id } = req.params;
        let allProducts = readJsonFile('../db/producs.json');
        let productsUpdated = allProducts.filter((prod, i) => prod.id != id);

        writeJsonFile(productsUpdated, '../db/producs.json');
        res.send({ status: 200 });
    },
};

module.exports = catalogControllers;

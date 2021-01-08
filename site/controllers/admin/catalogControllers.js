const catalogControllers = {
    getAll: (req, res, next) => {
        res.render('admin/pages/products-list');
    },
    create: (req, res) => {
        res.render('admin/pages/products-create');
    },
    created: (req, res) => {
        console.log('controller', req);

        const product = {
            is_active: req.body.is_active,
            tipo_de_producto: req.body.tipo_de_producto,
            tabla_de_talles: req.body.tabla_de_talles,
            marca: req.body.marca,
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_price_special: req.body.product_price_special,
            product_price_special_desde: req.body.product_price_special_desde,
            product_price_special_hasta: req.body.product_price_special_hasta,
            descripcion_corta: req.body.descripcion_corta,
            composicion: req.body.composicion,
            cuidado: req.body.cuidado,
            color: req.body.agregar_color,
            stock_talle: {
                stock_for_prenda_sup_xxs: req.body.stock_for_prenda_sup_xxs,
                stock_for_prenda_sup_xs: req.body.stock_for_prenda_sup_xs,
                stock_for_prenda_sup_s: req.body.stock_for_prenda_sup_s,
                stock_for_prenda_sup_m: req.body.stock_for_prenda_sup_m,
                stock_for_prenda_sup_l: req.body.stock_for_prenda_sup_l,
                stock_for_prenda_sup_xl: req.body.stock_for_prenda_sup_xl,
                stock_for_prenda_sup_xxl: req.body.stock_for_prenda_sup_xxl,
                stock_for_prenda_sup_xxl: req.body.stock_for_prenda_sup_xxl,
            },
            categorias: {},
        };

        console.log('fin');
        console.log('----------------------------');
    },
};

module.exports = catalogControllers;

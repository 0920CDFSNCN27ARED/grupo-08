const galleryOptions = {
    pageTitle: 'Nombre galeria',
    pageDescription:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora nulla perferendis quae soluta reprehenderit fugit, quasi harum at ratione, illo, nisi dolor molestiae! Incidunt fugit id asperiores vitae totam officiis?',
};

const productControllers = {
    gallery: (req, res) => {
        res.render('pages/products_gallery', galleryOptions);
    },

    details: (req, res) => {
        res.render('pages/product_details');
    },

    showCreate: (req, res) => {
        res.render('pages/product_create');
    },

    create: (req, res, next) => {
        const products = getProducts();
        const lastProductIndex = products.length - 1;
        const lastProduct = products[lastProductIndex];
        const newId = lastProduct.product_id + 1;
        const images = [];
        for (let i = 0; i < req.files.length; i++) {
            req.files[i].filename.push(images);
        }

        const product = {
            product_id: newId,
            title: req.body.title,
            colors: req.body.colors,
            category: req.body.category,
            subcategory: req.body.subcategory,
            price: req.body.price,
            discount: req.body.discount,
            images: images,
            sizes: req.body.sizes,
        };

        saveProducts(products.push(product));

        res.redirect(`pages/c/producto/${newId}`);
    },

    showEdit: (req, res) => {
        res.render('pages/product_edit');
    },

    edit: (req, res) => {
        res.render('pages/product_edit');
    },

    delete: (req, res) => {
        res.render('pages/product_edit');
    },
};

module.exports = productControllers;

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
};

module.exports = productControllers;

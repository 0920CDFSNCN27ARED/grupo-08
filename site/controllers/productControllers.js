const productControllers = {
    gallery: (req, res) => {
        res.render('pages/products_gallery');
    },

    details: (req, res) => {
        res.render('pages/product_details');
    },
};

module.exports = productControllers;

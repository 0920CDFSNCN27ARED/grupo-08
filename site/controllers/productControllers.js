const productControllers = {
    gallery: (req, res) => {
        res.render('products_gallery');
    },

    details: (req, res) => {
        res.render('product_details');
    },
};

module.exports = productControllers;

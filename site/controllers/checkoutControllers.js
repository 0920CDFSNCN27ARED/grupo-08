const db = require('../database/models');
const formatString = require('../helpers/formatString');

const checkoutControllers = {
    cart: async (req, res) => {
        try {
            // Esta horrible
            // Arreglar otro dia
            let inCartCustomer = null;
            let cartProductsFormated = [];

            if (req.session.customer) {
                let customer = await db.Customer.findOne({
                    where: {
                        id: req.session.customer,
                    },
                });

                inCartCustomer = customer.inCart == null ? [] : JSON.parse(customer.inCart);
            } else {
                // Si en la session no existe el cliente
                inCartCustomer = req.session.productsInCart;
            }

            if (inCartCustomer && inCartCustomer.length < 1) {
                return res.render('pages/cart', {
                    cartProductsFormated,
                });
            }

            let allProducts = await db.Product.findAll({
                include: ['sizeTable', 'color'],
            });

            for (let i = 0; i < inCartCustomer.length; i++) {
                let item = inCartCustomer[i];

                for (let z = 0; z < allProducts.length; z++) {
                    let product = allProducts[z].dataValues;

                    if (item.pid == product.id) {
                        item.selectedSize = item.selectedSize.split('-')[1];
                        product.productPrice = Math.round(product.productPrice);

                        cartProductsFormated.push({
                            id: product.id,
                            name: product.productName,
                            color: product.color.dataValues.colorName,
                            image: product.images.split(',')[0],
                            size: item.selectedSize,
                            qty: item.qty,
                            price: product.productPrice,
                            priceTotal: product.productPrice * item.qty,
                        });
                    }
                }
            }

            /* console.log('\n\n\n');
            console.log('\n\n\n'); */

            return res.render('pages/cart', {
                cartProductsFormated,
                customerId: req.session.customer,
            });
        } catch (err) {
            console.log('lenny error -> ', err);
        }
    },
    addToCart: async (req, res) => {
        const { productId, selectedSize } = req.body;

        try {
            let product = await db.Product.findOne({
                where: {
                    id: productId,
                },
                include: ['sizeTable', 'color'],
            });
            product = product.dataValues;

            if (selectedSize == 'default') {
                let cat = await db.Category.findOne({
                    where: {
                        id: product.dataValues.categories.split(',')[0],
                    },
                });
                return res.redirect(`/c/categoria/${cat.dataValues.categoryName.toLowerCase()}`);
            }

            let selectedProduct = {
                pid: product.id,
                selectedSize,
                qty: 1,
            };

            if (req.session.customer) {
                // Codigo para agregar el producto
                // a la tabla de clientes
                let customer = await db.Customer.findOne({
                    where: {
                        id: req.session.customer,
                    },
                });

                customer = customer.dataValues;

                let customerCart = customer.inCart == null ? [] : JSON.parse(customer.inCart);

                if (customerCart.length > 0) {
                    let customerCartUpdated = customerCart.filter((item) => {
                        if (
                            item.pid == selectedProduct.pid &&
                            item.selectedSize == selectedProduct.selectedSize
                        ) {
                            item.qty++;
                            return item;
                        }
                    });

                    if (!customerCartUpdated.length > 0) customerCart.push(selectedProduct);
                }

                if (customerCart.length === 0) customerCart.push(selectedProduct);

                let updatedCustomer = await db.Customer.update(
                    {
                        inCart: JSON.stringify(customerCart),
                    },
                    {
                        where: {
                            id: customer.id,
                        },
                    }
                );
            }

            req.session.productsInCart.push(selectedProduct);

            return res.redirect(301, '/checkout/carrito');
        } catch (err) {
            console.log('Hubo un problema -> ', err);
        }
    },
    removeFromCart: async (req, res) => {
        let { id, size, customerId } = req.params;

        try {
            let customer = await db.Customer.findOne({
                where: {
                    id: customerId,
                },
            });
            customer = customer.dataValues;

            let customerCart = customer.inCart == null ? [] : JSON.parse(customer.inCart);

            if (customerCart.length > 0) {
                let customerCartUpdated = customerCart.filter((item) => {
                    if (!(item.pid == id && item.selectedSize == `selectedSize-${size}`)) {
                        console.log('entro');
                        return item;
                    }
                });

                customerCart = customerCartUpdated;
            }

            let updatedCustomer = await db.Customer.update(
                {
                    inCart: JSON.stringify(customerCart),
                },
                {
                    where: {
                        id: customer.id,
                    },
                }
            );

            res.locals.customerCartNavCounter = customerCart.length;
            return res.send({ status: 200, msg: 'Elemento borrado' });
        } catch (err) {
            console.log('Hubo un error -> ', err);
            return res.send({ status: 400, msg: 'error' });
        }
    },
};

module.exports = checkoutControllers;

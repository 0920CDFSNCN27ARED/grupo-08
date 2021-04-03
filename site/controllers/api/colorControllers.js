const returnCategoriesFormated = require('../../helpers/returnCategoriesFormated');
const db = require('../../database/models');

const errRes = (err) => ({
    status: 500,
    error: String(err),
});

const colorControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            let color = await db.Color.findOne({
                where: { id: id },
            });

            if (!color) {
                return res.send({
                    status: 404,
                    statusText: 'Not Found',
                });
            }

            let allProducts = await db.Product.findAll({
                include: ['sizeTable', 'color', 'brand'],
            });

            let products = allProducts.filter((product) => {
                let pColor = product.dataValues.colorId;

                if (pColor == id) {
                    return product;
                }
            });

            return res.send({
                status: 200,
                statusText: 'OK',
                color,
                productsCount: products.length,
                products: products,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    getAll: async (req, res) => {
        try {
            const colors = await db.Color.findAll();

            return res.send({
                status: 200,
                statusText: 'OK',
                count: colors.length,
                colors,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    create: async (req, res) => {
        const { colorName } = req.body;

        try {
            const color = await db.Color.create({
                colorName,
            });

            return res.send({
                status: 201,
                statusText: 'Created',
                color,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    update: async (req, res) => {
        const { id, colorName } = req.body;

        try {
            await db.Color.update(
                {
                    id,
                    colorName,
                },
                {
                    where: { id: id },
                }
            );

            return res.send({
                status: 204,
                statusText: 'No Content',
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    delete: async (req, res) => {
        let { id } = req.params;

        try {
            let allProducts = await db.Product.findAll();

            let hasProducts = allProducts.filter((prod) => {
                let pColorId = prod.dataValues.colorId;

                if (pColorId == id) {
                    return prod;
                }
            });

            if (hasProducts && hasProducts.length == 0) {
                await db.Color.destroy({
                    where: {
                        id: id,
                    },
                });
                return res.send({
                    status: 204,
                    statusText: 'No Content',
                });
            } else {
                return res.send({
                    status: 406,
                    statusText: 'Not Acceptable',
                    message: 'Can not remove the current color because it has products in it',
                });
            }
        } catch (err) {
            return res.send(errRes(err));
        }
    },
};

module.exports = colorControllers;

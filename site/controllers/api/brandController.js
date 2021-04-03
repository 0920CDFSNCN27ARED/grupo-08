const returnCategoriesFormated = require('../../helpers/returnCategoriesFormated');
const db = require('../../database/models');

const errRes = (err) => ({
    status: 500,
    error: String(err),
});

const categoriesControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            let brand = await db.Brand.findOne({
                where: { id: id },
            });

            if (!brand) {
                return res.send({
                    status: 404,
                    statusText: 'Not Found',
                });
            }

            let allProducts = await db.Product.findAll({
                include: ['sizeTable', 'color', 'brand'],
            });

            let products = allProducts.filter((product) => {
                let pBrand = product.dataValues.brandId;

                if (pBrand == id) {
                    return product;
                }
            });

            return res.send({
                status: 200,
                statusText: 'OK',
                brand,
                productsCount: products.length,
                products: products,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    getAll: async (req, res) => {
        try {
            const brands = await db.Brand.findAll();

            return res.send({
                status: 200,
                statusText: 'OK',
                count: brands.length,
                brands,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    create: async (req, res) => {
        const { brandName } = req.body;

        try {
            const brand = await db.Brand.create({
                brandName,
            });

            return res.send({
                status: 201,
                statusText: 'Created',
                brand,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    update: async (req, res) => {
        const { id, brandName } = req.body;

        try {
            await db.Brand.update(
                {
                    id,
                    brandName,
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
                let pBrandId = prod.dataValues.brandId;

                if (pBrandId == id) {
                    return prod;
                }
            });

            if (hasProducts && hasProducts.length == 0) {
                await db.Brand.destroy({
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
                    message: 'Can not remove the current brand because it has products in it',
                });
            }
        } catch (err) {
            return res.send(errRes(err));
        }
    },
};

module.exports = categoriesControllers;

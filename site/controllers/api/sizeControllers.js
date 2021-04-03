const returnCategoriesFormated = require('../../helpers/returnCategoriesFormated');
const db = require('../../database/models');

const errRes = (err) => ({
    status: 500,
    error: String(err),
});

const sizeControllers = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            let sizeTable = await db.SizeTable.findOne({
                where: { id: id },
            });

            if (!sizeTable) {
                return res.send({
                    status: 404,
                    statusText: 'Not Found',
                });
            }

            let allProducts = await db.Product.findAll({
                include: ['sizeTable', 'color', 'brand'],
            });

            let products = allProducts.filter((product) => {
                let pSizeTable = product.dataValues.sizeTableId;

                if (pSizeTable == id) {
                    return product;
                }
            });

            return res.send({
                status: 200,
                statusText: 'OK',
                sizeTable,
                productsCount: products.length,
                products: products,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    getAll: async (req, res) => {
        try {
            const sizeTables = await db.SizeTable.findAll();

            return res.send({
                status: 200,
                statusText: 'OK',
                count: sizeTables.length,
                sizeTables,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    create: async (req, res) => {
        const { tableName, sizes } = req.body;

        try {
            const sizeTable = await db.SizeTable.create({
                tableName,
                sizes,
            });

            return res.send({
                status: 201,
                statusText: 'Created',
                sizeTable,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    update: async (req, res) => {
        const { id, tableName, sizes } = req.body;

        try {
            await db.SizeTable.update(
                {
                    id,
                    tableName,
                    sizes,
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
                let pSize = prod.dataValues.sizeTableId;

                if (pSize == id) {
                    return prod;
                }
            });

            if (hasProducts && hasProducts.length == 0) {
                await db.SizeTable.destroy({
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
                    message: 'Can not remove the current size table because it has products in it',
                });
            }
        } catch (err) {
            return res.send(errRes(err));
        }
    },
};

module.exports = sizeControllers;

const bcrypt = require('bcrypt');
const moment = require('moment');
const db = require('../../database/models');
const { validationResult } = require('express-validator');

const errRes = (err) => ({
    status: 500,
    error: String(err),
});
// return res.send(errRes(err));

const handleImages = (obj) => {
    // pasar a helpers luego
    let arrImagesNames = [];

    let images = obj;
    images.forEach((image) => {
        let originalName = image.originalname;
        arrImagesNames.push(`/${originalName[0]}/${originalName[1]}/${originalName}`);
    });

    return arrImagesNames.join(', ');
};

const productController = {
    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            // Busco el id en los productos
            let product = await db.Product.findOne({
                where: {
                    id: id,
                },
                include: ['sizeTable', 'color', 'brand'],
            });

            if (product == undefined) {
                return res.send({
                    status: 404,
                    statusText: 'Not Found',
                });
            }

            return res.send({
                status: 200,
                statusText: 'OK',
                product,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    getAll: async (req, res) => {
        try {
            const allProducts = await db.Product.findAll({
                include: ['sizeTable', 'color', 'brand'],
            });

            return res.send({
                status: 200,
                statusText: 'OK',
                count: allProducts.length,
                products: allProducts,
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    create: async (req, res) => {
        try {
            const sizeTables = await db.SizeTable.findAll();
            const brands = await db.Brand.findAll();
            const colors = await db.Color.findAll();
            const categories = await db.Category.findAll();

            const allSizeTables = sizeTables.map((table) => ({
                name: table.dataValues.tableName,
                value: table.dataValues.id,
                sizes: table.dataValues.sizes,
            }));

            const allBrands = brands.map((brand) => ({
                name: brand.dataValues.brandName,
                value: brand.dataValues.id,
            }));
            const allColors = colors.map((color) => ({
                name: color.dataValues.colorName,
                value: color.dataValues.id,
            }));
            const allCategories = categories.map((category) => category.dataValues);

            return res.send({
                status: 200,
                statusText: 'OK',
                data: {
                    categories: allCategories,
                    sizeTables: allSizeTables,
                    brands: allBrands,
                    colors: allColors,
                },
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    created: async (req, res) => {
        let {
            isActive,
            sizeTableId,
            brandId,
            productName,
            sku,
            productPrice,
            productPriceSpecial,
            productPriceSpecialFrom,
            productPriceSpecialTo,
            shortDescription,
            composition,
            care,
            colorId,
            stock,
            categories,
        } = req.body;

        if (typeof stock == 'object' || typeof stock == 'array') stock = stock.join(',');

        if (typeof categories == 'object' || typeof categories == 'array')
            categories = categories.join(',');

        if (typeof productPriceSpecial == 'string' && productPriceSpecial === '')
            productPriceSpecial = null;

        let images = '';
        if (req.files) {
            images = handleImages(req.files);
        }

        try {
            db.Product.create({
                sizeTableId,
                brandId,
                colorId,
                isActive,
                productName,
                sku,
                productPrice,
                productPriceSpecial,
                productPriceSpecialFrom,
                productPriceSpecialTo,
                shortDescription,
                composition,
                care,
                stock,
                categories,
                images,
            });

            return res.send({
                status: 200,
                msg: 'ok',
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
    update: async (req, res) => {
        let {
            id,
            isActive,
            sizeTableId,
            brandId,
            productName,
            sku,
            productPrice,
            productPriceSpecial,
            productPriceSpecialFrom,
            productPriceSpecialTo,
            shortDescription,
            composition,
            care,
            colorId,
            stock,
            categories,
        } = req.body;

        if (typeof stock == 'object' || typeof stock == 'array') stock = stock.join(',');

        if (typeof categories == 'object' || typeof categories == 'array')
            categories = categories.join(',');

        if (typeof productPriceSpecial == 'string' && productPriceSpecial === '')
            productPriceSpecial = null;

        let images = '';
        if (req.files) {
            images = handleImages(req.files);
        }

        try {
            await db.Product.update(
                {
                    id,
                    isActive,
                    sizeTableId,
                    brandId,
                    productName,
                    sku,
                    productPrice,
                    productPriceSpecial,
                    productPriceSpecialFrom,
                    productPriceSpecialTo,
                    shortDescription,
                    composition,
                    care,
                    colorId,
                    stock,
                    categories,
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
            await db.Product.destroy({
                where: {
                    id: id,
                },
            });
            return res.send({
                status: 204,
                statusText: 'No Content',
            });
        } catch (err) {
            return res.send(errRes(err));
        }
    },
};

module.exports = productController;

module.exports = (sequelize, dataTypes) => {
    const d = dataTypes;
    let alias, cols, config;

    alias = 'Product';
    cols = {
        id: {
            type: d.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        sizeTableId: {
            type: d.INTEGER,
            allowNull: false,
        },
        brandId: {
            type: d.INTEGER,
            allowNull: false,
        },
        colorId: {
            type: d.INTEGER,
            allowNull: false,
        },
        isActive: {
            type: d.INTEGER,
            allowNull: false,
        },
        productName: {
            type: d.STRING,
            allowNull: false,
        },
        sku: {
            type: d.STRING,
            allowNull: false,
        },
        productPrice: {
            type: d.DECIMAL(20, 2),
            allowNull: false,
        },
        productPriceSpecial: {
            type: d.DECIMAL(20, 2),
            allowNull: false,
        },
        productPriceSpecialFrom: {
            type: d.STRING,
            allowNull: true,
        },
        productPriceSpecialTo: {
            type: d.STRING,
            allowNull: true,
        },
        shortDescription: {
            type: d.STRING,
            allowNull: true,
        },
        composition: {
            type: d.STRING,
            allowNull: true,
        },
        care: {
            type: d.STRING,
            allowNull: true,
        },
        stock: {
            type: d.STRING,
            allowNull: false,
        },
        productsGroup: {
            type: d.STRING,
            allowNull: true,
        },
        categories: {
            type: d.STRING,
            allowNull: false,
        },
        images: {
            type: d.STRING,
            allowNull: false,
        },
        createdAt: {
            type: d.INTEGER,
            allowNull: false,
        },
        updatedAt: {
            type: d.INTEGER,
            allowNull: true,
        },
    };
    config = {
        timestamps: true,
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.SizeTable, {
            foreignkey: 'sizeTableId',
            as: 'sizeTable',
        });
        Product.belongsTo(models.Color, {
            foreignkey: 'colorId',
            as: 'color',
        });
        Product.belongsTo(models.Brand, {
            foreignkey: 'brandId',
            as: 'brand',
        });
    };

    return Product;
};

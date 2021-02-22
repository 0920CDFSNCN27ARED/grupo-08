module.exports = (sequelize, dataTypes) => {
    const d = dataTypes;
    let alias, cols, config;

    alias = 'Category';
    cols = {
        id: {
            type: d.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        isActive: {
            type: d.INTEGER,
            allowNull: false,
        },
        showMenu: {
            type: d.INTEGER,
            allowNull: false,
        },
        categoryName: {
            type: d.STRING,
            allowNull: false,
        },
        pageTitle: {
            type: d.STRING,
            allowNull: true,
        },
        metaDescription: {
            type: d.STRING,
            allowNull: true,
        },
        metaKeyWords: {
            type: d.STRING,
            allowNull: true,
        },
        parentCategory: {
            type: d.STRING,
            allowNull: true,
        },
        subCategories: {
            type: d.STRING,
            allowNull: true,
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

    const AdminUser = sequelize.define(alias, cols, config);

    return AdminUser;
};

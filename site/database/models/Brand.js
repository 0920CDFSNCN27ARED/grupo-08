module.exports = (sequelize, dataTypes) => {
    const d = dataTypes;
    let alias, cols, config;

    alias = 'Brand';
    cols = {
        id: {
            type: d.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        brandName: {
            type: d.STRING,
            allowNull: false,
        },
    };
    config = {
        timestamps: false,
    };

    const Brand = sequelize.define(alias, cols, config);

    return Brand;
};

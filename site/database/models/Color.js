module.exports = (sequelize, dataTypes) => {
    const d = dataTypes;
    let alias, cols, config;

    alias = 'Color';
    cols = {
        id: {
            type: d.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        colorName: {
            type: d.STRING,
            allowNull: false,
        },
    };
    config = {
        timestamps: false,
    };

    const Color = sequelize.define(alias, cols, config);

    return Color;
};

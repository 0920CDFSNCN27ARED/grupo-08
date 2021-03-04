module.exports = (sequelize, dataTypes) => {
    const d = dataTypes;
    let alias, cols, config;

    alias = 'SizeTable';
    cols = {
        id: {
            type: d.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        tableName: {
            type: d.STRING,
            allowNull: false,
        },
        sizes: {
            type: d.STRING,
            allowNull: false,
        },
    };
    config = {
        timestamps: false,
    };

    const SizeTable = sequelize.define(alias, cols, config);

    /* SizeTable.associate = (models) => {
        SizeTable.hasMany(models.Product, {
            as: 'sizeTable',
            foreignkey: 'sizeTableId',
        });
    }; */

    return SizeTable;
};

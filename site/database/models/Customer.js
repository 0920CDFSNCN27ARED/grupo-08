module.exports = (sequelize, DataTypes) => {
    const d = DataTypes;
    let alias, cols, config;

    alias = 'Customer';
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
        firstName: {
            type: d.STRING,
            allowNull: false,
        },
        lastName: {
            type: d.STRING,
            allowNull: false,
        },
        email: {
            type: d.STRING,
            allowNull: false,
        },
        emailVerified: {
            type: d.INTEGER,
            allowNull: false,
        },
        userPassword: {
            type: d.STRING,
            allowNull: false,
        },
        dob: {
            type: d.INTEGER,
            allowNull: false,
        },
        gender: {
            type: d.STRING,
            allowNull: false,
        },
        createdAt: {
            type: d.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: d.DATE,
            allowNull: false,
        },
        inCart: {
            type: d.STRING,
        },
    };
    config = {
        timestamps: true,
    };

    const Customer = sequelize.define(alias, cols, config);

    return Customer;
};

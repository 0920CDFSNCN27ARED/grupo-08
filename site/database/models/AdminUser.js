module.exports = (sequelize, dataTypes) => {
    const d = dataTypes;
    let alias, cols, config;

    alias = 'AdminUser';
    cols = {
        id: {
            type: d.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        roleId: {
            type: d.INTEGER,
            allowNull: false
        },
        isActive: {
            type: d.INTEGER,
            allowNull: false
        },
        firstName: {
            type: d.STRING,
            allowNull: false
        },
        lastName: {
            type: d.STRING,
            allowNull: false
        },
        userName: {
            type: d.STRING,
            allowNull: false
        },
        email: {
            type: d.STRING,
            allowNull: false
        },
        userPassword: {
            type: d.STRING,
            allowNull: false
        },
        createdAt: {
            type: d.INTEGER,
            allowNull: false
        },
        updatedAt: {
            type: d.INTEGER,
            allowNull: true
        },
    }
    config = {
        timestamps: true,
    }

    const AdminUser = sequelize.define(alias, cols, config);
    
    return AdminUser;
}
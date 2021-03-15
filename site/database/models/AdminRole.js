module.exports = (sequelize, dataTypes) => {
    const d = dataTypes;
    let alias, cols, config;
    
    alias = "AdminRole";
    cols = {
        id: {
            type: d.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        roleName: {
            type: d.STRING,
            allowNull: false
        },
    }
    config = {
        timestamps: false,
    }

    const AdminRole = sequelize.define(alias, cols, config);


    return AdminRole;
}
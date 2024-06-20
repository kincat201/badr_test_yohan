
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER(11) },
        username: DataTypes.STRING,
        updated_at: DataTypes.DATE,
        created_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {timestamps: false,});
    user.associate = function (models) {
        // associations can be defined here
        user.hasMany(models.transaction, {
            foreignKey: 'vendor_id',
            sourceKey: 'id',
            as:'vendor'
        });
        user.hasMany(models.transaction, {
            foreignKey: 'customer_id',
            sourceKey: 'id',
            as:'customer'
        });
    }
    return user
}
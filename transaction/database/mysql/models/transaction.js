module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define('transaction', {
        id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER(11) },
        vendor_id: DataTypes.INTEGER(11),
        customer_id: DataTypes.INTEGER(11),
        material_id: DataTypes.INTEGER(11),
        transaction_date: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        created_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {timestamps: false,});
    transaction.associate = function (models) {
        // associations can be defined here
        transaction.belongsTo(models.user, {
            foreignKey: 'vendor_id',
            sourceKey: 'id',
            as: 'vendor'
        });
        transaction.belongsTo(models.user, {
            foreignKey: 'customer_id',
            sourceKey: 'id',
            as: 'customer'
        });
        transaction.belongsTo(models.material, {
            foreignKey: 'material_id',
            sourceKey: 'id',
            as: 'material'
        });
    }
    return transaction
}
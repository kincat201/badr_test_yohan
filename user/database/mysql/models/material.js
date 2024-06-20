module.exports = (sequelize, DataTypes) => {
    const material = sequelize.define('material', {
        id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER(11) },
        name: DataTypes.STRING,
        updated_at: DataTypes.DATE,
        created_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {timestamps: false,});
    material.associate = function (models) {
        // associations can be defined here
        material.hasMany(models.transaction, {
            foreignKey: 'material_id',
            sourceKey: 'id',
        });
    }
    return material
}
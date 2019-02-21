'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const Department = sequelize.define('Department', {
        DepartmentUID: {
            type: DataTypes.UUID,
            primaryKey: true,
            default: DataTypes.UUIDV4
        },
        DepartmentName: DataTypes.STRING(255),
        DepartmentPhone: DataTypes.STRING(50),
        DepartmentEmail: {
            type: DataTypes.STRING(255),
            validate: {
                isEmail: true
            }
        },
        BuildingName: DataTypes.TEXT('tiny'),
        Address1: DataTypes.STRING,
        Address2: DataTypes.STRING,
        PostalCode: DataTypes.STRING(50),
    }, {
        timestamps: true
    });

    Department.associate = function(models) {
        console.log(`Associate ${__filename}`);
        models.Department.belongsTo(models.Company, {foreignKey:'CompanyCode', onDelete: 'RESTRICT'});
        models.Department.belongsTo(models.City, {foreignKey:'CityCode', onDelete: 'RESTRICT'});
    };

    return Department;
}
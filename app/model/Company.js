'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const Company = sequelize.define('Company', {
        CompanyUID: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        CompanyPhone: DataTypes.STRING(50),
        CompanyEmail: {
            type: DataTypes.STRING(255),
            validate: {
                isEmail: true
            }
        },
        CompanyUEN: DataTypes.STRING(50),
        CompanyLogo: DataTypes.BLOB('long'),
        CompanyName: DataTypes.STRING,
        BuildingName: DataTypes.STRING,
        Address1: DataTypes.STRING,
        Address2: DataTypes.STRING,
        PostalCode: DataTypes.STRING(50),
    }, {
        timestamps: true
    });

    Company.associate = function(models) {
        console.log(`Associate ${__filename}`);
        models.Company.belongsTo(models.City, {foreignKey:'CityCode'});
        models.Company.belongsTo(models.Country, {foreignKey:'CountryCode'});
        models.Company.hasMany(models.Department, {foreignKey:'CompanyUID'});
    };

    return Company;
}
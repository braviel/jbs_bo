'use strict';
// const Country = require('./country');
// const City = require('./City');

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const Company = sequelize.define('Company', {
        CompanyUID: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        CompanyPhone: DataTypes.STRING(50),
        CompanyEmail: DataTypes.STRING(255),
        CompanyUEN: DataTypes.STRING(50),
        CompanyLogo: DataTypes.BLOB('long'),
        CompanyName: DataTypes.STRING(255),
        DepartmentUID: DataTypes.STRING(50),
        DepartmentName: DataTypes.STRING(255),
        BuildingName: DataTypes.TEXT('tiny'),
        Address1: DataTypes.STRING,
        Address2: DataTypes.STRING,
        PostalCode: DataTypes.STRING(50),
    }, {
        timestamps: true
    });

    Company.associate = function(models) {
        models.Company.belongsTo(models.City, {foreignKey:'CityCode'});
        models.Company.belongsTo(models.Country, {foreignKey:'CountryCode'});
    }

    return Company;
}
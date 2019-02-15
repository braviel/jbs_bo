'use strict';
const Country = require('./country');
const City = require('./City');

module.exports = function(sequelize, DataTypes) {
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
        City: {
            type: DataTypes.INTEGER,
            references: {
                model: City,
                key: 'CityCode'
            }
        },
        Country:{
            type: DataTypes.INTEGER,
            references: {
                model: Country,
                key: 'CountryCode'
            }
        },        
    }, {
        timestamps: true
    });
    
    return Company;
}
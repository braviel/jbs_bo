'use strict';
const Country = require('./Country');
const City = require('./City');
const Company = require('./Company');

module.exports = function(sequelize, DataTypes) {
    const Group = sequelize.define('Group', {
        GroupUID: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        CompanyUID: {
            type: DataTypes.STRING(50),
            references: {
                model: Company,
                key: 'CompanyUID'
            }
        },
        DepartmentUID: DataTypes.STRING(50),
        GroupPhone: DataTypes.STRING(50),
        GroupEmail: DataTypes.STRING(255),        
        GroupLogo: DataTypes.BLOB('long'),        
        BuildingName: DataTypes.TEXT('tiny'),
        Address1: DataTypes.STRING,        
        Address2: DataTypes.STRING,
        PostalCode: DataTypes.STRING(45),
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
        Location1: DataTypes.STRING,
        Location2: DataTypes.STRING
    }, {
        timestamps: true
    });    
    return Group;
}
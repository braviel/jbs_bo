'use strict';
const Country = require('./country');
const City = require('./city');
const Company = require('./company');

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
    // Country.sync();
    return Group;
}
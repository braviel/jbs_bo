'use strict';
const Country = require('./Country');
const City = require('./City');

module.exports = function(sequelize, DataTypes) {
    const Profile = sequelize.define('Profile', {
        ProfileUID: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        ProfilePhone: DataTypes.STRING(50),
        ProfileEmail: DataTypes.STRING(255),
        ProfileUEN: DataTypes.STRING(45),
        ProfilePhoto: DataTypes.BLOB('long'),
        CommonName: DataTypes.STRING(255),
        FirstName: DataTypes.STRING(255),
        LastName: DataTypes.STRING(255),
        DateOfBirth: DataTypes.DATE,
        Gender: DataTypes.STRING(15),
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
        DrivingLicenseClass: DataTypes.STRING,
        DrivingLicenseDate: DataTypes.DATEONLY,
        Religion: DataTypes.STRING        
    }, {
        timestamps: true
    });
    // Country.sync();
    return Profile;
}
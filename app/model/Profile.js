'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const Profile = sequelize.define('Profile', {
        ProfileUID: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false
        },
        ProfilePhone: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        ProfileEmail: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        ProfileUEN: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        ProfilePhoto: DataTypes.BLOB('long'),
        CommonName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Gender: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        BuildingName: DataTypes.STRING,
        Address1: DataTypes.STRING,
        Address2: DataTypes.STRING,
        PostalCode: DataTypes.STRING(45),
        DrivingLicenseClass: DataTypes.STRING,
        DrivingLicenseDate: DataTypes.DATEONLY,
        Religion: DataTypes.STRING
    }, {
        timestamps: true
    });
    Profile.associate = function(models) {
        console.log(`Associate ${__filename}`);
        models.Profile.belongsTo(models.City, {foreignKey: 'CityCode'});
        models.Profile.belongsTo(models.Country, {foreignKey: 'CountryCode'});
    };
    return Profile;
}
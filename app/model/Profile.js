'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
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
        DrivingLicenseClass: DataTypes.STRING,
        DrivingLicenseDate: DataTypes.DATEONLY,
        Religion: DataTypes.STRING
    }, {
        timestamps: true
    });
    Profile.associate = (models) => {
        console.log(`Associate ${__filename}`);
        models.Profile.belongsTo(models.City, {foreignKey: 'CityCode'});
        models.Profile.belongsTo(models.Country, {foreignKey: 'CountryCode'});
    };
    return Profile;
}
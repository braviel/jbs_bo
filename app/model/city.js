'use strict';
const Country = require('./Country');

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const City = sequelize.define('City', {
        CityCode: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        CityName: DataTypes.STRING
    }, {
        timestamps: false
    });

    City.associate = function(models) {
        console.log(`Associate ${__filename}`);
        models.Country.hasMany(models.City, {foreignKey: 'CountryCode'});
        models.City.belongsTo(models.Country, {foreignKey: 'CountryCode'});
    };
    
    return City;
}
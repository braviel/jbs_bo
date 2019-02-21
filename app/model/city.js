'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const City = sequelize.define('City', {
        CityCode: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        CityName: DataTypes.TEXT('tiny'),
        Code: DataTypes.STRING
    }, {
        timestamps: false 
    });

    City.associate = function(models) {
        console.log(`Associate ${__filename}`);
        models.Country.hasMany(models.City, {foreignKey: 'CountryCode', onDelete: 'RESTRICT'});
        models.City.belongsTo(models.Country, {foreignKey: 'CountryCode', onDelete: 'RESTRICT'});
    };
    
    return City;
}
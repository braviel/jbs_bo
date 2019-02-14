'use strict';
const Country = require('./country')

module.exports = function(sequelize, DataTypes) {
    const City = sequelize.define('City', {
        CityCode: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        CityName: DataTypes.STRING,
        CountryCode: {
            type: DataTypes.INTEGER,
            references: {
                model: Country,
                key: 'CountryCode'
            }
        }
    }, {
        timestamps: false
    });
    // Country.sync();
    return City;
}
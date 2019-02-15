'use strict';
module.exports = function(sequelize, DataTypes) {
    const Country = sequelize.define('Country', {
        CountryCode: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        CountryName: DataTypes.STRING,
        CallingCode: DataTypes.STRING
    }, {
        timestamps: false
    });    
    return Country;
}
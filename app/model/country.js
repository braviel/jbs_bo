'use strict';
module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const Country = sequelize.define('Country', {
        CountryCode: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        CountryName: DataTypes.STRING,
        CountryCode2: DataTypes.STRING(2),
        CallingCode: DataTypes.STRING
    }, {
        timestamps: false
    });    
    return Country;
}
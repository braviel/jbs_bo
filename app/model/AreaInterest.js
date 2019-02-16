'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const AreaInterest = sequelize.define('AreaInterest', {
        AreaInterestCode: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        AreaInterestName: DataTypes.STRING,
    }, {
        timestamps: false
    });
    return AreaInterest;
}
'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const AreaInterest = sequelize.define('AreaInterest', {
        AreaInterestCode: {
            type: DataTypes.INTEGER(11),
            primaryKey: true
        },
        AreaInterestName: DataTypes.STRING,
    }, {
        timestamps: false
    });
    return AreaInterest;
}
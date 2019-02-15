'use strict';

module.exports = function(sequelize, DataTypes) {
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
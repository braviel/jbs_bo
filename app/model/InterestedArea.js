'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const InterestedArea = sequelize.define('InterestedArea', {
        AreaCode: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        AreaName: DataTypes.TEXT('tiny'),
    }, {
        timestamps: false
    });
    return InterestedArea;
}
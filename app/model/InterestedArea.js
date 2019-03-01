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
    InterestedArea.associate = function(models)  {
        console.log(`@@@ Associate ${__filename}`);                
    }
    return InterestedArea;
}
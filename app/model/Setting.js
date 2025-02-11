'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const Setting = sequelize.define('Setting', {        
        NotificationInd: {
            type: DataTypes.STRING           
        },        
    }, {
        timestamps: false
    });    
    Setting.associate = function(models) {
        models.Setting.belongsTo(models.Profile, {foreignKey: 'ProfileUID'});
    }
    return Setting;
}
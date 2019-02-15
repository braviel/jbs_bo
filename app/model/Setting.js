'use strict';
const Profile = require('./Profile');

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const Setting = sequelize.define('Setting', {        
        NotificationInd: {
            type: DataTypes.STRING           
        },        
    }, {
        timestamps: false
    });    
    Setting.associate = (models) => {
        models.Setting.belongsTo(models.Profile, {foreignKey: 'ProfileUID'})
    }
    return Setting;
}
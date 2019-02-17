'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const GroupManager = sequelize.define('GroupManager', {        
        GroupAdmin: {
            type: DataTypes.ENUM,
            values: ['Y', 'N'],
            default: 'N'
        }
    }, {
        timestamps: true
    }); 
    GroupManager.associate = (models) => {
        console.log(`Associate ${__filename}`);        
        models.GroupManager.belongsTo(models.Group, {foreignKey: 'GroupUID'});
        models.Group.hasMany(models.GroupManager, {foreignKey: 'GroupUID'});  
        models.GroupManager.belongsTo(models.Profile, {foreignKey: 'ProfileUID'});    
    }
    return GroupManager;
}


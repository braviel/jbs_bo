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
    GroupManager.associate = function(models){
        console.log(`Associate ${__filename}`);        
        models.GroupManager.belongsTo(models.Group, {foreignKey: 'GroupUID', onDelete: 'RESTRICT'});
        models.Group.hasMany(models.GroupManager, {foreignKey: 'GroupUID', onDelete: 'RESTRICT'});  
        models.GroupManager.belongsTo(models.Profile, {foreignKey: 'ProfileUID', onDelete: 'RESTRICT'});    
    }
    return GroupManager;
}


'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const GroupMember = sequelize.define('GroupMember', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        GroupAdmin: {
            type: DataTypes.ENUM,
            values: ['Y', 'N'],
            default: 'N'
        }
    }, {
        timestamps: true
    }); 
    GroupMember.associate = function(models) {
        console.log(`Associate ${__filename}`);        
        models.GroupMember.belongsTo(models.Group, {foreignKey: 'GroupUID', onDelete: 'RESTRICT'});        
        models.GroupMember.belongsTo(models.Profile, {foreignKey: 'ProfileUID', onDelete: 'RESTRICT'});
        models.Profile.belongsToMany(models.Group, {
            through: models.GroupMember, 
            foreignKey: 'ProfileUID',
            onDelete: 'RESTRICT'});        
        models.Group.belongsToMany(models.Profile, {
            through: models.GroupMember, 
            foreignKey: 'GroupUID',
            onDelete: 'RESTRICT'});    
    }
    return GroupMember;
}


'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const GroupManager = sequelize.define('GroupManager', {
        DepartmentUID: DataTypes.STRING(50),
        GroupAdmin: {
            type: DataTypes.CHAR(1),
            default: 'N'
        }
    }, {
        timestamps: true
    }); 
    GroupManager.associate = (models) => {
        console.log(`Associate ${__filename}`);
        models.GroupManager.belongsTo(models.Company, {foreignKey: 'CompanyUID'});
        models.GroupManager.belongsTo(models.Country, {foreignKey: 'CountryCode'});   
        models.GroupManager.belongsTo(models.Group, {foreignKey: 'GroupUID'});  
        models.Group.hasMany(models.GroupManager, {foreignKey: 'GroupUID'});  
        models.GroupManager.belongsTo(models.Profile, {foreignKey: 'ProfileUID'});    
    }
    return GroupManager;
}


'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const Group = sequelize.define('Group', {
        GroupUID: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        DepartmentUID: DataTypes.STRING(50),
        GroupPhone: DataTypes.STRING(50),
        GroupEmail: DataTypes.STRING(255),        
        GroupLogo: DataTypes.BLOB('long'),        
        BuildingName: DataTypes.TEXT('tiny'),
        Address1: DataTypes.STRING,        
        Address2: DataTypes.STRING,
        PostalCode: DataTypes.STRING(45),
        Location1: DataTypes.STRING,
        Location2: DataTypes.STRING
    }, {
        timestamps: true
    });
    Group.associate = (models) => {
        models.Group.belongsTo(models.City, {foreignKey: 'CityCode'});
        models.Group.belongsTo(models.Country, {foreignKey: 'CountryCode'});
        models.Group.belongsTo(models.Company, {foreignKey: 'CompanyUID'});
    }
    return Group;
}
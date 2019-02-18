'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const Group = sequelize.define('Group', {
        GroupUID: {
            type: DataTypes.UUID,
            default: DataTypes.UUIDV4,
            primaryKey: true
        },
        GroupName: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false
        },
        GroupPhone: DataTypes.STRING(50),
        GroupEmail: {
            type: DataTypes.STRING(255),
            validate: {
                isEmail: true
            }
        },
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
    Group.associate = function(models) {
        console.log(`Associate ${__filename}`);
        models.Group.belongsTo(models.Country, {foreignKey: 'CountryCode'});
        models.Group.belongsTo(models.City, {foreignKey: 'CityCode'});
        models.Group.belongsTo(models.Company, {foreignKey: 'CompanyUID'});
        models.Group.belongsTo(models.Department, {foreignKey: 'DepartmentUID'});
    };
    return Group;
}
'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const Group = sequelize.define('Group', {
        GroupUID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
        GroupLogoURL: {
            type: DataTypes.STRING,
        },
        BuildingName: DataTypes.TEXT('tiny'),
        Address1: DataTypes.STRING,        
        Address2: DataTypes.STRING,
        PostalCode: DataTypes.STRING(45)
    }, {
        timestamps: true
    });
    Group.associate = function(models) {
        console.log(`Associate ${__filename}`);
        models.Group.hasMany(models.GroupMember, {foreignKey: 'GroupUID', onDelete: 'RESTRICT'});
        models.Group.belongsTo(models.Country, {foreignKey: 'CountryCode', onDelete: 'RESTRICT'});
        models.Group.belongsTo(models.City, {foreignKey: 'CityCode', onDelete: 'RESTRICT'});
        models.Group.belongsTo(models.Company, {foreignKey: 'CompanyUID', onDelete: 'RESTRICT'});
        models.Group.belongsTo(models.Department, {foreignKey: 'DepartmentUID', onDelete: 'RESTRICT'});
    };
    return Group;
}

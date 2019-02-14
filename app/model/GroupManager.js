'use strict';
const Country = require('./Country');
const Group = require('./Group');
const Profile = require('./Profile');
const Company = require('./company');

module.exports = function(sequelize, DataTypes) {
    const GroupManager = sequelize.define('GroupManager', {        
        CountryCode:{
            type: DataTypes.INTEGER,
            references: {
                model: Country,
                key: 'CountryCode'
            }
        },  
        CompanyUID: {
            type: DataTypes.STRING(50),
            references: {
                model: Company,
                key: 'CompanyUID'
            }
        },
        DepartmentUID: DataTypes.STRING(50),
        GroupUID: {
            type: DataTypes.STRING(10),
            references: {
                model: Group,
                key: 'GroupUID'
            }
        },
        ProfileUID: {
            type: DataTypes.STRING(50),
            references: {
                model: Profile,
                key: 'ProfileUID'
            }
        },
        GroupAdmin: {
            type: DataTypes.CHAR(1),
            default: 'N'
        }
    }, {
        timestamps: true
    });    
    return GroupManager;
}

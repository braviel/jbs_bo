'use strict';
const Profile = require('./Profile');
const AreaSkill = require('./AreaSkill');

module.exports = function(sequelize, DataTypes) {
    const ProfileAreaSkill = sequelize.define('ProfileAreaSkill', {
        ProfileUID: {
            type: DataTypes.STRING(50),
            references: {
                model: Profile,
                key: 'ProfileUID'
            }
        },        
        AreaSkillCode: {
            type: DataTypes.INTEGER(11),
            references: {
                model: AreaSkill,
                key: 'AreaSkillCode'
            }
        }
    }, {
        timestamps: false
    });    
    return ProfileAreaSkill;
}
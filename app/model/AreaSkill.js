'use strict';
const AreaInterest = require('./AreaInterest');

module.exports = function(sequelize, DataTypes) {
    const AreaSkill = sequelize.define('AreaSkill', {
        AreaSkillCode: {
            type: DataTypes.INTEGER(11),
            primaryKey: true
        },
        AreaSkillName: DataTypes.STRING,
        AreaInterestCode: {
            type: DataTypes.INTEGER(11),
            references: {
                model: AreaInterest,
                key: 'AreaInterestCode'
            }
        }
    }, {
        timestamps: false
    });    
    return AreaSkill;
}
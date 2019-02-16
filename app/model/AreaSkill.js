'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const AreaSkill = sequelize.define('AreaSkill', {
        AreaSkillCode: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        AreaSkillName: DataTypes.STRING
    }, {
        timestamps: false
    });
    AreaSkill.associate = (models) => {
        console.log(`@@@ Associate ${__filename}`);
        models.AreaSkill.belongsTo(models.AreaInterest, {foreignKey: 'AreaInterestCode'});
        models.AreaInterest.hasMany(models.AreaSkill, {foreignKey: 'AreaInterestCode'});
        models.AreaInterest.sync({force: true});
        models.AreaSkill.sync({force: true});
    }
    return AreaSkill;
}
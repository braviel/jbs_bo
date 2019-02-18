'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const InterestedSkill = sequelize.define('InterestedSkill', {
        SkillCode: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        SkillName: DataTypes.TEXT('tiny')
    }, {
        timestamps: false
    });
    InterestedSkill.associate = function(models)  {
        console.log(`@@@ Associate ${__filename}`);
        models.InterestedSkill.belongsTo(models.InterestedArea, {foreignKey: 'AreaCode'});
        models.InterestedArea.hasMany(models.InterestedSkill, {foreignKey: 'AreaCode'});        
    }
    return InterestedSkill; 
}
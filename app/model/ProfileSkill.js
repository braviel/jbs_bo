'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const ProfileSkill = sequelize.define('ProfileSkill', {      
    }, {
        timestamps: true
    });    
    ProfileSkill.associate = function(models) {
        models.ProfileSkill.belongsTo(models.InterestedSkill, {foreignKey: 'SkillCode', onDelete: 'RESTRICT'});
        models.ProfileSkill.belongsTo(models.Profile, {foreignKey: 'ProfileUID', onDelete: 'RESTRICT'});
        models.Profile.belongsToMany(models.InterestedSkill, {
            through: models.ProfileSkill,
            foreignKey: 'SkillCode',
            onDelete: 'RESTRICT'});
        models.InterestedSkill.belongsToMany(models.Profile, {
            through: models.ProfileSkill, 
            foreignKey: 'ProfileUID',
            onDelete: 'RESTRICT'});
    }
    return ProfileSkill;
}
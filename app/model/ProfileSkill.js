'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const ProfileSkill = sequelize.define('ProfileSkill', {      
    }, {
        timestamps: true
    });    
    ProfileSkill.associate = function(models) {
        models.Profile.belongsToMany(models.InterestedSkill, {through: models.ProfileSkill});
        models.InterestedSkill.belongsToMany(models.Profile, {through: models.ProfileSkill});
    }
    return ProfileSkill;
}
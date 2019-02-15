'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const ProfileSkill = sequelize.define('ProfileSkill', {      
    }, {
        timestamps: true
    });    
    ProfileSkill.associate = (models) => {
        models.Profile.belongsToMany(models.AreaSkill, {through: 'ProfileSkill'});
        models.AreaSkill.belongsToMany(models.Profile, {through: 'ProfileSkill'});
    }
    return ProfileSkill;
}
'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const ProfileArea = sequelize.define('ProfileArea', {
    }, {
        timestamps: true
    });    
    ProfileArea.associate = (models) => {
        models.Profile.belongsToMany(models.InterestedArea, {through: ProfileArea});
        models.InterestedArea.belongsToMany(models.Profile, {through: ProfileArea});
    }
    return ProfileArea;
}
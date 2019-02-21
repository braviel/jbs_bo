'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const ProfileArea = sequelize.define('ProfileArea', {
    }, {
        timestamps: true
    });    
    ProfileArea.associate = function(models) {
        models.Profile.belongsToMany(models.InterestedArea, {through: 'ProfileArea', onDelete: 'RESTRICT'});
        models.InterestedArea.belongsToMany(models.Profile, {through: 'ProfileArea', onDelete: 'RESTRICT'});
    }
    return ProfileArea;
}
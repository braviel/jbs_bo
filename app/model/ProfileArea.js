'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const ProfileArea = sequelize.define('ProfileArea', {
    }, {
        timestamps: true
    });    
    ProfileArea.associate = function(models) {
        models.ProfileArea.belongsTo(models.InterestedArea, {foreignKey: 'AreaCode', onDelete: 'RESTRICT'});
        models.ProfileArea.belongsTo(models.Profile, {foreignKey: 'ProfileUID', onDelete: 'RESTRICT'});
        models.Profile.belongsToMany(models.InterestedArea, {
            through: models.ProfileArea, 
            foreignKey: 'AreaCode',
            onDelete: 'RESTRICT'});
        models.InterestedArea.belongsToMany(models.Profile, {
            through: models.ProfileArea, 
            foreignKey: 'ProfileUID',
            onDelete: 'RESTRICT'});
    }
    return ProfileArea;
}
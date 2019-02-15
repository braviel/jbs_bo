'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log(`Define ${__filename}`);
    const ProfileInterest = sequelize.define('ProfileInterest', {
    }, {
        timestamps: true
    });    
    ProfileInterest.associate = (models) => {
        models.Profile.belongsToMany(models.AreaInterest, {through: 'ProfileInterest'});
        models.AreaInterest.belongsToMany(models.Profile, {through: 'ProfileInterest'});
    }
    return ProfileInterest;
}
'use strict';
const Boom = require('boom');
const del = require('del');
const uuid = require('uuid');
const fileUtils = require('../utils/file');
module.exports = (db) => {
    const Profile = db.getModel('Profile');
    const InterestedSkill = db.getModel('InterestedSkill');
    const InterestedArea = db.getModel('InterestedArea');
    return {        
        list: async function(opt) {
            let profiles
            try {
                profiles = await Profile.findAll();
            } catch (err) {
                console.error(err);
                throw err;                
            }
            return profiles;
        },
        listInterestedArea: async function(profileUID) {
            const ProfileArea = db.getModel('ProfileArea');
            let areas
            try {
                areas = await ProfileArea.findAll({
                    where: {
                        ProfileUID: profileUID
                    },
                    include: [{
                        model: InterestedArea
                    }]
                });    
            } catch (err) {
                console.error(err);
                throw err;
            }
            return areas;
        },
        get: async function(id) {
            let profile;
            try{
                profile = await Profile.findByPk(id);
                if (profile === null) throw Boom.notFound();
            } catch(err) {
                console.error(err);
                throw Boom.notFound(err.message);
            }
            return profile.get();
        },
        create: async function (obj) {
            let created;
            await this.validate(obj);
            try {
                created = await Profile.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return created;
        },
        delete: async function (id) {
            let result;
            try{
                const profile = await Profile.findByPk(id);
                if (profile === null) throw Boom.notFound();
                result = await Profile.destroy({
                    where: {ProfileUID: id}
                });
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message);
            }
            return result;
        },
        update: async function(id, obj) {
            let result;
            const profile = await Profile.findByPk(id);
            if (profile === null) throw Boom.notFound(`Can not find Profile with id "${id}"`);
            obj.ProfileUID = id;
            await this.validate(obj);
            try{
                result = await profile.update(obj);
            } catch (err) {
                console.log(err);
                throw Boom.badImplementation(err.message);
            }
            return result;
        },
        updatePhoto: async function(id, fileData) {
            let result;
            try{                
                const profile = await Profile.findByPk(id);
                if(profile == null) throw Boom.notFound();
                let fileNameWithExt = profile.ProfileImageURL;
                if(fileNameWithExt == null || fileNameWithExt == "") {
                    const filename = uuid.v1();
                    const fileExtension = fileData.hapi.filename.split('.').pop();
                    fileNameWithExt = filename + '.' + fileExtension;                    
                } else {
                    await del([process.env.UPLOAD_PATH + fileNameWithExt]);
                }
                const filefullPath = process.env.UPLOAD_PATH + fileNameWithExt;
                await fileUtils.writeStreamFile(fileData, filefullPath);
                profile.ProfileImageURL = fileNameWithExt;
                result = await profile.save()
            } catch(err) {
                console.error(err)
                throw err;
            }
            return result
        }
    }
}
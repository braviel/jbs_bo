'use strict';
const Boom = require('boom');

module.exports = (db) => {
    const Profile = db.getModel('Profile');    
    return {
        validate: async function(profile) {
            let passed = false;
            const City = db.getModel('City');
            const Country = db.getModel('Country');
            try{
                const country = await Country.findByPk(profile.CountryCode);
                const city = await City.findByPk(profile.CityCode);
                if(profile.CountryCode != null && country === null) {
                    throw Boom.notFound(`Can not find Country with id ${profile.CountryCode}`);
                }
                if(profile.CityCode != null && city === null) {
                    throw Boom.notFound(`Can not find City with id ${profile.CityCode}`);
                }
                passed = true;
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message);
            }
            return passed;
        },
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
        setPhoto: async function(id, filename) {
            let result
            try{
                const profile = await Profile.findByPk(id);
                if(profile == null) throw Boom.notFound();                
                profile.ProfileImageURL = filename;
                result = await profile.save()
            } catch(err) {
                console.error(err)
                throw err;
            }
            return result
        }
    }
}
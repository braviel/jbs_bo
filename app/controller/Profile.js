'use strict';
const Boom = require('Boom');

module.exports = (db) => {
    const Profile = db.getModel('Profile');    
    return {
        validate: async (profile) => {
            let passed = false;
            const City = db.getModel('City');
            const Country = db.getModel('Country');
            try{
                const country = await Country.findByPk(profile.CountryCode);
                const city = await City.findByPk(profile.CityCode);
                if(country === null) throw Boom.notFound(`Can not find Country with id ${profile.CountryCode}`);
                if(city === null) throw Boom.notFound(`Can not find City with id ${profile.CityCode}`);
                passed = true;
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message);
            }
            return passed;
        },
        list: async (opt) => {
            const profiles = await Profile.findAll();
            return profiles;
        },
        get: async (id) => {
            const profile = await Profile.findByPk(id);
            if (profile === null) throw Boom.notFound();
            return profile.get();
        },
        create: async (obj) => {
            let created;
            await validate(obj);
            try {
                created = await Profile.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return created;
        },
        delete: async (id) => {
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
        update: async (id, obj) => {
            let result;
            const profile = await Profile.findByPk(id);
            if (profile === null) throw Boom.notFound(`Can not find Profile with id "${id}"`);
            obj.ProfileUID = id;
            await validate(obj);
            try{
                result = await profile.update(obj);
            } catch (err) {
                console.log(err);
                throw Boom.badImplementation(err.message);
            }
            return result;
        },
    }
}
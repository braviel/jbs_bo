'use strict';
const Boom = require('Boom');

module.exports = (db) => {
    const Country = db.getModel('Country');
    return {
        list: async (opt) => {        
            const countries = await Country.findAll();
            return countries;
        },
        get: async (id) => {            
            const country = await Country.findByPk(id);
            if (country === null) throw Boom.notFound();
            return country.get();
        },
        create: async (country) => {
            let created;
            try {
                created = await Country.create(country);
            } catch(err) {
                console.error(err);
                throw Boom.expectationFailed(err.message, err);
            }
            return created;
        },
        delete: async (id) => {            
            const country = await Country.findByPk(id);
            if (country === null) throw Boom.notFound();
            const deleted = await Country.destroy({
                where: {CountryCode: id}
            });
            return deleted;
        },
        update: async (id, payload) => {            
            const country = await Country.findByPk(id);
            if (country === null) throw Boom.notFound(`Can not find Country with id "${id}"`);
            payload.CountryCode = id;
            await country.update(payload);
            return country.save();
        }
    }
}
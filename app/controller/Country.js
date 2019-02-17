'use strict';
const Boom = require('Boom');

module.exports = (db) => {
    const Country = db.getModel('Country');
    return {
        list: async function(opt) {
            const countries = await Country.findAll();
            return countries;
        },
        get: async function (id) {
            const country = await Country.findByPk(id);
            if (country === null) throw Boom.notFound();
            return country.get();
        },
        create: async function(country) {
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
        update: async function(id, payload) {
            const country = await Country.findByPk(id);
            if (country === null) throw Boom.notFound(`Can not find Country with id "${id}"`);
            payload.CountryCode = id;
            return await country.update(payload);
        }
    }
}
'use strict';
const Boom = require('Boom');

module.exports = (db) => {
    const City = db.getModel('City');
    const Country = db.getModel('Country');
    return {
        list: async (opt) => {        
            return await City.findAll();            
        },
        get: async (id) => {            
            const result = await City.findByPk(id);
            if (result === null) throw Boom.notFound();
            return result.get();
        },
        create: async (obj) => {
            let result;
            const country = await Country.findByPk(obj.CountryCode);
            if (country === null) throw Boom.notFound(`Can not find Country with code: ${obj.CountryCode}`);
            try {                
                result = await City.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.expectationFailed(err.message, err);
            }
            return result;
        },
        delete: async (id) => {            
            const city = await City.findByPk(id);
            if (city === null) throw Boom.notFound();
            const result = await City.destroy({
                where: {CityCode: id}
            });
            return result;
        },
        update: async (id, obj) => {            
            const city = await City.findByPk(id);
            if (city === null) throw Boom.notFound(`Can not find Country with id "${id}"`);
            const country = await Country.findByPk(obj.CountryCode);
            if (country === null) throw Boom.notFound(`Can not find Country with code: ${obj.CountryCode}`);
            obj.CityCode = id;
            return await city.update(obj);            
        }
    }
}
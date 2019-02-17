'use strict';
const Boom = require('Boom');

module.exports = (db) => {
    const Company = db.getModel('Company');
    return {
        checkDependency: async (obj) => {
            let passed = false;
            const City = db.getModel('City');
            const Country = db.getModel('Country');
            const country = await Country.findByPk(obj.CountryCode);
            const city = await City.findByPk(obj.CityCode);
            if(country === null) throw Boom.notFound(`Can not find Country with id ${obj.CountryCode}`);
            if(city === null) throw Boom.notFound(`Can not find City with id ${obj.CityCode}`);
            passed = true;
            return passed;
        },
        list: async (opt) => {        
            const company = await Company.findAll();
            return company;
        },
        get: async (id) => {            
            const company = await Company.findByPk(id);
            if (company === null) throw Boom.notFound();
            return company.get();
        },
        create: async (obj) => {
            let created;
            await checkDependency(obj);
            try {
                created = await Company.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.expectationFailed(err.message, err);
            }
            return created;
        },
        delete: async (id) => {            
            const company = await Company.findByPk(id);
            if (company === null) throw Boom.notFound();
            const deleted = await Company.destroy({
                where: {CompanyUID: id}
            });
            return deleted;
        },
        update: async (id, obj) => {            
            const company = await Company.findByPk(id);
            if (company === null) throw Boom.notFound(`Can not find Company with id "${id}"`);
            obj.CompanyUID = id;
            await company.update(obj);
            return company.save();
        }
    }
}
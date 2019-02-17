'use strict';
const Boom = require('Boom');

module.exports = (db) => {
    const Department = db.getModel('Department');    
    return {
        validate: async function (obj) {
            let passed = false;
            const City = db.getModel('City');
            const Company = db.getModel('Company');
            const company = await Company.findByPk(obj.CompanyCode);
            const city = await City.findByPk(obj.CityCode);
            if(company === null) throw Boom.notFound(`Can not find Company with id ${obj.CompanyCode}`);
            if(city === null) throw Boom.notFound(`Can not find City with id ${obj.CityCode}`);
            passed = true;
            return passed;
        },
        list: async function(opt) {
            const departments = await Department.findAll();
            return departments;
        },
        get: async function (id) {
            const department = await Department.findByPk(id);
            if (department === null) throw Boom.notFound();
            return department.get();
        },
        create: async function(obj) {
            let created;
            await this.validate(obj);
            try {
                created = await Department.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return created;
        },
        delete: async function(id) {
            let deleted;
            const department = await Department.findByPk(id);
            if (department === null) throw Boom.notFound();
            try{
                deleted = await Department.destroy({
                    where: {DepartmentUID: id}
                });
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return deleted;
        },
        update: async function (id, obj) {
            const department = await Department.findByPk(id);
            if (department === null) throw Boom.notFound(`Can not find Department with id "${id}"`);
            obj.DepartmentUID = id;
            await validate(obj);
            let result;
            try{
                result = await department.update(obj);
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return result;
        },
    }
}
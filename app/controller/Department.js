'use strict';
const Boom = require('Boom');

module.exports = (db) => {
    const Department = db.getModel('Department');    
    return {
        checkDependency: async (obj) => {
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
        list: async (opt) => {        
            const departments = await Department.findAll();
            return departments;
        },
        get: async (id) => {            
            const department = await Department.findByPk(id);
            if (department === null) throw Boom.notFound();
            return department.get();
        },
        create: async (obj) => {
            let created;
            await checkDependency(obj);
            try {
                created = await Department.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return created;
        },
        delete: async (id) => {            
            const department = await Department.findByPk(id);
            if (department === null) throw Boom.notFound();
            const deleted = await Department.destroy({
                where: {DepartmentUID: id}
            });
            return deleted;
        },
        update: async (id, obj) => {            
            const department = await Department.findByPk(id);
            if (department === null) throw Boom.notFound(`Can not find Department with id "${id}"`);
            obj.DepartmentUID = id;
            await checkDependency(obj);
            try{
                await department.update(obj);
            } catch (err) {
                console.log(err);
            } finally {
                return department.save();
            }
        },        
    }
}
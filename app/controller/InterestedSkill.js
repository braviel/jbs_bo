'use strict';
const Boom = require('Boom');

module.exports = (db) => {
    const InterestedSkill = db.getModel('InterestedSkill');    
    return {
        validate: async (obj) => {
            const InterestedArea = await db.getModel('InterestedArea');
            let area;
            try {
                area = InterestedArea.findByPk(obj.AreaCode);
                if(area == null) throw Boom.notFound(`Area Code: ${obj.AreaCode} not found`);
            } catch(err) {
                console.log(err);
                throw Boom.badImplementation(err.message);
            }
            return area;
        },
        list: async (opt) => {        
            return await InterestedSkill.findAll();            
        },
        get: async (id) => {            
            const result = await InterestedSkill.findByPk(id);
            if (result === null) throw Boom.notFound();
            return result.get();
        },
        create: async (obj) => {
            let result;
            await validate(obj);
            try {                
                result = await InterestedSkill.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.expectationFailed(err.message, err);
            }
            return result;
        },
        delete: async (id) => {
            let result;
            try {
                const skill = await InterestedSkill.findByPk(id);
                if (skill === null) throw Boom.notFound();
                result = await InterestedSkill.destroy({
                    where: {SkillCode: id}
                });
            } catch (err) {
                console.err(err);
                throw Boom.badImplementation(err.message);
            }
            return result;
        },
        update: async (id, obj) => {
            let result;
            try{
                const skill = await InterestedSkill.findByPk(id);
                if (skill === null) throw Boom.notFound(`Can not find InterestedArea with id "${id}"`);
                const area = await InterestedArea.findByPk(obj.AreaCode);
                if (area === null) throw Boom.notFound(`Can not find InterestedArea with code: ${obj.AreaCode}`);
                obj.SkillCode = id;
                result = await skill.update(obj);
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message);
            }
            return result;
        }
    }
}
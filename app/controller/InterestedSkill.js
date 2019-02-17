'use strict';
const Boom = require('Boom');

module.exports = (db) => {
    const InterestedSkill = db.getModel('InterestedSkill');
    const InterestedArea = db.getModel('InterestedArea');
    return {
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
            const area = await InterestedArea.findByPk(obj.AreaCode);
            if (area === null) throw Boom.notFound(`Can not find InterestedArea with code: ${obj.AreaCode}`);
            try {                
                result = await InterestedSkill.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.expectationFailed(err.message, err);
            }
            return result;
        },
        delete: async (id) => {            
            const skill = await InterestedSkill.findByPk(id);
            if (skill === null) throw Boom.notFound();
            const result = await InterestedSkill.destroy({
                where: {SkillCode: id}
            });
            return result;
        },
        update: async (id, obj) => {            
            const skill = await InterestedSkill.findByPk(id);
            if (skill === null) throw Boom.notFound(`Can not find InterestedArea with id "${id}"`);
            const area = await InterestedArea.findByPk(obj.AreaCode);
            if (area === null) throw Boom.notFound(`Can not find InterestedArea with code: ${obj.AreaCode}`);
            obj.CityCode = id;
            await skill.update(obj);
            return skill.save();
        }
    }
}
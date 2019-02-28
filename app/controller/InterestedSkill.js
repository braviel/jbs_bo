'use strict';
const Boom = require('boom');
const Sequelize = require('sequelize');
module.exports = (db) => {
    const InterestedSkill = db.getModel('InterestedSkill');
    return {
        validate: async function(obj) {
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
        list: async function(opt) {
            return await InterestedSkill.findAll();
        },
        get: async function(id) {
            const result = await InterestedSkill.findByPk(id);
            if (result === null) throw Boom.notFound();
            return result.get();
        },
        create: async function(obj) {
            let result;
            await this.validate(obj);
            try {
                result = await InterestedSkill.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.expectationFailed(err.message, err);
            }
            return result;
        },
        delete: async function(id) {
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
        update: async function(id, obj) {
            let result;
            try {
                const skill = await InterestedSkill.findByPk(id);
                if (skill === null) throw Boom.notFound(`Can not find InterestedArea with id "${id}"`);                
                await this.validate(obj);
                obj.SkillCode = id;
                result = await skill.update(obj);
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message);
            }
            return result;
        },
        listSKillByAreaId: async function (interestId) {
            const InterestedSkill = db.getModel('InterestedSkill');
            let skills;
            try {
                skills = await InterestedSkill.findAll({
                    include:[{
                        model: InterestedArea,
                        where: {
                            AreaCode: Sequelize.col('InterestedSkill.AreaCode')
                        }
                    }]
                });
                if (interestedArea === null) throw Boom.notFound();                
            } catch (err) {
                console.error(err);
                throw err;
            }
            return skills
        }
    }
}
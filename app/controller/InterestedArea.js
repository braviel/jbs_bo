'use strict';
const Boom = require('boom');
const Sequelize = require('sequelize');
module.exports = (db) => {
    const InterestedArea = db.getModel('InterestedArea');
    return {
        validate: async function () {

        },
        list: async function(opts) {
            return await InterestedArea.findAll();
        },
        get: async function(id) {
            const interestedArea = await InterestedArea.findByPk(id);
            if (interestedArea === null) throw Boom.notFound();
            return interestedArea.get();
        },
        create: async function(obj) {
            let created;
            try {
                created = await InterestedArea.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return created;
        },
        delete: async function (id) {
            const interestedArea = await InterestedArea.findByPk(id);
            if (interestedArea === null) throw Boom.notFound();
            let deleted;
            try{
                deleted = await InterestedArea.destroy({
                    where: {AreaCode: id}
                });
            } catch(err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return deleted;
        },
        update: async function(id, obj) {
            const interestedArea = await InterestedArea.findByPk(id);
            if (interestedArea === null) throw Boom.notFound(`Can not find InterestedArea with id "${id}"`);
            obj.AreaCode = id;
            let result;
            try {
                result = await interestedArea.update(obj);
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return result;
        },
        listSKillByAreaId: async function (areaId) {
            const InterestedSkill = db.getModel('InterestedSkill');
            let result;
            try {
                result = await InterestedArea.find({
                    attributes: [
                        Sequelize.col('InterestedSkills.*')
                    ],
                    where: {
                        AreaCode: areaId
                    },
                    include:[{
                        model: InterestedSkill
                    }]
                });
                // if (interestedArea === null) throw Boom.notFound();
            } catch (err) {
                console.error(err);
                throw err;
            }
            return result;
        }
    }
}
'use strict';
const Boom = require('Boom');

module.exports = (db) => {
    const InterestedArea = db.getModel('InterestedArea');
    return {
        list: async (opts) => {        
            return await InterestedArea.findAll();
        },
        get: async (id) => {            
            const interestedArea = await InterestedArea.findByPk(id);
            if (interestedArea === null) throw Boom.notFound();
            return interestedArea.get();
        },
        create: async (obj) => {
            let created;
            try {
                created = await InterestedArea.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.expectationFailed(err.message, err);
            }
            return created;
        },
        delete: async (id) => {            
            const interestedArea = await InterestedArea.findByPk(id);
            if (interestedArea === null) throw Boom.notFound();
            const deleted = await InterestedArea.destroy({
                where: {AreaCode: id}
            });
            return deleted;
        },
        update: async (id, obj) => {            
            const interestedArea = await InterestedArea.findByPk(id);
            if (interestedArea === null) throw Boom.notFound(`Can not find InterestedArea with id "${id}"`);
            obj.CountryCode = id;
            await interestedArea.update(obj);
            return interestedArea.save();
        }
    }
}
'use strict';
const Boom = require('boom');

module.exports = [
    {
        method: 'GET',
        path: '/api/city/{id}',
        config: {
            auth: false, //'token',
            handler: async (req, res) => {                
                const City = req.getModel('jbs','City');
                const city = await City.findById(req.params.id);                
                if (city === null) throw Boom.notFound();
                return city.get();
            }
        }
    }
]
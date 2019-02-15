'use strict';
const Boom = require('boom');

module.exports = [
    {
        method: 'GET',
        path: '/api/country',
        handler: async (req, res) => {
            const Country = req.getModel('jbs','Country');
            return Country.findAll();
        },
        config: {
            auth: false, //'token',
        }
    },
    {
        method: 'GET',
        path: '/api/country/{id}',
        handler: async (req, res) => {
            const Country = req.getModel('jbs','Country');
            const country = await Country.findById(req.params.id);
            if (country === null) throw Boom.notFound();
            return country.get();
        },
        config: {
            auth: false, //'token',
        }
    },
    {
        method: 'POST',
        path: 'api/country',
        handler: async (req, res) => {
            return '__';
        },
        config: {
            auth: false //'token'
        }
    }
]
'use strict';
const Boom = require('boom');
const Joi = require('joi');

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
            tags: ['api','country'],
            description: 'List All Country',
            notes: 'More implemetation note come here',
        }
    },
    {
        method: 'GET',
        path: '/api/country/{id}',
        handler: async (req, res) => {
            const Country = req.getModel('Country');
            const country = await Country.findById(req.params.id);
            if (country === null) throw Boom.notFound();
            return country.get();
        },
        config: {
            auth: false, //'token',
            tags: ['api','country'],
            description: 'Get Country by Id',
            notes: 'More implemetation note come here',
            validate: {
                params: {
                    id: Joi.number()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/country',
        handler: async (req, res) => {
            const Country = req.getModel('Country');
            // const country = Country.build(req.payload);
            // return country.save();
            const country = await Country.create(req.payload);                
            return country;
                
            // return req.payload;
        },
        config: {
            auth: false, //'token'
            tags: ['api','country'],
            description: 'Create new Country',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    CountryCode: Joi.number(),
                    CountryName: Joi.string(),
                    CallingCode: Joi.string()
                })
            }
        }
    },// CREATE
    {
        method: 'DELETE',
        path: '/api/country/{id}',
        handler: async (req, res) => {
            const Country = req.getModel('Country');
            const country = await Country.findById(req.params.id);
            if (country === null) throw Boom.notFound();
            const deleted = await Country.destroy({
                where: {CountryCode: req.params.id}
            });
            return deleted;
        },
        config: {
            auth: false, //'token',
            tags: ['api','country'],
            description: 'Delete Country by Id',
            notes: 'More implemetation note come here',
            validate: {
                params: {
                    id: Joi.number()
                }
            }
        }
    },//DELETE
]
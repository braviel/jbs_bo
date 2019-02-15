'use strict';
const Boom = require('boom');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/api/country',
        handler:  (req, res) => {
            const Country = req.getModel('Country');
            const countries =  Country.findAll();
            return countries;
        },
        config: {
            auth: false, //'token',
            tags: ['api','country'],
            description: 'List All Country',
            notes: 'More implemetation note come here',
        }
    },// LIST
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
                },
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },//GET
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
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
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
                },
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },//DELETE
    {
        method: ['PUT', 'PATCH'],
        path: '/api/country/{id}',
        handler: async (req, res) => {
            const Country = req.getModel('Country');
            const country = await Country.findById(req.params.id);
            if (country === null) throw Boom.notFound(`Can not find Country with id "${req.params.id}"`);
            req.payload.CountryCode = req.params.id;
            await country.update(req.payload);
            return country.save();
                
            // return req.payload;
        },
        config: {
            auth: false, //'token'
            tags: ['api','country'],
            description: 'Update Country',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                params: {
                    id: Joi.number()
                },
                payload: Joi.object({                    
                    CountryName: Joi.string(),
                    CallingCode: Joi.string()
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// UPDATE
]
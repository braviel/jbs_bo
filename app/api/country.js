'use strict';
const Boom = require('boom');
const Joi = require('joi');
const Country = require('../controller/Country');

module.exports = [
    {
        method: 'GET',
        path: '/country',
        handler: async (req, res) => {            
            return await Country(req.getDb()).list();
        },
        config: {
            auth: false, //'token',
            tags: ['api','country'],
            description: 'List All Country',
            notes: 'More implemetation note come here',
        }
    },// LIST
    {//GET
        method: 'GET',
        path: '/country/{id}',
        handler: async (req, res) => {            
            return await Country(req.getDb()).get(req.params.id);
        },
        config: {
            auth: false, //'token',
            tags: ['api','country'],
            description: 'Get Country by Id',
            notes: 'More implemetation note come here',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },//GET
    {//CREATE
        method: 'POST',
        path: '/country',
        handler: async (req, res) => {
            return await Country(req.getDb()).create(req.payload);
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
    {//DELETE
        method: 'DELETE',
        path: '/country/{id}',
        handler: async (req, res) => {            
            return await Country(req.getDb()).delete(req.params.id);
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
    {//UPDATE
        method: ['PUT', 'PATCH'],
        path: '/country/{id}',
        handler: async (req, res) => {
            return await Country(req.getDb()).update(req.params.id, req.payload);
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
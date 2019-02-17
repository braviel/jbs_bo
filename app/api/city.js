'use strict';
const Boom = require('boom');
const Joi = require('joi');
const City = require('../controller/City');
module.exports = [
    {//LIST
        method: 'GET',
        path: '/city',
        handler: async (req, res) => {
            return City(req.getDb()).list();
        },
        config: {
            auth: false, //'token',
            tags: ['api','city'],
            description: 'List All Cities',
            notes: 'More implemetation note come here',
        }
    },//LIST
    {//GET
        method: 'GET',
        path: '/city/{id}',
        handler: async (req, res) => {            
            return City(req.getDb()).get(req.params.id);
        },
        config: {
            auth: false, //'token',
            tags: ['api','city'],
            description: 'Get City by Id',
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
    {//CREATE
        method: 'POST',
        path: '/city',
        handler: async (req, res) => {         
            return City(req.getDb()).create(req.payload);
        },
        config: {
            auth: false, //'token'
            tags: ['api','city'],
            description: 'Create new city',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    CityCode: Joi.number(),
                    CityName: Joi.string(),
                    CountryCode: Joi.number()
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// CREATE
    {
        method: 'DELETE',
        path: '/city/{id}',
        handler: async (req, res) => {    
            return City(req.getDb()).delete(req.params.id);
        },
        config: {
            auth: false, //'token',
            tags: ['api','city'],
            description: 'Delete city by Id',
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
    {// UPDATE
        method: ['PUT', 'PATCH'],
        path: '/city/{id}',
        handler: async (req, res) => {
            return City(req.getDb()).update(req.params.id, req.payload);
        },
        config: {
            auth: false, //'token'
            tags: ['api','city'],
            description: 'Update city',
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
                    CityName: Joi.string(),
                    CountryCode: Joi.number()
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// UPDATE
]
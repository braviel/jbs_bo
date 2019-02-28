'use strict';
const Boom = require('boom');
const Joi = require('joi');
const InterestedArea = require('../controller/InterestedArea');

module.exports = [
    {
        method: 'GET',
        path: '/interestedarea',
        handler: async (req, res) => {
            return await InterestedArea(req.getDb()).list();
        },
        config: {
            auth: false, //'token',
            tags: ['api','AreaInterest'],
            description: 'List All Interest',
            notes: 'More implemetation note come here',
        }
    },// LIST
    {//GET
        method: 'GET',
        path: '/interestedarea/{id}',
        handler: async (req, res) => {
            return await InterestedArea(req.getDb()).get(req.params.id);;
        },
        config: {
            auth: false, //'token',
            tags: ['api','InterestedArea'],
            description: 'Get InterestedArea by Id',
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
        path: '/interestedarea',
        handler: async (req, res) => {
            return await InterestedArea(req.getDb()).create(req.payload);
        },
        config: {
            auth: false, //'token'
            tags: ['api','AreaInterest'], 
            description: 'Create new area Interest',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({                    
                    AreaName: Joi.string()
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// CREATE
    {//DELETE
        method: 'DELETE',
        path: '/interestedarea/{id}',
        handler: async (req, res) => {
            return await InterestedArea(req.getDb()).delete(req.params.id);;
        },
        config: {
            auth: false, //'token',
            tags: ['api','InterestedArea'],
            description: 'Delete interest by Id',
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
        path: '/interestedarea/{id}',
        handler: async (req, res) => {
            return await InterestedArea(req.getDb()).update(req.params.id, req.payload);
        },
        config: {
            auth: false, //'token'
            tags: ['api','InterestedArea'],
            description: 'Update Interest',
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
                    AreaName: Joi.string()
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// UPDATE
    {
        method: 'GET',
        path: '/interestedarea/{id}/skills',
        handler: async (req, res) => {
            let result;
            try {
                result = await InterestedArea(req.getDb()).listSKillByAreaId(req.params.id);
            } catch(err) {
                console.error(err);
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token',
            tags: ['api','AreaInterest'],
            description: 'List All Interest',
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
    },// LIST
]
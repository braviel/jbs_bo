'use strict';
const Boom = require('boom');
const Joi = require('joi');
const InterestedArea = require('../controller/InterestedArea');

module.exports = [
    {
        method: 'GET',
        path: '/interest',
        handler:  (req, res) => {
            return InterestedArea(req.getDb()).list();
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
        path: '/interest/{id}',
        handler: async (req, res) => {
            return InterestedArea(req.getDb()).get(req.params.id);;
        },
        config: {
            auth: false, //'token',
            tags: ['api','AreaInterest'],
            description: 'Get AreaInterest by Id',
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
        path: '/interest',
        handler: async (req, res) => {
            return InterestedArea(req.getDb()).create(req.payload);
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
        path: '/interest/{id}',
        handler: async (req, res) => {
            return InterestedArea(req.getDb()).delete(req.params.id);;
        },
        config: {
            auth: false, //'token',
            tags: ['api','AreaInterest'],
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
        path: '/interest/{id}',
        handler: async (req, res) => {
            return InterestedArea(req.getDb()).update(req.params.id, req.payload);
        },
        config: {
            auth: false, //'token'
            tags: ['api','AreaInterest'],
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
]
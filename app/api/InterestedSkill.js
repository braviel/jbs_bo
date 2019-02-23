'use strict';
const Boom = require('boom');
const Joi = require('joi');
const InterestedSkill = require('../controller/InterestedSkill');
module.exports = [
    {
        method: 'GET',
        path: '/skill',
        handler:  (req, res) => {
            return InterestedSkill(req.getDb()).list();
        },
        config: {
            auth: false, //'token',
            tags: ['api','AreaSkill'],
            description: 'List All Skill',
            notes: 'More implemetation note come here',
        }
    },// LIST
    {//GET
        method: 'GET',
        path: '/skill/{id}',
        handler: async (req, res) => {
            return await InterestedSkill(req.getDb()).get(req.params.id);
        },
        config: {
            auth: false, //'token',
            tags: ['api','AreaSkill'],
            description: 'Get AreaSkill by Id',
            notes: 'More implemetation note come here',
            validate: {
                params: {
                    id: Joi.number().integer()
                },
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },//GET
    {//CREATE
        method: 'POST',
        path: '/skill',
        handler: async (req, res) => {
            return await InterestedSkill(req.getDb()).create(req.payload);
        },
        config: {
            auth: false, //'token'
            tags: ['api','AreaSkill'], 
            description: 'Create new Area Skill',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({                    
                    SkillName: Joi.string(),
                    AreaCode: Joi.number().integer()
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// CREATE
    {//DELETE
        method: 'DELETE',
        path: '/skill/{id}',
        handler: async (req, res) => {
            return await InterestedSkill(req.getDb()).delete(req.parms.id);
        },
        config: {
            auth: false, //'token',
            tags: ['api','AreaSkill'],
            description: 'Delete skill by Id',
            notes: 'More implemetation note come here',
            validate: {
                params: {
                    id: Joi.number().integer()
                },
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },//DELETE
    {//UPDATE
        method: ['PUT', 'PATCH'],
        path: '/skill/{id}',
        handler: async (req, res) => {
            return await InterestedSkill(req.getDb()).update(req.parms.id, req.payload);
        },
        config: {
            auth: false, //'token'
            tags: ['api','AreaSkill'],
            description: 'Update Skill',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                params: {
                    id: Joi.number().integer()
                },
                payload: Joi.object({
                    SkillName: Joi.string(),
                    AreaCode: Joi.number().integer(),
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// UPDATE
]
'use strict';
const Boom = require('boom');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/skill',
        handler:  (req, res) => {
            const AreaSkill = req.getModel('AreaSkill');
            const skills =  AreaSkill.findAll();
            return skills;
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
            const AreaSkill = req.getModel('AreaSkill');
            const areaSkill = await AreaSkill.findByPk(req.params.id);
            if (areaSkill === null) throw Boom.notFound(`Can not find Skill with id ${req.params.id}`);
            return areaSkill.get();
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
            const AreaSkill = req.getModel('AreaSkill');
            const AreaInterest = req.getModel('AreaInterest');
            const areaInterest = await AreaInterest.findByPk(req.payload.AreaInterestCode);
            if (areaInterest == null) throw Boom.notFound(`Can not find Area Interest with id ${req.payload.AreaInterestCode}`);
            console.log('GOT IT: ' + areaInterest.AreaInterestCode);
            const areaSkill = await AreaSkill.build(req.payload);
            return areaSkill.save();
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
                    AreaSkillName: Joi.string(),
                    AreaInterestCode: Joi.number().integer()
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
            const AreaSkill = req.getModel('AreaSkill');
            const areaSkill = await AreaSkill.findById(req.params.id);
            if (areaSkill === null) throw Boom.notFound(`Can not find skill with id ${req.params.id}`);
            const deleted = await AreaSkill.destroy({
                where: {AreaSkillCode: req.params.id}
            });
            return deleted;
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
            const AreaSkill = req.getModel('AreaSkill');
            const areaSkill = await AreaSkill.findById(req.params.id);
            if (areaSkill === null) throw Boom.notFound(`Can not find skill with id "${req.params.id}"`);
            req.payload.AreaSkillCode = req.params.id;
            await areaSkill.update(req.payload);
            return areaSkill.save();
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
                    AreaSkillName: Joi.string(),
                    AreaInterestCode: Joi.number().integer(),
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// UPDATE
]
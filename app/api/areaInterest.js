'use strict';
const Boom = require('boom');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/interest',
        handler:  (req, res) => {
            const AreaInterest = req.getModel('AreaInterest');
            const interests =  AreaInterest.findAll();
            return interests;
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
            const AreaInterest = req.getModel('AreaInterest');
            const areaInterest = await AreaInterest.findByPk(req.params.id);
            if (areaInterest === null) throw Boom.notFound(`Can not find Interest with id ${req.params.id}`);
            return areaInterest.get();
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
            const AreaInterest = req.getModel('AreaInterest');
            req.payload.InterestCode = null;
            const areaInterest = await AreaInterest.create(req.payload);
            return areaInterest;
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
                    AreaInterestName: Joi.string()
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
            const AreaInterest = req.getModel('AreaInterest');
            const areaInterest = await AreaInterest.findById(req.params.id);
            if (areaInterest === null) throw Boom.notFound();
            const deleted = await AreaInterest.destroy({
                where: {AreaInterestCode: req.params.id}
            });
            return deleted;
        },
        config: {
            auth: false, //'token',
            tags: ['api','AreaInterest'],
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
    {//UPDATE
        method: ['PUT', 'PATCH'],
        path: '/interest/{id}',
        handler: async (req, res) => {
            const AreaInterest = req.getModel('AreaInterest');
            const areaInterest = await AreaInterest.findById(req.params.id);
            if (areaInterest === null) throw Boom.notFound(`Can not find City with id "${req.params.id}"`);
            req.payload.AreaInterestCode = req.params.id;
            await areaInterest.update(req.payload);
            return areaInterest.save();
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
                    AreaInterestName: Joi.string()
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// UPDATE
]
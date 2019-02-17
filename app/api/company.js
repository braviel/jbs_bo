'use strict';
const Boom = require('boom');
const Joi = require('joi');
const Company = require('../controller/Company');

module.exports = [
    {
        method: 'GET',
        path: '/company',
        handler: async (req, res) => {            
            return Company(req.getDb()).list();
        },
        config: {
            auth: false, //'token',
            tags: ['api','company'],
            description: 'List All Country',
            notes: 'More implemetation note come here',
        }
    },// LIST
    {//GET
        method: 'GET',
        path: '/company/{id}',
        handler: async (req, res) => {            
            return Company(req.getDb()).get(req.params.id);
        },
        config: {
            auth: false, //'token',
            tags: ['api','company'],
            description: 'Get company by Id',
            notes: 'More implemetation note come here',
            validate: {
                params: {
                    id: Joi.string()
                },
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },//GET
    {//CREATE
        method: 'POST',
        path: '/company',
        handler: async (req, res) => {
            return Company(req.getDb()).create(req.payload);
        },
        config: {
            auth: false, //'token'
            tags: ['api','company'],
            description: 'Create new company',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    CompanyUID: Joi.string(),
                    CompanyPhone: Joi.string(),
                    CompanyEmail: Joi.string(),
                    CompanyUEN: Joi.string(),
                    CompanyLogo: Joi.binary().optional(),
                    CompanyName: Joi.string(),
                    BuildingName: Joi.string(),
                    Address1: Joi.string(),
                    Address2: Joi.string(),
                    PostalCode: Joi.string(),
                    CityCode: Joi.string(),
                    CountryCode: Joi.string()
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// CREATE
    {//DELETE
        method: 'DELETE',
        path: '/company/{id}',
        handler: async (req, res) => {            
            return Company(req.getDb()).delete(req.params.id);
        },
        config: {
            auth: false, //'token',
            tags: ['api','company'],
            description: 'Delete Country by Id',
            notes: 'More implemetation note come here',
            validate: {
                params: {
                    id: Joi.string()
                },
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },//DELETE
    {//UPDATE
        method: ['PUT', 'PATCH'],
        path: '/company/{id}',
        handler: async (req, res) => {
            return Company(req.getDb()).update(req.params.id, req.payload);
        },
        config: {
            auth: false, //'token'
            tags: ['api','company'],
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
                    CompanyUID: Joi.string(),
                    CompanyPhone: Joi.string(),
                    CompanyEmail: Joi.string(),
                    CompanyUEN: Joi.string(),
                    CompanyLogo: Joi.binary().optional(),
                    CompanyName: Joi.string(),
                    BuildingName: Joi.string(),
                    Address1: Joi.string(),
                    Address2: Joi.string(),
                    PostalCode: Joi.string(),
                    CityCode: Joi.string(),
                    CountryCode: Joi.string()
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// UPDATE
]
'use strict';
const Boom = require('boom');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/city',
        handler:  (req, res) => {
            const City = req.getModel('City');
            const city =  City.findAll();
            return city;
        },
        config: {
            auth: false, //'token',
            tags: ['api','city'],
            description: 'List All Cities',
            notes: 'More implemetation note come here',
        }
    },// LIST
    {
        method: 'GET',
        path: '/city/{id}',
        handler: async (req, res) => {
            const City = req.getModel('City');
            const city = await City.findById(req.params.id);
            if (city === null) throw Boom.notFound(`Can not find city with id ${req.params.id}`);
            return city.get();
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
            const City = req.getModel('City');
            const Country = req.getModel('Country');            
            const country = await Country.findByPk(req.payload.CountryCode);
            if(country === null) throw Boom.notFound(`Unknow Country with id ${req.payload.CountryCode}`);
            const city = await City.create(req.payload);
            return city;
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
            const City = req.getModel('City');
            const city = await City.findById(req.params.id);
            if (city === null) throw Boom.notFound();
            const deleted = await City.destroy({
                where: {CityCode: req.params.id}
            });
            return deleted;
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
    {
        method: ['PUT', 'PATCH'],
        path: '/city/{id}',
        handler: async (req, res) => {
            const City = req.getModel('City');
            const city = await City.findById(req.params.id);
            if (city === null) throw Boom.notFound(`Can not find City with id "${req.params.id}"`);
            req.payload.CityCode = req.params.id;
            await city.update(req.payload);
            return city.save();
                
            // return req.payload;
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
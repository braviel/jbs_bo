'use strict';
const Boom = require('boom');
const Joi = require('joi');
const Profile = require('../controller/Profile');
const ProfileValidator = require('../validator/Profile.Validator');
module.exports = [
    {
        method: 'GET',
        path: '/profile',
        handler:  (req, res) => {
            return Profile(req.getDb()).list();
        },
        config: {
            auth: false, //'token',
            tags: ['api','profile'],
            description: 'List all Profile',
            notes: 'More implemetation note come here',
        }
    },// LIST
    {// GET
        method: 'GET',
        path: '/profile/{id}',
        handler:  (req, res) => {
            return Profile(req.getDb()).get(req.params.id);
        },
        config: {
            auth: false, //'token',
            tags: ['api','profile'],
            description: 'Get Profile by id',
            notes: 'More implemetation note come here',
        }
    },// GET
    {// CREATE
        method: 'POST',
        path: '/profile',
        handler:  (req, res) => {
            return Profile(req.getDb()).create(req.payload);
        },
        config: {
            auth: false, //'token',
            tags: ['api','profile'],
            description: 'create Profile',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: ProfileValidator.onCreateValidator,
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// CREATE
    {//DELETE
        method: 'DELETE',
        path: '/profile/{id}',
        handler: async (req, res) => {            
            return Company(req.getDb()).delete(req.params.id);
        },
        config: {
            auth: false, //'token',
            tags: ['api','profile'],
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
        path: '/profile/{id}',
        handler: async (req, res) => {
            return Company(req.getDb()).update(req.params.id, req.payload);
        },
        config: {
            auth: false, //'token'
            tags: ['api','company'],
            description: 'Update profile',
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
                payload: ProfileValidator.onUpdateValidator,
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// UPDATE
]
//     );
// }

// module.exports = {
//     name: 'api-profile',
//     version: '0.0.1',
//     register
// }
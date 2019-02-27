'use strict';
const Boom = require('boom');
const Joi = require('joi');
const Profile = require('../controller/Profile');
const ProfileValidator = require('../validator/Profile.Validator');
const fs = require('fs');
module.exports = [
    {
        method: 'GET',
        path: '/profile',
        handler: async (req, res) => {
            let result;
            try {
                result = await Profile(req.getDb()).list();
            } catch(err) {
                console.error(err);
                throw err;
            }
            return result;
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
        handler: async (req, res) => {
            let result;
            try {
                result = await Profile(req.getDb()).get(req.params.id);
            } catch(err) {
                throw err;
            }
            return result
        },
        config: {
            auth: false, //'token',
            tags: ['api','profile'],
            description: 'Get Profile by id',
            notes: 'More implemetation note come here',
            validate: {
                params: {
                    id: Joi.string().required()
                },
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// GET
    {// CREATE
        method: 'POST',
        path: '/profile',
        handler: async (req, res) => {
            let profile;
            try {
                profile = await Profile(req.getDb()).create(req.payload);
            } catch (err) {
                console.error(err);
                throw err;
            }
            return profile;
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
            let result;
            try {
                result = await Profile(req.getDb()).delete(req.params.id);
            } catch(err) {
                console.error(err);
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token',
            tags: ['api','profile'],
            description: 'Delete Country by Id',
            notes: 'More implemetation note come here',
            validate: {
                params: {
                    id: Joi.string().required()
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
            let result;
            try{
                result = await Profile(req.getDb()).update(req.params.id, req.payload);
            } catch (err) {
                console.error(err);
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token'
            tags: ['api','profile'],
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
    {// UPLOAD Photo
        method: 'POST',
        path: '/profile/{id}/avatar',
        handler: async (req, res) => {
            let result
            try{                
                const data = req.payload;
                const fileData = data.ProfilePhoto;
                result = await Profile(req.getDb()).updatePhoto(req.payload.ProfileUID, fileData);
            } catch(err) {
                console.log(err);
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token',            
            tags: ['api','profile'],
            description: 'create Profile Avatar',
            notes: 'More implemetation note come here',         
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 10971520,
            },
            validate: {
                payload: ({
                    ProfileUID: Joi.string().required(),
                    ProfilePhoto: Joi.any().meta({ swaggerType: 'file' })
                })
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
        }
    },// Upload Photo
    {// GET Photo
        method: 'GET',
        path: '/profile/{id}/avatar',
        handler: async (req, h) => {
            let result;
            try {
                const profile = await Profile(req.getDb()).get(req.params.id);
                const filePath = process.env.UPLOAD_PATH + profile.ProfileImageURL;
                console.error(`@@ Server File : ${filePath}`);            
                const stats = fs.statSync(filePath)
                const fileSizeInBytes = stats.size;
                result = h.file(filePath);
            } catch(err) {
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token',
            tags: ['api','profile'],
            description: 'Get Profile avatar by id',
            notes: 'More implemetation note come here',            
            validate: {
                params: {
                    id: Joi.string().required()
                },                
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// GET Photo
]
//     );
// }

// module.exports = {
//     name: 'api-profile',
//     version: '0.0.1',
//     register
// }
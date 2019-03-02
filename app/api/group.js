'use strict';
const Boom = require('boom');
const Joi = require('joi');
const Group = require('../controller/Group');
const GroupValidator = require('../validator/Group.Validator');
const fs = require('fs');
module.exports = [
    {
        method: 'GET',
        path: '/group',
        handler: async (req, res) => {
            let result;
            try {
                result = await Group(req.getDb()).list();
            } catch(err) {
                console.error(err);
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token',
            tags: ['api','group'],
            description: 'List all Group',
            notes: 'More implemetation note come here',
        }
    },// LIST
    {
        method: 'GET',
        path: '/group/listByMemberId/{profileUID}',
        handler: async (req, res) => {
            let result;
            try {
                result = await Group(req.getDb()).listByMemberId(req.params.profileUID);
            } catch(err) {
                console.error(err);
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token',
            tags: ['api','group'],
            description: 'List all Group',
            notes: 'More implemetation note come here',
            validate: {
                params: {
                    profileUID: Joi.string()
                }
            }
        }
    },// LIST
    {// GET
        method: 'GET',
        path: '/group/{id}',
        handler: async (req, res) => {
            let result;
            try {
                result = await Group(req.getDb()).get(req.params.id);
            } catch(err) {
                throw err;
            }
            return result
        },
        config: {
            auth: false, //'token',
            tags: ['api','group'],
            description: 'Get Group by id',
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
        path: '/group/{creatorID}',
        handler: async (req, res) => {
            let group;
            try {
                group = await Group(req.getDb()).create(req.payload, req.params.creatorID);
            } catch (err) {
                console.error(err);
                throw err;
            }
            return group;
        },
        config: {
            auth: false, //'token',
            tags: ['api','group'],
            description: 'create Group',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                params: {
                    creatorID: Joi.string()
                },
                payload: GroupValidator.onCreateValidator,
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// CREATE
    {//DELETE
        method: 'DELETE',
        path: '/group/{id}',
        handler: async (req, res) => {            
            let result;
            try {
                result = await Group(req.getDb()).delete(req.params.id);
            } catch(err) {
                console.error(err);
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token',
            tags: ['api','group'],
            description: 'Delete group by Id',
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
        path: '/group/{id}',
        handler: async (req, res) => {
            let result;
            try{
                result = await Group(req.getDb()).update(req.params.id, req.payload);
            } catch (err) {
                console.error(err.message);
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token'
            tags: ['api','group'],
            description: 'Update group',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                params: {
                    id: Joi.string()
                },
                payload: GroupValidator.onUpdateValidator,
                failAction: async (request, h, err) => {
                    console.error('validation message : ' + err.message);
                    throw Boom.badData(err.message);
                }
            }
        }
    },// UPDATE
    {// UPLOAD Photo
        method: 'POST',
        path: '/group/{id}/avatar',
        handler: async (req, res) => {
            let result
            try{                
                const data = req.payload;
                const fileData = data.ProfilePhoto;
                result = await Group(req.getDb()).updatePhoto(req.payload.ProfileUID, fileData);
            } catch(err) {
                console.log(err);
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token',
            tags: ['api','group'],
            description: 'create Group Avatar',
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
        path: '/group/{id}/avatar',
        handler: async (req, h) => {
            let result;
            try {
                const profile = await Group(req.getDb()).get(req.params.id);
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
            tags: ['api','group'],
            description: 'Get Group avatar by id',
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
    {// INVITE
        method: ['POST'],
        path: '/group/{groupUID}/invite/{profileUID}/isAdmin/{isAmin}',
        handler: async (req, res) => {
            let result;
            try{
                result = await Group(req.getDb()).invite(req.params.groupUID, 
                            req.params.groupUID,
                            req.params.isAdmin);
            } catch (err) {
                console.error(err.message);
                throw err;
            }
            return result;
        },
        config: {
            auth: false, //'token'
            tags: ['api','group'],
            description: 'Invite Member to group',
            notes: 'More implemetation note come here',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                params: {
                    groupUID: Joi.string().required(),
                    profileUID: Joi.string().required(),
                    isAdmin: Joi.string()
                },                
                failAction: async (request, h, err) => {
                    console.error('validation message : ' + err.message);
                    throw Boom.badData(err.message);
                }
            }
        }
    },// INVITE
]
//     );
// }

// module.exports = {
//     name: 'api-profile',
//     version: '0.0.1',
//     register
// }
'use strict';
const Boom = require('boom');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/profile',
        handler:  (req, res) => {
            const Profile = req.getModel('Profile');
            const profile =  Profile.findAll();
            return profile;
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
            const Profile = req.getModel('Profile');
            const profile =  Profile.findByPk(req.params.id);
            return profile;
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
            const Profile = req.getModel('Profile');
            const profile =  Profile.findAll();
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
                payload: Joi.object({
                    ProfileUID: Joi.string(),
                    ProfilePhone: Joi.string(),
                    PhoneEmail: Joi.number()
                }),
                failAction: async (request, h, err) => {
                    throw Boom.badData(err);
                }
            }
        }
    },// CREATE
]
//     );
// }

// module.exports = {
//     name: 'api-profile',
//     version: '0.0.1',
//     register
// }
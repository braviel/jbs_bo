'use strict';
const db = require('hapi-sequelizejs').instances.getDb;
const Joi = require('joi');
// const register = function (server, serverOptions) {
//     server.route(
module.exports = [
    {
        method: 'GET',
        path: '/api',
        config: {
            tags: ['api','main'],
            description: 'Test if API is accessible. [No Scope]',
            notes: 'Test if API is accessible.',
            auth: 'token',
            validate: {
                headers: {
                    Authorization: Joi.string()
                },
                query: {
                    token: Joi.string()
                }
            }
        },
        handler: function (request, h) {
            return {
                message: 'Welcome to the JBS API.'
            };
        }
    },
    {
        method: 'GET',
        path: '/api/testdb',
        options: {
            tags: ['api','db'],
            description: 'Test if DB connection is accessible. [No Scope]',
            notes: 'Test if DB connection is accessible.',
            auth: false
        },
        handler: function (request, h) {
            const Country = request.getModel('Country');
            Country.sync({force: false}).then(() => {
                return Country.create({
                CountryCode: 84,
                CountryName: 'VietNam',
                CallingCode: '+84'
                });
            });
            return 'tested';
        }
    }
]
//     );
// };
// module.exports = {
//     name: 'api-main',
//     dependencies: [],
//     register
// };

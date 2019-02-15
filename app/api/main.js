'use strict';
const db = require('hapi-sequelizejs').instances.getDb

// const register = function (server, serverOptions) {
//     server.route(
module.exports = [
    {
        method: 'GET',
        path: '/api',
        options: {
            tags: ['api','main'],
            description: 'Test if API is accessible. [No Scope]',
            notes: 'Test if API is accessible.',
            auth: false
        },
        handler: function (request, h) {
            return {
                message: 'Welcome to the JBS API.'
            };
        }
    },
    {
        method: 'GET',
        path: '/testdb',
        options: {
            tags: ['api','db'],
            description: 'Test if DB connection is accessible. [No Scope]',
            notes: 'Test if DB connection is accessible.',
            auth: false
        },
        handler: function (request, h) {
            const Country = request.getModel('jbs', 'Country');
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

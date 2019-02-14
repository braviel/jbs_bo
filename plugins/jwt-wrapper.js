'use strict';
const hapiJWT = require('hapi-auth-jwt2');
const JwtValidator = require('../app/validator/jwtvalidator')
const JWT_SECRET = 'secretapi';

module.exports = {
    name: 'jwt-wrapper',
    version: '0.0.1',
    register: async(server, options) => {
        server.register(hapiJWT);
        server.auth.strategy('token', 'jwt', {
            key: 'apisecret',
            validate: JwtValidator,
            verifyOptions: {
                algorithms: ['HS256']
            }
        });        
    }
}


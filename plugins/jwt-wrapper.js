'use strict';
const hapiJWT = require('hapi-auth-jwt2');
const JwtValidator = require('../app/validator/jwtvalidator')
const JWT_SECRET = 'secretapi';


const register = function(server, options) {
        server.register(hapiJWT);
        server.auth.strategy('token', 'jwt', {
            key: JWT_SECRET,
            validate: JwtValidator,
            verifyOptions: {
                algorithms: ['HS256']
            }
        });
    }


module.exports = {
    name: 'jwt-wrapper',
    version: '0.0.1',
    register
}


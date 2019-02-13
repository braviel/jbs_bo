'use strict';
const Glue = require('glue');
const manifest = require('./manifest');

const options = {
    relativeTo: __dirname
};
// const server = require('./server');
// const JWT = require('jsonwebtoken');
// const glob = require('glob');
// const db = require('./db/db');
// const path = require('path');
// const JwtValidator = require('./app/validator/jwtvalidator')
// const jwt = JWT.sign({id:1}, 'apisecret');
// console.log(`Token: ${jwt}`);
const start = async () => {    
    // await server.register({
    //     plugin: require('hapi-pino'),
    //     options: {
    //         prettyPrint: true,
    //         logEvents: ['response', 'onPostStart']
    //     }
    // });
    // 
    //
    // await server.register( require('hapi-auth-jwt2') );
    // server.auth.strategy('token', 'jwt', {
    //     key: 'apisecret',
    //     validate: JwtValidator,
    //     verifyOptions: {
    //         algorithm: 'HS256'
    //     }
    // });    

    // glob.sync('app/api/**/routes/*.js', {
    //     root: __dirname
    // }).forEach(file => {
    //     const route = require(path.join(__dirname, file));
    //     server.route(route);
    //     console.log(`@@@ Route: ${path.join(__dirname, file)}.`);
    // });

    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     config: {auth: false},
    //     handler: (request, h) => {
    //         console.log('resp');
    //         return `Pong!`;
    //     }
    // });
    // server.route({
    //     method: 'GET',
    //     path: '/api',
    //     config: {auth: 'token'},
    //     handler: (request, h) => {
    //         console.log('resp');
    //         return `Pong!`;
    //     }
    // });
    try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    console.log(`Server running at : ${server.info.uri}`);
    } catch (err) {
        console.log(`Starting server failed: ${err}`);
        process.exit(1);
    }
    
}


process.on('unhandledRejection', (err) => {
    console.log('DEVLOG: ' + err);
    process.exit(1);
});

start();
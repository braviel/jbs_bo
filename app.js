const server = require('./server');
const JWT = require('jsonwebtoken');
const db = require('./db/db');

const jwt = JWT.sign({id:1}, 'apisecret');
console.log(`Token: ${jwt}`);
const init = async () => {    
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    });
    //
    const validate = function(decoded, request, h) {
        console.log(" - - - - - - - decoded token:");
        console.log(decoded);
        console.log(" - - - - - - - request info:");
        console.log(request.info);
        console.log(" - - - - - - - user agent:");
        console.log(request.headers['user-agent']);
        console.log(" - - - - - - - Authorization:");
        console.log(request.headers['Authorization']);
        return { isValid: true };
    };
    await server.register( require('hapi-auth-jwt2') );
    server.auth.strategy('token', 'jwt', {
        key: 'apisecret',
        validate: validate,
        verifyOptions: {
            algorithm: 'HS256'
        }
    });    

    server.route({
        method: 'GET',
        path: '/',
        config: {auth: false},
        handler: (request, h) => {
            console.log('resp');
            return `Pong!`;
        }
    });
    server.route({
        method: 'GET',
        path: '/api',
        config: {auth: 'token'},
        handler: (request, h) => {
            console.log('resp');
            return `Pong!`;
        }
    });

    await server.start();
    console.log(`Server running at : ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log('DEVLOG: ' + err);
    process.exit(1);
});

init();
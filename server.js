'use strict';
const Hapi = require('hapi');

const server = Hapi.server({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 80
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        console.log('resp');
        return `Pong!`;
    }
})

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);

}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();
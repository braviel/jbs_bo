const server = require('./server')
const db = require('./db/db');

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            console.log('resp');
            return `Pong!`;
        }
    });
}

process.on('unhandledRejection', (err) => {
    console.log('DEVLOG: ' + err);
    process.exit(1);
});

init();
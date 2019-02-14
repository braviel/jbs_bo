'use strict';
const Glue = require('glue');
const manifest = require('./manifest');

const options = {
    relativeTo: __dirname
};

// const JwtValidator = require('./app/validator/jwtvalidator')
// const jwt = JWT.sign({id:1}, 'apisecret');
// console.log(`Token: ${jwt}`);
const start = async () => {
    // glob.sync('app/api/**/routes/*.js', {
    //     root: __dirname
    // }).forEach(file => {
    //     const route = require(path.join(__dirname, file));
    //     server.route(route);
    //     console.log(`@@@ Route: ${path.join(__dirname, file)}.`);
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
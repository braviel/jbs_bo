'use strict';
const Glue = require('glue');
const manifest = require('./manifest');
const fs = require('fs')
const options = {
    relativeTo: __dirname
};
process.env.PWD = process.cwd();
process.env.UPLOAD_PATH = process.env.PWD + '/upload/' 
const UPLOAD_PATH = './upload'
// const JwtValidator = require('./app/validator/jwtvalidator')
// const jwt = JWT.sign({id:1}, 'apisecret');
// console.log(`Token: ${jwt}`);
if (!fs.existsSync(UPLOAD_PATH)) fs.mkdirSync(UPLOAD_PATH);
const start = async () => {
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
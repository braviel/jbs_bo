'use strict';
// const path = require('path');
const glob = require('glob');

const register = function(server, serverOptions) {
    console.log('Register Router at ' + __dirname);
    glob.sync("/api/**/*.js", {
        root: __dirname
    }).forEach( file => {
        console.log(`@@@ Add Route: ${file}`);
        const route = require(file);
        server.route(route);        
    } );
}

module.exports = {
    name: 'router',
    register
}
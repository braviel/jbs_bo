"use strict";
module.exports = {
    server: {
        // port: 8000
    },
    // connections: [
    //     {
    //         port: 8000,
    //         label: "api"
    //     }
    // ],
    register: {
        plugins: [
            {
                plugin: "hapi-pino",
                options: {
                    prettyPrint: true,
                    logEvents: ['response', 'onPostStart']
                }            
            },
            {
                plugin: './plugins/jwt-wrapper'
            },
            {
                plugin: './app/api/profile/routes/profile'
            },
            {
                plugin: './app/api/main'
            }
        ]
    }
};
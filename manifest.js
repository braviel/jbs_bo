"use strict";
module.exports = {
    server: {
        port: process.env.PORT || 5000
    },
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
                plugin: './app/router'
            }
            // {
            //     plugin: './app/api/profile/routes/profile'
            // },
            // {
            //     plugin: './app/api/main'
            // }
        ]
    }
};
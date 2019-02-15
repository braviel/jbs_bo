"use strict";
const config = require('./config');
const Sequelize = require('sequelize');

//database wide options
const opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true                
    },
    operatorsAliases: false
}
const swaggerOptions = {
    info: {
            title: 'JBS API Documentation',
            version: '0.0.1',
        },
};
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
                plugin: 'hapi-sequelizejs',
                options: {
                    name: process.env.DBName || 'jbs',
                    models: [__dirname + '/app/model/**/*.js'],
                    ignoredModels: [],
                    sequelize: new Sequelize(config.dbConnectionStr,opts),
                    sync: true,
                    forceSync: false // force sync (drop table)
                }
            },
            {
                plugin: 'inert'
            },
            {
                plugin: 'vision'
            },
            {
                plugin: 'hapi-swagger'
            },
            {
                plugin: './plugins/jwt-wrapper',
                options: swaggerOptions
            },    
            {
                plugin: './app/router'
            },            
            // {
            //     plugin: './app/api/profile/routes/profile'
            // },
            // {
            //     plugin: './app/api/main'
            // }
        ]
    }
};
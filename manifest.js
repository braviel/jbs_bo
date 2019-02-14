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
                    name: 'jbs',
                    models: [__dirname + '/app/model/**/*.js'],
                    ignoredModels: [],
                    sequelize: new Sequelize(config.dbConnectionStr,opts),
                    sync: true,
                    forceSync: false // force sync (drop table)
                }
            },
            {
                plugin: './plugins/jwt-wrapper'
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
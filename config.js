'use strict';
module.exports = {   
    dbConnectionStr: process.env.CLEARDB_DATABASE_URL || 'mysql://root:sasa@localhost/jbs?reconnect=true',
    sequelize: {        
        database: 'jbs',
        username: 'root',
        password: 'sasa',
        dialect: 'mysql'
    }
}
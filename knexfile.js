const dotenv = require('dotenv');
dotenv.config({path: '.env'});

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
        },
        migrations: {
            directory: './db/migrations',
            tableName: 'leader_dev',
        },
        seeds: {
            directory: './db/seeds'
        },
    },
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database:process.env.DB_NAME,
        },
        migrations: {
            directory: './db/migrations',
            tableName: 'leader_prod',
        },
        seeds: {
            directory: './db/seeds'
        },
    }
}

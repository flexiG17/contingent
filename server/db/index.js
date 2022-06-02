const knex = require('knex');
const { development, production } = require('../knexfile');

const isProduction = process.env.NODE_ENV === 'production';
const opt = isProduction ? production : development;

const db = knex(opt);

module.exports = db

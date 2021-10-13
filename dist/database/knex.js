"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dotenv = require("dotenv");
const path = require("path");
Dotenv.config({ path: '../../.env' });
const objection_1 = require("objection");
const common_1 = require("@nestjs/common");
module.exports = {
    development: Object.assign({ client: 'mysql2', connection: {
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
            database: process.env.MYSQL_DB || 'knex_mysql',
        }, migrations: {
            extension: 'ts',
            tableName: 'migrations',
            directory: path.join(__dirname, 'migrations'),
            stub: path.join(__dirname, 'migrations', 'migration.stub'),
            timezone: 'UTC',
        }, seeds: {
            directory: path.join(__dirname, '/seeds'),
            loadExtensions: ['.ts'],
            stub: path.join(__dirname, '/seeds/seed.stub'),
        } }, objection_1.knexSnakeCaseMappers()),
    staging: Object.assign({ client: 'mysql2', connection: {
            database: process.env.MYSQL_DB,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        }, pool: {
            min: 2,
            max: 10,
        }, migrations: {
            tableName: 'migrations',
        } }, objection_1.knexSnakeCaseMappers()),
    production: Object.assign({ client: 'mysql2', connection: {
            database: process.env.MYSQL_DB,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        }, pool: {
            min: 2,
            max: 10,
        }, migrations: {
            tableName: 'migrations',
        } }, objection_1.knexSnakeCaseMappers()),
}[process.env.NODE_ENV || 'development'];
common_1.Logger.log(`Will connect to mysql://${process.env.MYSQL_USER}@${process.env.MYSQL_HOST}/${process.env.MYSQL_DB}`);
//# sourceMappingURL=knex.js.map
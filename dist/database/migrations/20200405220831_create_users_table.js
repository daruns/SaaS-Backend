"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
const tableName = 'users';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating' + tableName + 'table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('username').index().unique();
        table.string('email').index().unique();
        table.string('password');
        table.string('name');
        table.string('phoneNumber');
        table.string('avatar');
        table.string('userType');
        table.string('department');
        table.string('reportsTo');
        table.string('activationToken');
        table.dateTime('activatedAt');
        table.string('passwordResetToken');
        table.dateTime('lastResetAt');
        table.integer('userId')
            .unsigned()
            .index()
            .defaultTo(null)
            .references('id')
            .inTable('users');
        table.string('brandCode')
            .index()
            .references('brandCode')
            .inTable('brands')
            .notNullable();
        table.string('status');
        table.integer('deleted');
        table.string('createdBy');
        table.string('updatedBy');
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    common_1.Logger.log('Droping' + tableName + 'table');
    return knex.schema.dropTableIfExists(tableName);
}
exports.down = down;
//# sourceMappingURL=20200405220831_create_users_table.js.map
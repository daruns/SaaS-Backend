"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tableName = 'userRoles';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating' + tableName + 'table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table
            .integer('userId')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table
            .integer('roleId')
            .unsigned()
            .index()
            .references('id')
            .inTable('roles')
            .onDelete('CASCADE');
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
//# sourceMappingURL=20200405220908_createUserRolesTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
async function up(knex) {
    if (await knex.schema.hasTable('permissions')) {
        return;
    }
    common_1.Logger.log('Creating permissions table');
    return knex.schema.createTable('permissions', (table) => {
        table.increments('id').unsigned().primary();
        table.string('subject');
        table.string('action');
        table.string('resource');
        table.integer('weight');
        table
            .integer('userId')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .notNullable()
            .onDelete('CASCADE');
        table
            .integer('groupId')
            .unsigned()
            .index()
            .references('id')
            .inTable('groups')
            .notNullable()
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
    common_1.Logger.log('Droping permissions table');
    return knex.schema.dropTableIfExists('permissions');
}
exports.down = down;
//# sourceMappingURL=20200405221255_create_permissions_table.js.map
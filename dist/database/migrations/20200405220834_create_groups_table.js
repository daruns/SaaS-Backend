"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
async function up(knex) {
    if (await knex.schema.hasTable('groups')) {
        return;
    }
    common_1.Logger.log('Creating groups table');
    return knex.schema.createTable('groups', (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.text('group');
        table
            .integer('userId')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
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
    common_1.Logger.log('Droping groups table');
    return knex.schema.dropTableIfExists('groups');
}
exports.down = down;
//# sourceMappingURL=20200405220834_create_groups_table.js.map
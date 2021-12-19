"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tableName = 'tasks';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('brandCode');
        table.string('description');
        table.string('priority');
        table.dateTime('plannedStartDate');
        table.dateTime('plannedEndDate');
        table.dateTime('actualStartDate');
        table.dateTime('actualdEndDate');
        table.integer('boardId')
            .index()
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projectBoards')
            .onDelete('CASCADE');
        table.integer('projectId')
            .index()
            .unsigned()
            .references('id')
            .inTable('projects')
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
    common_1.Logger.log('Droping ' + tableName + ' table');
    return knex.schema.dropTableIfExists(tableName);
}
exports.down = down;
//# sourceMappingURL=20211101215522_addTasksTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tableName = 'projects';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('brandCode');
        table.integer('clientId')
            .index()
            .unsigned()
            .references('id')
            .inTable('clients');
        table.dateTime('plannedStartDate');
        table.dateTime('plannedEndDate');
        table.dateTime('actualStartDate');
        table.dateTime('actualdEndDate');
        table.integer('rate');
        table.string('rateType');
        table.string('priority');
        table.string('description');
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
//# sourceMappingURL=20211101215350_addProjectsTable.js.map
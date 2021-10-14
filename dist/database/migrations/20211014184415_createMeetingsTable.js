"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tableName = 'meetings';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating' + tableName + 'table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('title');
        table.dateTime('date');
        table.integer('duration');
        table.string('type');
        table.string('details');
        table.string('serviceRequirements');
        table.dateTime('nextMeetingDate');
        table.string('currentServiceProvider');
        table
            .integer('clientId')
            .unsigned()
            .index()
            .references('id')
            .inTable('clients')
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
    common_1.Logger.log('Droping' + tableName + 'table');
    return knex.schema.dropTableIfExists(tableName);
}
exports.down = down;
//# sourceMappingURL=20211014184415_createMeetingsTable.js.map
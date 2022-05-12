"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
const tableName = 'overtimes';
async function up(knex) {
    if (await knex.schema.hasTable(camelToUnderscore(tableName))) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('description');
        table.dateTime('from');
        table.dateTime('to');
        table.decimal('currentBalance', 65, 2).defaultTo(0);
        table.decimal('remainBalance', 65, 2).defaultTo(0);
        table.integer('employeeId')
            .index()
            .unsigned()
            .references('id')
            .inTable('employees')
            .notNullable();
        table.integer('overtimeTypeId')
            .index()
            .unsigned()
            .references('id')
            .inTable('overtimeTypes')
            .notNullable();
        table.string('brandCode');
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
//# sourceMappingURL=20220428162132_createOvertimesTable.js.map
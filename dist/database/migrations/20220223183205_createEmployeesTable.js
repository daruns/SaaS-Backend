"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
const tableName = 'employees';
async function up(knex) {
    if (await knex.schema.hasTable(camelToUnderscore(tableName))) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.boolean('hrMember')
            .defaultTo(0)
            .notNullable();
        table.integer('managerId')
            .index()
            .unsigned()
            .references('id')
            .inTable('employees');
        table.integer('userId')
            .index()
            .unsigned()
            .references('id')
            .inTable('users');
        table.integer('designationId')
            .index()
            .unsigned()
            .references('id')
            .inTable('designations')
            .notNullable();
        table.decimal('leaveBalance', 65, 2).defaultTo(0);
        table.decimal('salary', 65, 2).defaultTo(0);
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
//# sourceMappingURL=20220223183205_createEmployeesTable.js.map
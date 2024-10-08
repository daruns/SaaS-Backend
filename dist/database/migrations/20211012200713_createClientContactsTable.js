"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
const tableName = 'clientContacts';
async function up(knex) {
    if (await knex.schema.hasTable(camelToUnderscore(tableName))) {
        return;
    }
    common_1.Logger.log('Creating' + tableName + 'table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string("name");
        table.string("position");
        table.string("email").index();
        table.string('businessPhoneNumber1');
        table.string('businessPhoneNumber2');
        table.string("description");
        table.string("department");
        table
            .integer('clientId')
            .unsigned()
            .references('id')
            .inTable('clients')
            .onDelete("CASCADE")
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
    common_1.Logger.log('Droping' + tableName + 'table');
    return knex.schema.dropTable(tableName);
}
exports.down = down;
//# sourceMappingURL=20211012200713_createClientContactsTable.js.map
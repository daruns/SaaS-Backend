"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tableName = 'clients';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating' + tableName + 'table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string("name");
        table.string("logo");
        table.string("phoneNumbers");
        table.string("clientType");
        table.string("businessType");
        table.string("email").index();
        table.string("website");
        table.string("address");
        table.integer("rate");
        table.string("zipCode");
        table.string('brandCode');
        table.integer('userId')
            .unsigned()
            .index()
            .defaultTo(null)
            .references('id')
            .inTable('users');
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
//# sourceMappingURL=20211007162739_createClientsTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
async function up(knex) {
    if (await knex.schema.hasTable('clients')) {
        return;
    }
    common_1.Logger.log('Creating clients table');
    return knex.schema.createTable('clients', (table) => {
        table.increments('id').unsigned().primary();
        table.string("name");
        table.string("logo");
        table.string("phoneNumbers");
        table.string('phoneNumber1');
        table.string('phoneNumber2');
        table.string("clientType");
        table.string("businessType");
        table.string("email");
        table.string("website");
        table.string("address");
        table.integer("rate");
        table.string("zipCode");
        table
            .integer('userId')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
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
    return knex.schema.dropTable('clients');
}
exports.down = down;
//# sourceMappingURL=20211007162739_create_clients_table.js.map
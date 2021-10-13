"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function up(knex) {
    return knex.schema.createTable('clientContacts', (table) => {
        table.increments('id').unsigned().primary();
        table.string("name");
        table.string("position");
        table.string('businessPhoneNumber1');
        table.string('businessPhoneNumber2');
        table.string("email");
        table.string("description");
        table.string("department");
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
    return knex.schema.dropTable('clientContacts');
}
exports.down = down;
//# sourceMappingURL=20211012200713_create_client_contacts_table.js.map
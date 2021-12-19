"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tableName = 'invoiceItems';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('category');
        table.integer('itemId');
        table.string('description');
        table.integer('unitPrice');
        table.integer('qty').defaultTo(1).notNullable();
        table.dateTime('purchasedAt');
        table.dateTime('expireDate');
        table.string('supplier');
        table.string('brandCode');
        table.integer('invoiceId')
            .index()
            .unsigned()
            .references('id')
            .inTable('invoices')
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
    common_1.Logger.log('Droping ' + tableName + ' table');
    return knex.schema.dropTableIfExists(tableName);
}
exports.down = down;
//# sourceMappingURL=20211030162207_createInvoiceItemsTable.js.map
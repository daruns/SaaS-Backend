"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tableName = 'expenses';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('expenseNumber');
        table.string('brandCode');
        table.string('description');
        table.string('billingAddress');
        table.dateTime('date');
        table.dateTime('dueDate');
        table.string('currencyCode');
        table.decimal('exchangeRate').defaultTo(1).notNullable();
        table.decimal('taxRate').defaultTo(1).notNullable();
        table.decimal('discount').defaultTo(1).notNullable();
        table.decimal('subTotalAmount', 65, 2).defaultTo(0).notNullable();
        table.decimal('totalAmount', 65, 2).defaultTo(0).notNullable();
        table.integer('paymentMethodId')
            .unsigned()
            .references('id')
            .inTable('paymentMethods');
        table.integer('supplierId')
            .unsigned()
            .references('id')
            .inTable('suppliers');
        table.integer('taxId')
            .unsigned()
            .references('id')
            .inTable('taxes');
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
//# sourceMappingURL=20211115164014_createExpensesTable.js.map
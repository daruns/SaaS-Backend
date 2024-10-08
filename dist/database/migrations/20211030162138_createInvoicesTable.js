"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
const tableName = 'invoices';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('invoiceNumber');
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
        table.decimal('bankFee', 65, 2).defaultTo(0);
        table.string('clientName');
        table.string('clientEmail');
        table.string('clientLogo');
        table.string('clientClientType');
        table.string('clientBusinessType');
        table.string('clientAddress');
        table.string('clientPhoneNumbers');
        table.string('clientWebsite');
        table.string("clientContactName");
        table.string("clientContactPosition");
        table.string("clientContactEmail");
        table.string('clientContactBusinessPhoneNumber1');
        table.string('clientContactBusinessPhoneNumber2');
        table.string("clientContactDescription");
        table.string("clientContactDepartment");
        table.string('taxName');
        table.integer('paymentMethodId')
            .unsigned()
            .references('id')
            .inTable('paymentMethods');
        table.integer('taxId')
            .unsigned()
            .references('id')
            .inTable('taxes');
        table.integer('clientId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('clients');
        table.integer('clientContactId')
            .unsigned()
            .references('id')
            .inTable('clientContacts');
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
//# sourceMappingURL=20211030162138_createInvoicesTable.js.map
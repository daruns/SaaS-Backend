import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'quotes'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    
    table.string('quoteNumber');
    table.string('brandCode');
    table.string('description');
    table.string('billingAddress');
    table.dateTime('date');
    table.dateTime('dueDate');
    table.string('currencyCode');
    table.decimal('exchangeRate').defaultTo(1).notNullable();
    table.decimal('taxRate').defaultTo(1).notNullable();
    table.decimal('discount').defaultTo(1).notNullable();
    table.decimal('subTotalAmount', 65,2).defaultTo(0).notNullable();
    table.decimal('totalAmount', 65,2).defaultTo(0).notNullable();
    table.decimal('bankFee', 65,2).defaultTo(0);
    table.string('clientName');
    table.string('clientEmail');
    table.string('clientLogo');
    table.string('clientClientType');
    table.string('clientBusinessType');
    table.string('clientAddress');
    table.string('clientPhoneNumbers');
    table.string('clientWebsite');
    //clientContacts Columns
    table.string("clientContactName");
    table.string("clientContactPosition");
    table.string("clientContactEmail");
    table.string('clientContactBusinessPhoneNumber1');
    table.string('clientContactBusinessPhoneNumber2');
    table.string("clientContactDescription");
    table.string("clientContactDepartment");
    //tax Columns
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

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping ' + tableName + ' table');
  return knex.schema.dropTableIfExists(tableName);
}

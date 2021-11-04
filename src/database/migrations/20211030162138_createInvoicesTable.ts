import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'invoices'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    
    table.string('invoiceNumber');
    table.string('brandCode');
    table.string('description')
    table.string('billingAddress')
    table.string('paymentMethod')
    table.dateTime('date');
    table.dateTime('dueDate');
    table.string('currencyCode')
    table.decimal('exchangeRate').defaultTo(1).notNullable()
    table.decimal('taxRate').defaultTo(1).notNullable()
    table.decimal('discount').defaultTo(1).notNullable()
    table.decimal('subTotalAmount', 65,2).defaultTo(0).notNullable()
    table.decimal('totalAmount', 65,2).defaultTo(0).notNullable()
    table.integer('clientId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clients')
    table.integer('clientContactId')
      .unsigned()
      .references('id')
      .inTable('clientContacts')
    
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

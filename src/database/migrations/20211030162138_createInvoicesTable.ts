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
    table.dateTime('date');
    table.dateTime('dueDate');
    table.decimal('taxRatio');
    table.decimal('billingAddress');
    table.decimal('totalAmount');
    table.integer('currencyCode')
    table.string('brandCode');
    table.integer('clientId')
      .index()
      .unsigned()
      .references('id')
      .inTable('clients')
      .notNullable();
    table.index(
      ['invoiceNumber', 'brandCode'],
      'InvoiceNumberOnBrandCode',
    );

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

import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'expenses'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
 
  
    table.string('expenseNumber');
    table.string('brandCode');
    table.string('description')
    table.string('billingAddress')
    table.dateTime('date');
    table.dateTime('dueDate');
    table.string('currencyCode')
    table.decimal('exchangeRate').defaultTo(1).notNullable()
    table.decimal('taxRate').defaultTo(1).notNullable()
    table.decimal('discount').defaultTo(1).notNullable()
    table.decimal('subTotalAmount', 65,2).defaultTo(0).notNullable()
    table.decimal('totalAmount', 65,2).defaultTo(0).notNullable()
    table.integer('paymentMethodId')
      .unsigned()
      .references('id')
      .inTable('paymentMethods')
    table.integer('supplierId')
      .unsigned()
      .references('id')
      .inTable('suppliers')
    table.integer('taxId')
      .unsigned()
      .references('id')
      .inTable('taxes')

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

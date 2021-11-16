import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'expenseItems'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string('name')
    table.boolean('category')
    table.integer('itemId')
    table.string('description')
    table.integer('unitPrice')
    table.integer('qty').defaultTo(1).notNullable()
    table.string('brandCode')
    table.integer('expenseId')
      .index()
      .unsigned()
      .references('id')
      .inTable('expenses')
      .notNullable()
      .onDelete('CASCADE')
  
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

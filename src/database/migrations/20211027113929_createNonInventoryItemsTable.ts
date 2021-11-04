import * as Knex from 'knex'
import { Logger } from '@nestjs/common';

const tableName = 'nonInventoryItems'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating' + tableName + 'table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();

    table.string('name')
    table.string('description')
    table.integer('unitPrice')
    table.integer('qty').defaultTo(1).notNullable()
    table.dateTime('purchasedAt')
    table.dateTime('expireDate')
    table.string('supplier')
    table.string('brandCode')

    table.string('status');
    table.integer('deleted');
    table.string('createdBy');
    table.string('updatedBy');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping' + tableName + 'table');
  return knex.schema.dropTableIfExists(tableName);
}
import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'serviceItems'
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
    table.integer('qty')
    table.dateTime('purchasedAt')
    table.dateTime('expireDate')
    table.string('supplier')
    table.integer('userId')
      .unsigned()
      .index()
      .references('id')
      .inTable('users')
      .notNullable()

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

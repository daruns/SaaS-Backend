import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = "expenses"
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasColumn(tableName, "category")) {
    return;
  }
  Logger.log('Adding category column to ' + tableName + ' table');
  return await knex.schema.alterTable(tableName, function (table) {
    table.string('category');
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping category column from ' + tableName + ' table');
  return knex.schema.table(tableName, (table) => {
    table.dropColumn('category');
  });
}

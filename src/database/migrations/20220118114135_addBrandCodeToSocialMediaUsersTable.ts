import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'socialMediaStudioUsers'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasColumn(tableName, "brandCode")) {
    return;
  }
  Logger.log('Adding brandCode column to ' + tableName + ' table');
  return await knex.schema.alterTable(tableName, function (table) {
    table.string('brandCode');
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping brandCode column from ' + tableName + ' table');
  return knex.schema.table(tableName, (table) => {
    table.dropColumn('brandCode');
  });
}

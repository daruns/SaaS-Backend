import * as Knex from 'knex';
import { Logger } from '@nestjs/common';
function camelToUnderscore(key) {
  return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

const tableName = 'leaveTypes'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasColumn(tableName, "urgent")) {
    return;
  }
  Logger.log('Adding urgent column to ' + tableName + ' table');
  return await knex.schema.alterTable(tableName, function (table) {
    table.boolean('urgent');
    table.decimal('fund', 65,2).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping urgent column from ' + tableName + ' table');
  return knex.schema.table(tableName, (table) => {
    table.dropColumn('urgent');
    table.dropColumn('fund');
  });
}

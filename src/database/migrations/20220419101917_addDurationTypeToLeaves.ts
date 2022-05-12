import * as Knex from 'knex';
import { Logger } from '@nestjs/common';
function camelToUnderscore(key) {
  return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

const tableName = 'leaveTypes'
export async function up(knex: Knex): Promise<any> {
  Logger.log('Adding hours durationType column to ' + tableName + ' ----- ' + await knex.schema.hasColumn(tableName, "hours") + ' ----- ' + await knex.schema.hasColumn(tableName, "durationType") +  ' table');
  if (!await knex.schema.hasColumn(tableName, "hours") && !await knex.schema.hasColumn(tableName, "durationType")) {
    return await knex.schema.alterTable(tableName, function (table) {
      table.decimal('hours', 65,2).defaultTo(0)
      table.string('durationType')
    });
  } else {
    return
  }
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping hours durationType column from ' + tableName + ' ----- ' + await knex.schema.hasColumn(tableName, "hours") + ' ----- ' + await knex.schema.hasColumn(tableName, "durationType") +  ' table');
  let isHoursExist = await knex.schema.hasColumn(tableName, "hours")
  let isDurationTypeExist = await knex.schema.hasColumn(tableName, "durationType")
  return knex.schema.table(tableName,(table) => {
    if (isHoursExist) table.dropColumn('hours');
    if (isDurationTypeExist) table.dropColumn('durationType')
  });
}

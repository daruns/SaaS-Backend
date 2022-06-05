import * as Knex from 'knex';
import { Logger } from '@nestjs/common';
function camelToUnderscore(key) {
  return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

const tableName = 'permissions'
export async function up(knex: Knex): Promise<any> {
  if (!(await knex.schema.hasColumn(tableName, "roleId"))) {
    return;
  }
  Logger.log('Adding roleId column to ' + tableName + ' table');
  return await knex.schema.alterTable(tableName, function (table) {
    table.dropForeign(["roleId"]);
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping roleId column from ' + tableName + ' table');
  return knex.schema.table(tableName, (table) => {
    table
      .integer('roleId')
      .unsigned()
      .index()
      .references('id')
      .inTable('roles')
      .notNullable()
  });
}

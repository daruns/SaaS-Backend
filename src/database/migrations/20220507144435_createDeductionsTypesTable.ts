import * as Knex from 'knex';
import { Logger } from '@nestjs/common';
function camelToUnderscore(key) {
  return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

const tableName = 'deductionTypes'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(camelToUnderscore(tableName))) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string('name');
    table.string('type').defaultTo("days") // days, weeks, months
    table.decimal('fund', 65,2).defaultTo(0);
    table.decimal('rate', 65,2).defaultTo(0);
    table.string('durationType')
    table.string('brandCode');

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

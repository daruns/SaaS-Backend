import * as Knex from 'knex';
import { Logger } from '@nestjs/common';
import { table } from 'console';

const tableName = 'qoutes'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.table(tableName, (table: Knex.TableBuilder) => {                
    table.decimal('subTotalAmount', 65,2).defaultTo(0).notNullable()
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping ' + tableName + ' table');
  return knex.schema.alterTable(tableName, (table: Knex.TableBuilder) => {
    table.dropColumn('subTotalAmount')
  });
}

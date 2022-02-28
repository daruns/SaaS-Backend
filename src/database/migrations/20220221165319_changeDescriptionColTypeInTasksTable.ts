import * as Knex from 'knex';
import { Logger } from '@nestjs/common';
function camelToUnderscore(key) {
  return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

const tableName = 'tasks'
export async function up(knex: Knex): Promise<any> {
  Logger.log('changing column description from ' + tableName + ' table');
  return knex.schema.table(tableName, (table: Knex.TableBuilder) => {
    return table.dropColumn('description');
  }).then(() => {
    return knex.schema.table(tableName, (table: Knex.TableBuilder) => {
        table.text('description');
    })
  })
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping ' + tableName + ' table');
  return knex.schema.dropTableIfExists(tableName);
}

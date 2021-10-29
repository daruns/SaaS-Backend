import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'clientContacts'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.table(tableName, function(table: Knex.TableBuilder) {
    table.string('businessPhoneNumber1');
    table.string('businessPhoneNumber2');
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping ' + tableName + ' table');
  return knex.schema.table(tableName, function(table: Knex.TableBuilder) {
    table.dropColumn('businessPhoneNumber1');
    table.dropColumn('businessPhoneNumber2');
});

}

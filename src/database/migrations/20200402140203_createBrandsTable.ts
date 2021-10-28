import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'brands'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();

    table.string('brandCode').index().unique();
    table.string('subdomain');
    table.string('name');
    table.string('logo');
    table.integer('companySize');
    table.string('owner');
    table.string('address');
    table.dateTime('announcedAt');
    table.string('branches');
    table.string('occupation');
    table.string('website');
    table.string('phoneNumber');
    table.string('email');

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

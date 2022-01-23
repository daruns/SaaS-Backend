import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'projects'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string('name');
    table.string('brandCode');
    table.integer('clientId')
      .index()
      .unsigned()
      .references('id')
      .inTable('clients')
    table.dateTime('plannedStartDate');
    table.dateTime('plannedEndDate');
    table.dateTime('actualStartDate');
    table.dateTime('actualdEndDate');
    table.integer('rate');
    table.string('rateType');
    table.string('priority');
    table.text('description');

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

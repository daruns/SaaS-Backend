import * as Knex from 'knex';
import { Logger } from '@nestjs/common';
function camelToUnderscore(key) {
  return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

const tableName = 'socialMediaStudios'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(camelToUnderscore(tableName))) {
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
    table.boolean('clientApproval');
    table.string('stage');
    table.dateTime('schedule')
    table.string('priority');
    table.integer('creatorId')
    .index()
    .unsigned()
    .references('id')
    .inTable('users');
    table.string('description');

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

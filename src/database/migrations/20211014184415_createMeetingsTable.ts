import * as Knex from 'knex'
import { Logger } from '@nestjs/common';

const tableName = 'meetings'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating' + tableName + 'table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string('title')
    table.dateTime('date')
    table.integer('duration')
    table.string('type')
    table.string('details')
    table.string('serviceRequirements')
    table.dateTime('nextMeetingDate')
    table.string('currentServiceProvider')
    table
      .integer('clientId')
      .unsigned()
      .references('id')
      .inTable('clients')
      .onDelete('CASCADE')
      .notNullable()
    table.string('brandCode')

      table.string('status');
    table.integer('deleted');
    table.string('createdBy');
    table.string('updatedBy');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping' + tableName + 'table');
  return knex.schema.dropTableIfExists(tableName);
}
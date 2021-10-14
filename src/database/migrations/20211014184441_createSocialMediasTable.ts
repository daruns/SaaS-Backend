import { Logger } from '@nestjs/common';
import * as Knex from 'knex'
const tableName = 'socialMedias'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating' + tableName + 'table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string("facebook")
    table.string("instagram")
    table.string("twitter")
    table.string("snapchat")
    table.string("linkedIn")
    table.string("youtube")
    table.string("tikTok")
    table.string("clubhouse")
    table.string("Other")
    table
      .integer('clientId')
      .unsigned()
      .index()
      .references('id')
      .inTable('clients')
      .notNullable()
      .onDelete('CASCADE');

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
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
    table.string("name")
    table.string("linkAddress").index().unique()
    table.string("addressDomain")
    table
      .integer('clientId')
      .unsigned()
      .index()
      .references('id')
      .inTable('clients')
      .notNullable()
    table
      .integer('userId')
      .unsigned()
      .index()
      .references('id')
      .inTable('users')
      .notNullable()

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
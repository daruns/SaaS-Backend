import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'clients'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating' + tableName + 'table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string("name")
    table.string("logo")
    table.string("phoneNumbers")
    table.string("clientType")
    table.string("businessType")
    table.string("email").index();
    table.string("website")
    table.string("address")
    table.integer("rate")
    table.string("zipCode")
    table.string('brandCode')
    table.integer('userId')
      .unsigned()
      .index()
      .defaultTo(null)
      .references('id')
      .inTable('users')
    table.string('status');
    table.integer('deleted');
    table.string('createdBy');
    table.string('updatedBy');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping' + tableName + 'table');
  return knex.schema.dropTable(tableName);
}
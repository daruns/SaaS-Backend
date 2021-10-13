import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable('clients')) {
    return;
  }
  Logger.log('Creating clients table');
  return knex.schema.createTable('clients', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string("name")
    table.string("logo")
    table.string("phoneNumbers")
    table.string('phoneNumber1')
    table.string('phoneNumber2')
    table.string("clientType")
    table.string("businessType")
    table.string("email")
    table.string("website")
    table.string("address")
    table.integer("rate")
    table.string("zipCode")
    table
      .integer('userId')
      .unsigned()
      .index()
      .references('id')
      .inTable('users')
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
  return knex.schema.dropTable('clients');
}
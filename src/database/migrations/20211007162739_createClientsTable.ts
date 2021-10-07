import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable('clients')) {
    return;
  }
  Logger.log('Creating clients table');
  return knex.schema.createTable('clients', (table: Knex.TableBuilder) => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string("name")
    table.string("phoneNumber")
    table.string('businessPhoneNumber1')
    table.string('businessPhoneNumber2')
    table.string("email")
    table.string("website")
    table.string("address")
    table.integer("rate")
    table.string("status")
    table.string("description")
    table.string("clientType")
    table.string("businessType")
    table.integer("deleted")
    table.string('createdBy')
    table.string('updatedBy')

    // table
    //   .integer('user_id')
    //   .unsigned()
    //   .index()
    //   .references('id')
    //   .inTable('users')
    //   .notNullable()
    //   .onDelete('CASCADE');
    // table
    //   .integer('post_id')
    //   .unsigned()
    //   .index()
    //   .references('id')
    //   .inTable('posts')
    //   .notNullable()
    //   .onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('clients');
}
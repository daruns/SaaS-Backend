import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable('groups')) {
    return;
  }
  Logger.log('Creating groups table');
  return knex.schema.createTable('groups', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string('name');
    table.text('group');
    table
      .integer('userId')
      .unsigned()
      .index()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.string('status');
    table.integer('deleted');
    table.string('createdBy');
    table.string('updatedBy');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  Logger.log('Droping groups table');
  return knex.schema.dropTableIfExists('groups');
}

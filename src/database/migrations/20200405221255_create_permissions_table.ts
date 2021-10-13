import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable('permissions')) {
    return;
  }
  Logger.log('Creating permissions table');
  return knex.schema.createTable('permissions', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string('subject')
    table.string('action')
    table.string('resource')
    table.integer('weight')
    table
      .integer('userId')
      .unsigned()
      .index()
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('groupId')
      .unsigned()
      .index()
      .references('id')
      .inTable('groups')
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
  Logger.log('Droping permissions table');
  return knex.schema.dropTableIfExists('permissions');
}

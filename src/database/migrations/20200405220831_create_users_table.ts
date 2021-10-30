import * as Knex from 'knex';
import { Logger } from '@nestjs/common';

const tableName = 'users'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }
  Logger.log('Creating' + tableName + 'table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();

    table.string('username').index().unique();
    table.string('email').index().unique();
    table.string('password');
    table.string('name');
    table.string('phoneNumber');
    table.string('avatar');
    table.string('userType');
    table.string('department');
    table.string('reportsTo');
    table.string('activationToken');
    table.dateTime('activatedAt');
    table.string('passwordResetToken');
    table.dateTime('lastResetAt');
    table.integer('userId')
      .unsigned()
      .index()
      .defaultTo(null)
      .references('id')
      .inTable('users')
    table.string('brandCode')
      .index()
      .references('brandCode')
      .inTable('brands')
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

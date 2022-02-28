import * as Knex from 'knex';
import { Logger } from '@nestjs/common';
function camelToUnderscore(key) {
  return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

const tableName = 'employees'
export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(camelToUnderscore(tableName))) {
    return;
  }
  Logger.log('Creating ' + tableName + ' table');
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string('name');
    table.boolean('hrMember')
    .defaultTo(0)
    .notNullable();
    table.integer('managerId')
    .index()
    .unsigned()
    .references('id')
    .inTable('employees')
    table.integer('userId')
    .index()
    .unsigned()
    .references('id')
    .inTable('users')
    table.integer('designationId')
    .index()
    .unsigned()
    .references('id')
    .inTable('designations')
    .notNullable();
    table.decimal('leaveBalance', 65,2).defaultTo(0);
    table.decimal('salary', 65,2).defaultTo(0);
    table.string('brandCode');

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

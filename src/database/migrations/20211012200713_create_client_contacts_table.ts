import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('clientContacts', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary();
    table.string("name")
    table.string("position")
    table.string('businessPhoneNumber1')
    table.string('businessPhoneNumber2')
    table.string("email").index()
    table.string("description")
    table.string("department")
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
  return knex.schema.dropTable('clientContacts');
}
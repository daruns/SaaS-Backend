"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
const tableName = 'roomUsersPendingActions';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.integer('roomId')
            .unsigned()
            .index()
            .references('id')
            .inTable('rooms')
            .onDelete('CASCADE');
        table.integer('userId')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.integer('fromUserId')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.string('stage').defaultTo('pending');
        table.string('action');
        table.string('status');
        table.integer('deleted');
        table.string('createdBy');
        table.string('updatedBy');
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    common_1.Logger.log('Droping ' + tableName + ' table');
    return knex.schema.dropTableIfExists(tableName);
}
exports.down = down;
//# sourceMappingURL=20211222142739_createPendingAddingUsersToRoomTable.js.map
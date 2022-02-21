"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
const tableName = "joinedRooms";
async function up(knex) {
    if (await knex.schema.hasTable(camelToUnderscore(tableName))) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('brandCode');
        table.string('name');
        table.string("socketId");
        table.integer("userId")
            .index()
            .unsigned()
            .references("id")
            .inTable("users");
        table.integer("roomId")
            .index()
            .unsigned()
            .references("id")
            .inTable("rooms")
            .onDelete('CASCADE');
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
//# sourceMappingURL=20211130201026_createJoinedRoomTable.js.map
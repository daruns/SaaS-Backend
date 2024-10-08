"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
const tableName = 'medias';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('priority');
        table.string('brandCode');
        table.string('title');
        table.text('caption');
        table.text('textOnDesign');
        table.string('designSize');
        table.string('type');
        table.dateTime('plannedStartDate');
        table.dateTime('plannedEndDate');
        table.dateTime('actualStartDate');
        table.dateTime('actualdEndDate');
        table.integer('socialMediaStudioId')
            .index()
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('socialMediaStudios')
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
//# sourceMappingURL=20220104174938_createMediasTable.js.map
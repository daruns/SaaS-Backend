"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tableName = 'brands';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('brandCode');
        table.string('subdomain').unique();
        table.string('name');
        table.string('logo');
        table.integer('companySize');
        table.string('owner');
        table.string('address');
        table.timestamp('announcedAt');
        table.string('branches');
        table.string('occupation');
        table.string('website');
        table.string('phoneNumber');
        table.string('email');
        table.string('status');
        table.integer('deleted');
        table.string('createdBy');
        table.string('updatedBy');
        table.index('brandCode', 'BrandCodeIndex');
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    common_1.Logger.log('Droping ' + tableName + ' table');
    return knex.schema.dropTableIfExists(tableName);
}
exports.down = down;
//# sourceMappingURL=20200402140203_createBrandsTable.js.map
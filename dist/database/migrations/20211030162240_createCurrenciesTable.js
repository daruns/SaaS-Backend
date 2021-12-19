"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tableName = 'currencies';
async function up(knex) {
    if (await knex.schema.hasTable(tableName)) {
        return;
    }
    common_1.Logger.log('Creating ' + tableName + ' table');
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('code');
        table.string('DefaultExchangeRate');
        table.string('country');
        table.string('brandCode');
        table.index(['code', 'brandCode'], 'CodeOnBrandCode');
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
//# sourceMappingURL=20211030162240_createCurrenciesTable.js.map
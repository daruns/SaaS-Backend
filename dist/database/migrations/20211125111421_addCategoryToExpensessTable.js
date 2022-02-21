"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
const tableName = "expenses";
async function up(knex) {
    if (await knex.schema.hasColumn(tableName, "category")) {
        return;
    }
    common_1.Logger.log('Adding category column to ' + tableName + ' table');
    return await knex.schema.alterTable(tableName, function (table) {
        table.string('category');
    });
}
exports.up = up;
async function down(knex) {
    common_1.Logger.log('Droping category column from ' + tableName + ' table');
    return knex.schema.table(tableName, (table) => {
        table.dropColumn('category');
    });
}
exports.down = down;
//# sourceMappingURL=20211125111421_addCategoryToExpensessTable.js.map
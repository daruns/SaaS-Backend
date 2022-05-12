"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
const tableName = 'employees';
async function up(knex) {
    if (await knex.schema.hasColumn(tableName, "overtimeBalance")) {
        return;
    }
    common_1.Logger.log('Adding overtimeBalance column to ' + tableName + ' table');
    return await knex.schema.alterTable(tableName, function (table) {
        table.decimal('overtimeBalance', 65, 2).defaultTo(0);
    });
}
exports.up = up;
async function down(knex) {
    common_1.Logger.log('Droping overtimeBalance column from ' + tableName + ' table');
    return knex.schema.table(tableName, (table) => {
        table.dropColumn('overtimeBalance');
    });
}
exports.down = down;
//# sourceMappingURL=20220428165828_AddOvertimeToEmployeesTable.js.map
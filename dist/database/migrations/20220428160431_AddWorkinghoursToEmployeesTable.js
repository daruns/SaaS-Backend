"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
const tableName = 'employees';
async function up(knex) {
    if (await knex.schema.hasColumn(tableName, "workingHours")) {
        return;
    }
    common_1.Logger.log('Adding workingHours column to ' + tableName + ' table');
    return await knex.schema.alterTable(tableName, function (table) {
        table.decimal('workingHours', 65, 2).notNullable().defaultTo(0);
    });
}
exports.up = up;
async function down(knex) {
    common_1.Logger.log('Droping workingHours column from ' + tableName + ' table');
    return knex.schema.table(tableName, (table) => {
        table.dropColumn('workingHours');
    });
}
exports.down = down;
//# sourceMappingURL=20220428160431_AddWorkinghoursToEmployeesTable.js.map
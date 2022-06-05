"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
const tableName = 'permissions';
async function up(knex) {
    if (!(await knex.schema.hasColumn(tableName, "roleId"))) {
        return;
    }
    common_1.Logger.log('Adding roleId column to ' + tableName + ' table');
    return await knex.schema.alterTable(tableName, function (table) {
        table.dropForeign(["roleId"]);
    });
}
exports.up = up;
async function down(knex) {
    common_1.Logger.log('Droping roleId column from ' + tableName + ' table');
    return knex.schema.table(tableName, (table) => {
        table
            .integer('roleId')
            .unsigned()
            .index()
            .references('id')
            .inTable('roles')
            .notNullable();
    });
}
exports.down = down;
//# sourceMappingURL=20220524112435_removeRoleIdFromPermissionsTable.js.map
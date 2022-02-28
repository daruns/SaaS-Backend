"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
const tableName = 'tasks';
async function up(knex) {
    common_1.Logger.log('changing column description from ' + tableName + ' table');
    return knex.schema.table(tableName, (table) => {
        return table.dropColumn('description');
    }).then(() => {
        return knex.schema.table(tableName, (table) => {
            table.text('description');
        });
    });
}
exports.up = up;
async function down(knex) {
    common_1.Logger.log('Droping ' + tableName + ' table');
    return knex.schema.dropTableIfExists(tableName);
}
exports.down = down;
//# sourceMappingURL=20220221165319_changeDescriptionColTypeInTasksTable.js.map
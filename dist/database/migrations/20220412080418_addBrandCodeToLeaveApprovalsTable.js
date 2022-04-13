"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
const tableName = 'leaveApprovals';
async function up(knex) {
    if (await knex.schema.hasColumn(tableName, "brandCode")) {
        return;
    }
    common_1.Logger.log('Adding brandCode column to ' + tableName + ' table');
    return await knex.schema.alterTable(tableName, function (table) {
        table.boolean('brandCode');
    });
}
exports.up = up;
async function down(knex) {
    common_1.Logger.log('Droping brandCode column from ' + tableName + ' table');
    return knex.schema.table(tableName, (table) => {
        table.dropColumn('brandCode');
    });
}
exports.down = down;
//# sourceMappingURL=20220412080418_addBrandCodeToLeaveApprovalsTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const common_1 = require("@nestjs/common");
function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
const tableName = 'leaveTypes';
async function up(knex) {
    common_1.Logger.log('Adding hours durationType column to ' + tableName + ' ----- ' + await knex.schema.hasColumn(tableName, "hours") + ' ----- ' + await knex.schema.hasColumn(tableName, "durationType") + ' table');
    if (!await knex.schema.hasColumn(tableName, "hours") && !await knex.schema.hasColumn(tableName, "durationType")) {
        return await knex.schema.alterTable(tableName, function (table) {
            table.decimal('hours', 65, 2).defaultTo(0);
            table.string('durationType');
        });
    }
    else {
        return;
    }
}
exports.up = up;
async function down(knex) {
    common_1.Logger.log('Droping hours durationType column from ' + tableName + ' ----- ' + await knex.schema.hasColumn(tableName, "hours") + ' ----- ' + await knex.schema.hasColumn(tableName, "durationType") + ' table');
    let isHoursExist = await knex.schema.hasColumn(tableName, "hours");
    let isDurationTypeExist = await knex.schema.hasColumn(tableName, "durationType");
    return knex.schema.table(tableName, (table) => {
        if (isHoursExist)
            table.dropColumn('hours');
        if (isDurationTypeExist)
            table.dropColumn('durationType');
    });
}
exports.down = down;
//# sourceMappingURL=20220419101917_addDurationTypeToLeaves.js.map
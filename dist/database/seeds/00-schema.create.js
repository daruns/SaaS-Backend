"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const common_1 = require("@nestjs/common");
exports.seed = async (knex) => {
    common_1.Logger.log('Starting truncating tables');
    await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
    if (await knex.schema.hasTable('brands')) {
        await user_model_1.UserModel.query(knex).truncate();
    }
    await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
    common_1.Logger.log('Ending truncating tables');
};
//# sourceMappingURL=00-schema.create.js.map
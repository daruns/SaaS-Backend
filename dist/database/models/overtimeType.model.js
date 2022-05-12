"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OvertimeTypeModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'overtimeTypes';
class OvertimeTypeModel extends base_model_1.BaseModel {
}
exports.OvertimeTypeModel = OvertimeTypeModel;
OvertimeTypeModel.tableName = tableName;
OvertimeTypeModel.relationMappings = {
    overtimes: {
        modelClass: `${__dirname}/overtime.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'overtimes.overtimeTypeId',
        },
    },
};
exports.default = OvertimeTypeModel;
//# sourceMappingURL=overtimeType.model.js.map
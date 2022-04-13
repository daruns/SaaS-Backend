"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypeModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'leaveTypes';
class LeaveTypeModel extends base_model_1.BaseModel {
}
exports.LeaveTypeModel = LeaveTypeModel;
LeaveTypeModel.tableName = tableName;
LeaveTypeModel.relationMappings = {
    leaves: {
        modelClass: `${__dirname}/leave.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'leaves.leaveTypeId',
        },
    },
};
exports.default = LeaveTypeModel;
//# sourceMappingURL=leaveType.model.js.map
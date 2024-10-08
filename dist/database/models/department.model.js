"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'departments';
class DepartmentModel extends base_model_1.BaseModel {
}
exports.DepartmentModel = DepartmentModel;
DepartmentModel.tableName = tableName;
DepartmentModel.relationMappings = {
    designations: {
        modelClass: `${__dirname}/designation.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'designations.departmentId',
        },
    },
};
exports.default = DepartmentModel;
//# sourceMappingURL=department.model.js.map
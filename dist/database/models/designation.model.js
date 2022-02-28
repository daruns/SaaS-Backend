"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignationModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'designations';
class DesignationModel extends base_model_1.BaseModel {
}
exports.DesignationModel = DesignationModel;
DesignationModel.tableName = tbName;
DesignationModel.relationMappings = {
    department: {
        modelClass: `${__dirname}/department.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.departmentId`,
            to: 'departments.id',
        },
    },
};
exports.default = DesignationModel;
//# sourceMappingURL=designation.model.js.map
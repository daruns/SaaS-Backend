"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarningModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'earnings';
class EarningModel extends base_model_1.BaseModel {
}
exports.EarningModel = EarningModel;
EarningModel.tableName = tableName;
EarningModel.relationMappings = {
    employee: {
        modelClass: `${__dirname}/employee.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.employeeId`,
            to: 'employees.id',
        },
    },
    earningType: {
        modelClass: `${__dirname}/earningType.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.earningTypeId`,
            to: 'earningTypes.id',
        },
    },
};
exports.default = EarningModel;
//# sourceMappingURL=earning.model.js.map
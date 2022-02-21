"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'meetings';
class MeetingModel extends base_model_1.BaseModel {
}
exports.MeetingModel = MeetingModel;
MeetingModel.tableName = tableName;
MeetingModel.relationMappings = {
    client: {
        modelClass: `${__dirname}/client.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.clientId`,
            to: 'clients.id',
        },
    },
};
exports.default = MeetingModel;
//# sourceMappingURL=meeting.model.js.map
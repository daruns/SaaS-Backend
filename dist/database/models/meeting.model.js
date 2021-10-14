"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
class MeetingModel extends base_model_1.BaseModel {
}
exports.MeetingModel = MeetingModel;
MeetingModel.tableName = 'meetings';
MeetingModel.relationMappings = {
    client: {
        modelClass: `${__dirname}/client.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: 'meetings.clientId',
            to: 'clients.id',
        },
    },
};
//# sourceMappingURL=meeting.model.js.map
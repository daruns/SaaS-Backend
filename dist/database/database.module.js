"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const Knex = require("knex");
const objection_1 = require("objection");
const knexConfig = require("./knex");
const user_model_1 = require("./models/user.model");
const group_model_1 = require("./models/group.model");
const client_model_1 = require("./models/client.model");
const permission_model_1 = require("./models/permission.model");
const clientContact_model_1 = require("./models/clientContact.model");
const socialMedia_model_1 = require("./models/socialMedia.model");
const meeting_model_1 = require("./models/meeting.model");
const models = [user_model_1.UserModel, group_model_1.GroupModel, permission_model_1.PermissionModel, client_model_1.ClientModel, clientContact_model_1.ClientContactModel, socialMedia_model_1.SocialMediaModel, meeting_model_1.MeetingModel];
const modelProvider = lodash_1.map(models, model => {
    return {
        provide: model.name,
        useValue: model,
    };
});
const providers = [
    ...modelProvider,
    {
        provide: 'KnexConnection',
        useFactory: async () => {
            const knex = await Knex(knexConfig);
            objection_1.Model.knex(knex);
            return knex;
        },
    },
];
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Global(),
    common_1.Module({
        providers,
        exports: [...providers],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map
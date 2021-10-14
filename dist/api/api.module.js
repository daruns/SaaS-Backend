"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const clientContacts_module_1 = require("./clientContacts/clientContacts.module");
const clients_module_1 = require("./clients/clients.module");
const meetings_module_1 = require("./meetings/meetings.module");
const socialMedias_module_1 = require("./socialMedias/socialMedias.module");
const users_module_1 = require("./users/users.module");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [users_module_1.UsersModule, clients_module_1.ClientsModule, auth_module_1.AuthModule, clientContacts_module_1.ClientContactsModule, meetings_module_1.MeetingsModule, socialMedias_module_1.SocialMediasModule],
        providers: [],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_service_1 = require("../../app/app.service");
const clients_module_1 = require("../clients/clients.module");
const clients_service_1 = require("../clients/clients.service");
const socialMediaManagements_controller_1 = require("./socialMediaManagements.controller");
const socialMediaManagements_service_1 = require("./socialMediaManagements.service");
let SocialMediaManagementsModule = class SocialMediaManagementsModule {
};
SocialMediaManagementsModule = __decorate([
    common_1.Module({
        imports: [clients_module_1.ClientsModule],
        controllers: [socialMediaManagements_controller_1.SocialMediaManagementsController],
        providers: [
            app_service_1.FileUploadService,
            socialMediaManagements_service_1.SocialMediaManagementsService,
            clients_service_1.ClientsService,
        ],
        exports: [socialMediaManagements_service_1.SocialMediaManagementsService]
    })
], SocialMediaManagementsModule);
exports.SocialMediaManagementsModule = SocialMediaManagementsModule;
//# sourceMappingURL=socialMediaManagements.module.js.map
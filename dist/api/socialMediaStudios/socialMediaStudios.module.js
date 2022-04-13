"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaStudiosModule = void 0;
const common_1 = require("@nestjs/common");
const clients_module_1 = require("../clients/clients.module");
const socialMediaStudios_controller_1 = require("./socialMediaStudios.controller");
const socialMediaStudios_service_1 = require("./socialMediaStudios.service");
let SocialMediaStudiosModule = class SocialMediaStudiosModule {
};
SocialMediaStudiosModule = __decorate([
    common_1.Module({
        imports: [clients_module_1.ClientsModule],
        controllers: [socialMediaStudios_controller_1.SocialMediaStudiosController],
        providers: [socialMediaStudios_service_1.SocialMediaStudiosService],
    })
], SocialMediaStudiosModule);
exports.SocialMediaStudiosModule = SocialMediaStudiosModule;
//# sourceMappingURL=socialMediaStudios.module.js.map
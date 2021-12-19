"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_module_1 = require("../auth/apps/users/users.module");
const users_service_1 = require("../auth/apps/users/users.service");
const app_service_1 = require("../../app/app.service");
const brands_service_1 = require("../brands/brands.service");
const clients_controller_1 = require("./clients.controller");
const clients_service_1 = require("./clients.service");
let ClientsModule = class ClientsModule {
};
ClientsModule = __decorate([
    common_1.Module({
        controllers: [clients_controller_1.ClientsController],
        providers: [clients_service_1.ClientsService, users_service_1.UsersService, brands_service_1.BrandsService, app_service_1.FileUploadService],
        exports: [clients_service_1.ClientsService, users_service_1.UsersService, app_service_1.FileUploadService],
    })
], ClientsModule);
exports.ClientsModule = ClientsModule;
//# sourceMappingURL=clients.module.js.map
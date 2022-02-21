"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientContactsModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../../app/app.service");
const users_service_1 = require("../auth/apps/users/users.service");
const brands_service_1 = require("../brands/brands.service");
const clients_module_1 = require("../clients/clients.module");
const clients_service_1 = require("../clients/clients.service");
const clientContacts_controller_1 = require("./clientContacts.controller");
const clientContacts_service_1 = require("./clientContacts.service");
let ClientContactsModule = class ClientContactsModule {
};
ClientContactsModule = __decorate([
    common_1.Module({
        imports: [clients_module_1.ClientsModule],
        controllers: [clientContacts_controller_1.ClientContactsController],
        providers: [clientContacts_service_1.ClientContactsService, users_service_1.UsersService, brands_service_1.BrandsService, clients_service_1.ClientsService, app_service_1.FileUploadService],
        exports: [clientContacts_service_1.ClientContactsService, users_service_1.UsersService]
    })
], ClientContactsModule);
exports.ClientContactsModule = ClientContactsModule;
//# sourceMappingURL=clientContacts.module.js.map
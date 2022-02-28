"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../auth/apps/users/users.service");
const app_service_1 = require("../../app/app.service");
const brands_service_1 = require("../brands/brands.service");
const employees_controller_1 = require("./employees.controller");
const employees_service_1 = require("./employees.service");
let EmployeesModule = class EmployeesModule {
};
EmployeesModule = __decorate([
    common_1.Module({
        controllers: [employees_controller_1.EmployeesController],
        providers: [employees_service_1.EmployeesService, users_service_1.UsersService, brands_service_1.BrandsService, app_service_1.FileUploadService],
        exports: [employees_service_1.EmployeesService, users_service_1.UsersService, app_service_1.FileUploadService],
    })
], EmployeesModule);
exports.EmployeesModule = EmployeesModule;
//# sourceMappingURL=employees.module.js.map
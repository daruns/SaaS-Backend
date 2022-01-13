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
const projects_controller_1 = require("./projects.controller");
const projects_service_1 = require("./projects.service");
let ProjectsModule = class ProjectsModule {
};
ProjectsModule = __decorate([
    common_1.Module({
        imports: [clients_module_1.ClientsModule],
        controllers: [projects_controller_1.ProjectsController],
        providers: [
            app_service_1.FileUploadService,
            projects_service_1.ProjectsService,
            clients_service_1.ClientsService,
        ],
        exports: [projects_service_1.ProjectsService]
    })
], ProjectsModule);
exports.ProjectsModule = ProjectsModule;
//# sourceMappingURL=projects.module.js.map
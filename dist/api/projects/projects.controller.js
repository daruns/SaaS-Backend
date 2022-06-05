"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const add_leadersToProject_dto_1 = require("./dto/add-leadersToProject.dto");
const add_membersToProject_dto_1 = require("./dto/add-membersToProject.dto");
const platform_express_1 = require("@nestjs/platform-express");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async findAll(req) {
        const projects = await this.projectsService.findAll(req.user);
        return projects;
    }
    async findAllClients(req) {
        const projectsClients = await this.projectsService.findAllClients(req.user);
        return projectsClients;
    }
    async findAllUsers(req) {
        const projectsUsers = await this.projectsService.findAllUsers(req.user);
        return projectsUsers;
    }
    async findOne(id, req) {
        const project = await this.projectsService.findById(id, req.user);
        return project;
    }
    async create(project, req) {
        const createdProject = await this.projectsService.create(project, req.user);
        return createdProject;
    }
    async addLeaders(payload, req) {
        const addedTeamLeaders = await this.projectsService.addLeaders(payload, req.user);
        return addedTeamLeaders;
    }
    async addMembers(payload, req) {
        const addedTeamMembers = await this.projectsService.addMembers(payload, req.user);
        return addedTeamMembers;
    }
    async removeLeaders(payload, req) {
        const removedTeamLeaders = await this.projectsService.removeLeaders(payload, req.user);
        return removedTeamLeaders;
    }
    async removeMembers(payload, req) {
        const removedTeamMembers = await this.projectsService.removeMembers(payload, req.user);
        return removedTeamMembers;
    }
    async addFile(id, files, req) {
        const payload = { id: id, files: files };
        console.log(payload);
        const addFiledExpense = await this.projectsService.addFile(payload, req.user);
        return addFiledExpense;
    }
    async replaceFiles(id, files, req) {
        const payload = { id: id, files: files };
        console.log(payload);
        const addFiledExpense = await this.projectsService.replaceFiles(payload, req.user);
        return addFiledExpense;
    }
    async removeFile(body, req) {
        const addFiledExpense = await this.projectsService.removeFile(body, req.user);
        return addFiledExpense;
    }
    update(payload, req) {
        return this.projectsService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.projectsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAll", null);
__decorate([
    common_1.Get('clients'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAllClients", null);
__decorate([
    common_1.Get('users'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAllUsers", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    common_1.Post('addTeamLeaders'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_leadersToProject_dto_1.AddLeadersToProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "addLeaders", null);
__decorate([
    common_1.Post('addTeamMembers'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_membersToProject_dto_1.AddMembersToProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "addMembers", null);
__decorate([
    common_1.Post('removeTeamLeaders'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_leadersToProject_dto_1.AddLeadersToProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "removeLeaders", null);
__decorate([
    common_1.Post('removeTeamMembers'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_membersToProject_dto_1.AddMembersToProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "removeMembers", null);
__decorate([
    common_1.Post('addFile'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Create),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor("files", 10)),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body("id")), __param(1, common_1.UploadedFiles()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "addFile", null);
__decorate([
    common_1.Post('replaceFiles'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Update),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor("files", 10)),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body("id")), __param(1, common_1.UploadedFiles()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "replaceFiles", null);
__decorate([
    common_1.Post('removeFile'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "removeFile", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_project_dto_1.UpdateProjectDto, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.projects, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "deleteById", null);
ProjectsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map
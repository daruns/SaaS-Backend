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
exports.TasksController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const add_membersToTask_dto_1 = require("./dto/add-membersToTask.dto");
const platform_express_1 = require("@nestjs/platform-express");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async findAll(req) {
        const tasks = await this.tasksService.findAll(req.user);
        return tasks;
    }
    async findOne(id, req) {
        const task = await this.tasksService.findById(id, req.user);
        return task;
    }
    async create(task, req) {
        const createdTask = await this.tasksService.create(task, req.user);
        return createdTask;
    }
    async addMembers(payload, req) {
        const createdTask = await this.tasksService.addMembers(payload, req.user);
        return createdTask;
    }
    async removeMembers(payload, req) {
        const createdTask = await this.tasksService.removeMembers(payload, req.user);
        return createdTask;
    }
    async addFile(id, files, req) {
        const payload = { id: id, files: files };
        console.log(payload);
        const addFiledExpense = await this.tasksService.addFile(payload, req.user);
        return addFiledExpense;
    }
    async removeFile(body, req) {
        const addFiledExpense = await this.tasksService.removeFile(body, req.user);
        return addFiledExpense;
    }
    changeBoard(payload, req) {
        return this.tasksService.changeBoard(payload, req.user);
    }
    update(payload, req) {
        return this.tasksService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.tasksService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    common_1.Post('addTeamMembers'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_membersToTask_dto_1.AddMembersToTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "addMembers", null);
__decorate([
    common_1.Post('removeTeamMembers'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_membersToTask_dto_1.AddMembersToTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "removeMembers", null);
__decorate([
    common_1.Post('addFile'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor("files", 25)),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body("id")), __param(1, common_1.UploadedFiles()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "addFile", null);
__decorate([
    common_1.Post('removeFile'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "removeFile", null);
__decorate([
    common_1.Post('changeBoard'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_task_dto_1.ChangeBoardDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "changeBoard", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "deleteById", null);
TasksController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map
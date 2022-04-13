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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_department_dto_1 = require("./dto/update-department.dto");
const departments_service_1 = require("./departments.service");
const create_department_dto_1 = require("./dto/create-department.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let DepartmentsController = class DepartmentsController {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    async findAll(req) {
        const departments = await this.departmentsService.findAll(req.user);
        return departments;
    }
    async findOne(id, req) {
        const department = await this.departmentsService.findById(id, req.user);
        return department;
    }
    async create(department, req) {
        const createdDepartment = await this.departmentsService.create(department, req.user);
        return createdDepartment;
    }
    update(payload, req) {
        return this.departmentsService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.departmentsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_department_dto_1.CreateDepartmentDto !== "undefined" && create_department_dto_1.CreateDepartmentDto) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof update_department_dto_1.UpdateDepartmentDto !== "undefined" && update_department_dto_1.UpdateDepartmentDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "deleteById", null);
DepartmentsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('departments'),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
exports.DepartmentsController = DepartmentsController;
//# sourceMappingURL=departments.controller.js.map
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
exports.EmployeesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_employee_dto_1 = require("./dto/update-employee.dto");
const employees_service_1 = require("./employees.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const app_service_1 = require("../../app/app.service");
const users_service_1 = require("../auth/apps/users/users.service");
let EmployeesController = class EmployeesController {
    constructor(employeesService, usersService) {
        this.employeesService = employeesService;
        this.usersService = usersService;
    }
    async findAll(req) {
        const employees = await this.employeesService.findAll(req.user);
        return employees;
    }
    async findOne(id, req) {
        const employee = await this.employeesService.findById(id, req.user);
        return employee;
    }
    async create(payload, req) {
        console.log(payload);
        if (['admin', 'owner'].includes(req.user.userType)) {
            const createdEmployee = await this.employeesService.createHr(payload, req.user);
            return createdEmployee;
        }
        else {
            const createdEmployee = await this.employeesService.create(payload, req.user);
            return createdEmployee;
        }
    }
    update(payload, req) {
        if (payload.id)
            payload.id = Number(payload.id);
        if (payload.designationId)
            payload.designationId = Number(payload.designationId);
        if (payload.managerId)
            payload.managerId = Number(payload.managerId);
        return this.employeesService.update(payload, req.user);
    }
    async editProfile(payload, file, req) {
        var _a, _b;
        if (payload.id)
            payload.id = Number(payload.id);
        payload.avatar = file;
        const currentEmployee = await this.employeesService.findByUSerId((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.user);
        if (currentEmployee.success && ((_b = currentEmployee.data) === null || _b === void 0 ? void 0 : _b.hrMember)) {
            return this.usersService.update(payload, req.user);
        }
        else
            throw new common_1.UnauthorizedException();
    }
    deleteById(payload, req) {
        return this.employeesService.deleteById(payload, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_employee_dto_1.UpdateEmployeeDto, Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "update", null);
__decorate([
    common_1.Post('updateAvatar'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("avatar", { fileFilter: app_service_1.imageFileFilter })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "editProfile", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "deleteById", null);
EmployeesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('employees'),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService,
        users_service_1.UsersService])
], EmployeesController);
exports.EmployeesController = EmployeesController;
//# sourceMappingURL=employees.controller.js.map
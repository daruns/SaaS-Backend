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
exports.AttendancesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const attendances_service_1 = require("./attendances.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const app_service_1 = require("../../app/app.service");
const user_layers_dto_1 = require("../auth/dto/user-layers.dto");
let AttendancesController = class AttendancesController {
    constructor(attendancesService) {
        this.attendancesService = attendancesService;
    }
    async findAll(req) {
        const curUser = req === null || req === void 0 ? void 0 : req.user;
        if (app_service_1.getUserType(curUser) === user_layers_dto_1.UserLayers.layerOne || (curUser.myEmployeeProfile && curUser.myEmployeeProfile.hrMember === 1)) {
            const attendances = await this.attendancesService.findAll(req.user);
            return attendances;
        }
        const attendancesByUser = await this.attendancesService.findAllByUser(req.user);
        return attendancesByUser;
    }
    async create(req) {
        const createdAttendance = await this.attendancesService.create(req.user);
        return createdAttendance;
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendancesController.prototype, "findAll", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendancesController.prototype, "create", null);
AttendancesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('attendances'),
    __metadata("design:paramtypes", [attendances_service_1.AttendancesService])
], AttendancesController);
exports.AttendancesController = AttendancesController;
//# sourceMappingURL=attendances.controller.js.map
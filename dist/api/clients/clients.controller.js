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
exports.ClientsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_client_dto_1 = require("./dto/update-client.dto");
const clients_service_1 = require("./clients.service");
const create_client_dto_1 = require("./dto/create-client.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_client_user_dto_1 = require("./dto/create-client-user.dto");
const update_client_user_dto_1 = require("./dto/update-client-user.dto");
const platform_express_1 = require("@nestjs/platform-express");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async findAll(req) {
        const clients = await this.clientsService.findAll(req.user);
        return clients;
    }
    async findOne(id, req) {
        const client = await this.clientsService.findById(id, req.user);
        return client;
    }
    async create(payload, file, req) {
        payload.logo = file;
        const createdClient = await this.clientsService.create(payload, req.user);
        return createdClient;
    }
    async update(payload, file, req) {
        payload.logo = file;
        payload.id = Number(payload.id);
        return this.clientsService.update(payload, req.user);
    }
    async addUser(clientUser, req) {
        const addedUser = await this.clientsService.addUser(clientUser, req.user);
        return addedUser;
    }
    async editUser(payload, req) {
        return this.clientsService.editUser(payload, req.user);
    }
    async deleteById(payload, req) {
        return this.clientsService.deleteById(payload, req.user);
    }
    async removeUser(payload, req) {
        return this.clientsService.removeUser(payload, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.crm, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.crm, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.crm, actions_enum_1.Action.Create),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("logo")),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.crm, actions_enum_1.Action.Update),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("logo")),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_client_dto_1.UpdateClientDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "update", null);
__decorate([
    common_1.Post('addUser'),
    can_decorator_1.Can(subjects_enum_1.Subjects.crmUsers, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_user_dto_1.CreateClientUserDto, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "addUser", null);
__decorate([
    common_1.Post('editUser'),
    can_decorator_1.Can(subjects_enum_1.Subjects.crmUsers, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_client_user_dto_1.UpdateClientUserDto, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "editUser", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.crm, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "deleteById", null);
__decorate([
    common_1.Post('removeUser'),
    can_decorator_1.Can(subjects_enum_1.Subjects.crmUsers, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "removeUser", null);
ClientsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
exports.ClientsController = ClientsController;
//# sourceMappingURL=clients.controller.js.map
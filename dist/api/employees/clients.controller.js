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
var _a, _b, _c, _d;
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
    update(payload, file, req) {
        payload.logo = file;
        payload.id = Number(payload.id);
        return this.clientsService.update(payload, req.user);
    }
    async addUser(clientUser, req) {
        const addedUser = await this.clientsService.addUser(clientUser, req.user);
        return addedUser;
    }
    editUser(payload, req) {
        return this.clientsService.editUser(payload, req.user);
    }
    deleteById(payload, req) {
        return this.clientsService.deleteById(payload, req.user);
    }
    removeUser(payload, req) {
        return this.clientsService.removeUser(payload, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("logo")),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_client_dto_1.CreateClientDto !== "undefined" && create_client_dto_1.CreateClientDto) === "function" ? _a : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("logo")),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof update_client_dto_1.UpdateClientDto !== "undefined" && update_client_dto_1.UpdateClientDto) === "function" ? _b : Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "update", null);
__decorate([
    common_1.Post('addUser'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_client_user_dto_1.CreateClientUserDto !== "undefined" && create_client_user_dto_1.CreateClientUserDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "addUser", null);
__decorate([
    common_1.Post('editUser'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof update_client_user_dto_1.UpdateClientUserDto !== "undefined" && update_client_user_dto_1.UpdateClientUserDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "editUser", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "deleteById", null);
__decorate([
    common_1.Post('removeUser'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "removeUser", null);
ClientsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
exports.ClientsController = ClientsController;
//# sourceMappingURL=clients.controller.js.map
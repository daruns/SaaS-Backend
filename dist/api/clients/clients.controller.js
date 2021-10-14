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
const common_1 = require("@nestjs/common");
const update_client_dto_1 = require("./dto/update-client.dto");
const clients_service_1 = require("./clients.service");
const create_client_dto_1 = require("./dto/create-client.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_client_user_dto_1 = require("./dto/create-client-user.dto");
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
    async create(client, user, req) {
        const createdClient = await this.clientsService.create(client, user, req.user);
        return createdClient;
    }
    update(payload, req) {
        return this.clientsService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.clientsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()), __param(1, common_1.Body('user')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDto, create_client_user_dto_1.CreateClientUserDto, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_client_dto_1.UpdateClientDto, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "deleteById", null);
ClientsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
exports.ClientsController = ClientsController;
//# sourceMappingURL=clients.controller.js.map
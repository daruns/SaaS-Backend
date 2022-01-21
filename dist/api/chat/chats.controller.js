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
exports.ChatsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const remove_MessageAttachments_dto_1 = require("./dto/remove-MessageAttachments.dto");
let ChatsController = class ChatsController {
    constructor(chatsService) {
        this.chatsService = chatsService;
    }
    async addFiles(files, req) {
        const addFilesdExpense = await this.chatsService.addFiles(files, req.user);
        return addFilesdExpense;
    }
    async removeFiles(payload, req) {
        const removeFilesdExpense = await this.chatsService.removeFiles(payload, req.user);
        return removeFilesdExpense;
    }
};
__decorate([
    common_1.Post('addFiles'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor("files", 10)),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "addFiles", null);
__decorate([
    common_1.Post('removeFiles'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_MessageAttachments_dto_1.RemoveFilesDto, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "removeFiles", null);
ChatsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('chats'),
    __metadata("design:paramtypes", [chats_service_1.ChatsService])
], ChatsController);
exports.ChatsController = ChatsController;
//# sourceMappingURL=chats.controller.js.map
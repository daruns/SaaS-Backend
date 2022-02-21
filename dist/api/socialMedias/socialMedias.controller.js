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
exports.SocialMediasController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_socialMedia_dto_1 = require("./dto/update-socialMedia.dto");
const socialMedias_service_1 = require("./socialMedias.service");
const create_socialMedia_dto_1 = require("./dto/create-socialMedia.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SocialMediasController = class SocialMediasController {
    constructor(socialMediasService) {
        this.socialMediasService = socialMediasService;
    }
    async findAll(req) {
        const socialMedias = await this.socialMediasService.findAll(req.user);
        return socialMedias;
    }
    async findOne(id, req) {
        const socialMedia = await this.socialMediasService.findById(id, req.user);
        return socialMedia;
    }
    async create(socialMedia, req) {
        const createdSocialMedia = await this.socialMediasService.create(socialMedia, req.user);
        return createdSocialMedia;
    }
    update(payload, req) {
        return this.socialMediasService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.socialMediasService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocialMediasController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SocialMediasController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_socialMedia_dto_1.CreateSocialMediaDto, Object]),
    __metadata("design:returntype", Promise)
], SocialMediasController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_socialMedia_dto_1.UpdateSocialMediaDto, Object]),
    __metadata("design:returntype", void 0)
], SocialMediasController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SocialMediasController.prototype, "deleteById", null);
SocialMediasController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('socialMedias'),
    __metadata("design:paramtypes", [socialMedias_service_1.SocialMediasService])
], SocialMediasController);
exports.SocialMediasController = SocialMediasController;
//# sourceMappingURL=socialMedias.controller.js.map
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
exports.SocialMediaStudiosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_media_dto_1 = require("./dto/create-media.dto");
const create_socialMediaStudio_dto_1 = require("./dto/create-socialMediaStudio.dto");
const remove_mediaAttachment_dto_1 = require("./dto/remove-mediaAttachment.dto");
const remove_socialMediaStudioUsers_dto_1 = require("./dto/remove-socialMediaStudioUsers.dto");
const update_socialMediaStudio_dto_1 = require("./dto/update-socialMediaStudio.dto");
const socialMediaStudios_service_1 = require("./socialMediaStudios.service");
let SocialMediaStudiosController = class SocialMediaStudiosController {
    constructor(socialMediaStudiosService) {
        this.socialMediaStudiosService = socialMediaStudiosService;
    }
    async findAll(req) {
        const socialMedia = await this.socialMediaStudiosService.findAll(req.user);
        return socialMedia;
    }
    async drafts(req) {
        const socialMedia = await this.socialMediaStudiosService.findByStage('draft', req.user);
        return socialMedia;
    }
    async inProductions(req) {
        const socialMedia = await this.socialMediaStudiosService.findByStage('production', req.user);
        return socialMedia;
    }
    async inReviews(req) {
        const socialMedia = await this.socialMediaStudiosService.findByStage('review', req.user);
        return socialMedia;
    }
    async Completeds(req) {
        const socialMedia = await this.socialMediaStudiosService.findByStage('completed', req.user);
        return socialMedia;
    }
    async findOne(id, req) {
        const socialMedia = await this.socialMediaStudiosService.findById(id, req.user);
        return socialMedia;
    }
    async createMedia(attachments, media, req) {
        console.log("create", media);
        media.attachments = attachments;
        const createMedia = await this.socialMediaStudiosService.createMedia(media, req);
        return createMedia;
    }
    async create(socialMedia, req) {
        const createdSocialMedia = await this.socialMediaStudiosService.create(socialMedia, req.user);
        return createdSocialMedia;
    }
    async addUsers(payload, req) {
        console.log("payload addusers: ", payload);
        return payload;
    }
    async removeUsers(payload, req) {
        const createdSocialMedia = await this.socialMediaStudiosService.removeUsers(payload, req.user);
        return createdSocialMedia;
    }
    async addAttachments(id, files, req) {
        const payload = { id: id, files: files };
        const createdSocialMedia = await this.socialMediaStudiosService.addAttachments(payload, req.user);
        return createdSocialMedia;
    }
    async removeAttachment(payload, req) {
        const createdSocialMedia = await this.socialMediaStudiosService.removeAttachment(payload, req.user);
        return createdSocialMedia;
    }
    async approve(payload, req) {
        const createdSocialMedia = await this.socialMediaStudiosService.approve(payload.id, req.user);
        return createdSocialMedia;
    }
    update(payload, req) {
        return this.socialMediaStudiosService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.socialMediaStudiosService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(''),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "findAll", null);
__decorate([
    common_1.Get('drafts'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "drafts", null);
__decorate([
    common_1.Get('productions'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "inProductions", null);
__decorate([
    common_1.Get('reviews'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "inReviews", null);
__decorate([
    common_1.Get('completeds'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "Completeds", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "findOne", null);
__decorate([
    common_1.Post('createMedia'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor("attachments", 30)),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, create_media_dto_1.CreateMediaDto, Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "createMedia", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_socialMediaStudio_dto_1.CreateSocialMediaStudioDto, Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "create", null);
__decorate([
    common_1.Post('addUsers'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "addUsers", null);
__decorate([
    common_1.Post('removeUsers'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_socialMediaStudioUsers_dto_1.RemoveSocialMediaStudioUsersDto, Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "removeUsers", null);
__decorate([
    common_1.Post('addAttachments'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor("files", 1)),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body("id")), __param(1, common_1.UploadedFiles()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "addAttachments", null);
__decorate([
    common_1.Post('removeAttachment'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_mediaAttachment_dto_1.RemoveMediaAttachmentDto, Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "removeAttachment", null);
__decorate([
    common_1.Post('approve'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocialMediaStudiosController.prototype, "approve", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_socialMediaStudio_dto_1.UpdateSocialMediaStudioDto, Object]),
    __metadata("design:returntype", void 0)
], SocialMediaStudiosController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SocialMediaStudiosController.prototype, "deleteById", null);
SocialMediaStudiosController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('socialMediaStudios'),
    __metadata("design:paramtypes", [socialMediaStudios_service_1.SocialMediaStudiosService])
], SocialMediaStudiosController);
exports.SocialMediaStudiosController = SocialMediaStudiosController;
//# sourceMappingURL=socialMediaStudios.controller.js.map
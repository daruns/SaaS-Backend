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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const editProfile_dto_1 = require("./dto/editProfile.dto");
const platform_express_1 = require("@nestjs/platform-express");
const app_service_1 = require("../../app/app.service");
const edit_brand_dto_1 = require("./dto/edit-brand.dto");
const can_decorator_1 = require("./can/decorators/can.decorator");
const subjects_enum_1 = require("./can/enums/subjects.enum");
const actions_enum_1 = require("./can/enums/actions.enum");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(signupDto) {
        const savedUser = await this.authService.signUp(signupDto);
        return savedUser;
    }
    async signIn(req) {
        return await this.authService.signIn(req.user);
    }
    update(brand, file, req) {
        brand.logo = file;
        return this.authService.editBrand(brand, req.user);
    }
    async editProfile(editProfileDto, file, req) {
        if (!req.user.id)
            throw new common_1.UnauthorizedException();
        console.log(file);
        editProfileDto.avatar = file;
        const myUser = await this.authService.editProfile(editProfileDto, req.user);
        return myUser;
    }
    async getMe(req) {
        if (!req.user.id)
            throw new common_1.UnauthorizedException();
        const myUser = await this.authService.me(req.user.id);
        delete myUser.password;
        return myUser;
    }
};
__decorate([
    common_1.Post('/signup'),
    can_decorator_1.Can(subjects_enum_1.Subjects.EveryoneAllowed, actions_enum_1.Action.All),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('signin'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('editBrand'),
    can_decorator_1.Can(subjects_enum_1.Subjects.OwnerAllowed, actions_enum_1.Action.Update),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("logo")),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_brand_dto_1.EditBrandDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('editProfile'),
    can_decorator_1.Can(subjects_enum_1.Subjects.EveryoneAllowed, actions_enum_1.Action.All),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("avatar", { fileFilter: app_service_1.imageFileFilter })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.UploadedFile()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editProfile_dto_1.EditProfileDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "editProfile", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('me'),
    can_decorator_1.Can(subjects_enum_1.Subjects.EveryoneAllowed, actions_enum_1.Action.All),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
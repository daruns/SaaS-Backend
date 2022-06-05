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
exports.BrandsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const brands_service_1 = require("./brands.service");
const create_brand_dto_1 = require("./dto/create-brand.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const update_brand_dto_1 = require("./dto/update-brand.dto");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
let BrandsController = class BrandsController {
    constructor(brandsService) {
        this.brandsService = brandsService;
    }
    async findAll(req) {
        const brands = await this.brandsService.findAll();
        return brands;
    }
    async findOne(id, req) {
        const post = await this.brandsService.findById(id);
        return post;
    }
    async findByBrandCode(brandCode, req) {
        const post = await this.brandsService.findByBrandCode(brandCode);
        return post;
    }
    create(brand) {
        return this.brandsService.create(brand);
    }
    update(brand, file, req) {
        brand.logo = file;
        brand.id = Number(brand['id']);
        return this.brandsService.update(brand, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.MasterAllowed, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.MasterAllowed, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "findOne", null);
__decorate([
    common_1.Get('/brandCode/:brandCode'),
    can_decorator_1.Can(subjects_enum_1.Subjects.MasterAllowed, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('brandCode', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "findByBrandCode", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.MasterAllowed, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_brand_dto_1.CreateBrandDto]),
    __metadata("design:returntype", void 0)
], BrandsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.MasterAllowed, actions_enum_1.Action.Update),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("logo")),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.UpdateBrandDto, Object, Object]),
    __metadata("design:returntype", void 0)
], BrandsController.prototype, "update", null);
BrandsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('brands'),
    __metadata("design:paramtypes", [brands_service_1.BrandsService])
], BrandsController);
exports.BrandsController = BrandsController;
//# sourceMappingURL=brands.controller.js.map
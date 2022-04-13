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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const _ = require("lodash");
const app_service_1 = require("../../app/app.service");
let BrandsService = class BrandsService {
    constructor(modelClass, fileUploadService) {
        this.modelClass = modelClass;
        this.fileUploadService = fileUploadService;
    }
    async findAll() {
        const users = await this.modelClass.query().withGraphFetched({
            users: {}
        });
        return {
            success: true,
            message: 'Brand details fetch successfully.',
            data: users,
        };
    }
    async findById(id) {
        const brand = await this.modelClass
            .query()
            .findById(id)
            .withGraphFetched({
            users: {}
        });
        if (brand) {
            return {
                success: true,
                message: 'Brand details fetch successfully.',
                data: brand,
            };
        }
        else {
            return {
                success: true,
                message: 'No brand details found.',
                data: {},
            };
        }
    }
    async findByBrandCode(brandCode) {
        const brand = await this.modelClass
            .query()
            .findOne({ brandCode: brandCode })
            .withGraphFetched({
            users: {}
        });
        if (brand) {
            return {
                success: true,
                message: 'Brand details fetch successfully.',
                data: brand,
            };
        }
        else {
            return {
                success: true,
                message: 'No brand details found.',
                data: {},
            };
        }
    }
    async create(payload) {
        const brandCode = _.camelCase(payload.subdomain);
        const newBrand = await this.modelClass.query().where({
            brandCode: brandCode
        });
        if (!newBrand.length) {
            try {
                payload.brandCode = brandCode;
                const identifiers = await this.modelClass.query().insert(payload);
                const createBrand = await this.modelClass.query().findById(identifiers.id);
                return {
                    success: true,
                    message: 'Brand created successfully.',
                    data: createBrand,
                };
            }
            catch (err) {
                return {
                    success: false,
                    message: 'Brand didnt created',
                    data: (err.nativeError && err.nativeError.sqlMessage) ? err.nativeError.sqlMessage : err,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'Brand already exists with this brandCode and Name!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        console.log(currentUser.brandCode);
        const brand = await this.modelClass.query().where({ brandCode: currentUser.brandCode }).findById(payload.id);
        if (payload.logo) {
            const logoUploaded = payload.logo;
            const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "logos", currentUser);
            if (fileUploaded.success) {
                console.log(fileUploaded.data);
                payload.logo = fileUploaded.data.url;
            }
            else
                return fileUploaded;
        }
        if (brand) {
            const updatedBrand = await this.modelClass
                .query()
                .where({ brandCode: currentUser.brandCode })
                .update({
                name: payload.name ? payload.name : brand.name,
                companySize: payload.companySize ? payload.companySize : brand.companySize,
                address: payload.address ? payload.address : brand.address,
                logo: payload.logo ? payload.logo : brand.logo,
                announcedAt: payload.announcedAt ? payload.announcedAt : brand.announcedAt,
                branches: payload.branches ? payload.branches : brand.branches,
                occupation: payload.occupation ? payload.occupation : brand.occupation,
                website: payload.website ? payload.website : brand.website,
                phoneNumber: payload.phoneNumber ? payload.phoneNumber : brand.phoneNumber,
                email: payload.email ? payload.email : brand.email,
            })
                .where({ id: payload.id });
            return {
                success: true,
                message: 'Brand details updated successfully.',
                data: updatedBrand,
            };
        }
        else {
            return {
                success: false,
                message: 'No brand found.',
                data: {},
            };
        }
    }
    async delete(payload) {
        const brand = await this.modelClass
            .query()
            .delete()
            .where({ id: payload.id });
        if (brand) {
            return {
                success: true,
                message: 'Brand deleted successfully.',
                data: brand,
            };
        }
        else {
            return {
                success: false,
                message: 'No brand found.',
                data: {},
            };
        }
    }
};
BrandsService = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Injectable(),
    __param(0, common_1.Inject('BrandModel')),
    __metadata("design:paramtypes", [Object, app_service_1.FileUploadService])
], BrandsService);
exports.BrandsService = BrandsService;
//# sourceMappingURL=brands.service.js.map